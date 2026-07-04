// controllers/adminOrderController.js
// Admin-only order operations: get all, assign, update status, notifications

const db = require('../config/db');

// ── Helper: create notification ───────────────────────────────────────────────
async function notify(conn, { user_id, order_id, type, title, message }) {
  await conn.query(
    `INSERT INTO notifications (user_id, order_id, type, title, message)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, order_id, type, title, message]
  );
}

// ── GET /api/admin/orders ─────────────────────────────────────────────────────
const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query; // optional filter

    let sql = `
      SELECT o.*,
             u.name  AS user_name,
             u.phone AS user_phone,
             a.name  AS assigned_admin_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN users a ON o.assigned_admin_id = a.id
    `;
    const params = [];

    if (status) {
      sql += ' WHERE o.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY o.created_at DESC';

    const [orders] = await db.query(sql, params);

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const [items] = await db.query(
          `SELECT oi.*, p.name, p.brand, p.image
           FROM order_items oi JOIN products p ON oi.product_id = p.id
           WHERE oi.order_id = ?`,
          [order.id]
        );
        return { ...order, items };
      })
    );

    return res.json({ success: true, data: ordersWithItems });
  } catch (err) {
    console.error('getAllOrders:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── POST /api/admin/orders/:id/assign ─────────────────────────────────────────
// Atomic claim — only one admin can take an order
const assignOrder = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Lock the row
    const [rows] = await conn.query(
      'SELECT id, status, assigned_admin_id, user_id, customer_name FROM orders WHERE id = ? FOR UPDATE',
      [req.params.id]
    );

    if (!rows.length) {
      await conn.rollback(); conn.release();
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const order = rows[0];

    if (order.status !== 'Pending') {
      await conn.rollback(); conn.release();
      return res.status(409).json({
        success: false,
        message: `Order is already ${order.status}. It may have been taken by another admin.`,
      });
    }

    // Assign
    await conn.query(
      `UPDATE orders
       SET status = 'Assigned', assigned_admin_id = ?, assigned_at = NOW()
       WHERE id = ?`,
      [req.user.id, req.params.id]
    );

    // Notify customer
    await notify(conn, {
      user_id: order.user_id,
      order_id: order.id,
      type: 'order_assigned',
      title: '👷 Order Assigned',
      message: `Your order #${order.id} has been assigned to our team and will be packed shortly.`,
    });

    await conn.commit(); conn.release();
    return res.json({ success: true, message: 'Order assigned to you.' });
  } catch (err) {
    await conn.rollback(); conn.release();
    console.error('assignOrder:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── PUT /api/admin/orders/:id/status ─────────────────────────────────────────
const updateOrderStatus = async (req, res) => {
  const conn = await db.getConnection();
  try {
    const { status } = req.body;
    const allowed = ['Packing', 'Ready For Pickup', 'Completed', 'Cancelled'];

    if (!allowed.includes(status)) {
      conn.release();
      return res.status(400).json({ success: false, message: 'Invalid status transition.' });
    }

    await conn.beginTransaction();

    const [rows] = await conn.query(
      'SELECT id, status, assigned_admin_id, user_id, customer_name FROM orders WHERE id = ? FOR UPDATE',
      [req.params.id]
    );

    if (!rows.length) {
      await conn.rollback(); conn.release();
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const order = rows[0];

    // Only the assigned admin can update (or any admin for Cancelled)
    if (status !== 'Cancelled' && order.assigned_admin_id !== req.user.id) {
      await conn.rollback(); conn.release();
      return res.status(403).json({
        success: false,
        message: 'Only the assigned admin can update this order.',
      });
    }

    // Timestamp fields
    const tsMap = {
      'Packing':          'packing_at',
      'Ready For Pickup': 'ready_at',
      'Completed':        'completed_at',
      'Cancelled':        'cancelled_at',
    };
    const tsField = tsMap[status];

    await conn.query(
      `UPDATE orders SET status = ?, ${tsField} = NOW() WHERE id = ?`,
      [status, order.id]
    );

    // Customer notification map
    const notifMap = {
      'Packing': {
        type: 'order_packing',
        title: '📦 Order Being Packed',
        message: `Great news! Your order #${order.id} is currently being packed.`,
      },
      'Ready For Pickup': {
        type: 'order_ready',
        title: '🏪 Order Ready for Pickup!',
        message: `Your order #${order.id} is ready! Please come to the store to collect it.`,
      },
      'Completed': {
        type: 'order_completed',
        title: '✅ Order Completed',
        message: `Your order #${order.id} has been completed. Thank you for shopping with ADH!`,
      },
      'Cancelled': {
        type: 'order_cancelled',
        title: '❌ Order Cancelled',
        message: `Your order #${order.id} has been cancelled. Contact us if you have questions.`,
      },
    };

    if (notifMap[status]) {
      await notify(conn, {
        user_id: order.user_id,
        order_id: order.id,
        ...notifMap[status],
      });
    }

    await conn.commit(); conn.release();
    return res.json({ success: true, message: `Order marked as ${status}.` });
  } catch (err) {
    await conn.rollback(); conn.release();
    console.error('updateOrderStatus:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getAllOrders, assignOrder, updateOrderStatus };
