// controllers/orderController.js
// ✅ FIXED: accepts items from frontend payload (no DB cart dependency)

const db = require('../config/db');

// ── Helper: create notification ───────────────────────────────────────────────
async function createNotification(conn, { user_id, order_id, type, title, message }) {
  await conn.query(
    `INSERT INTO notifications (user_id, order_id, type, title, message) VALUES (?, ?, ?, ?, ?)`,
    [user_id, order_id, type, title, message]
  );
}

// ── POST /api/orders ──────────────────────────────────────────────────────────
const placeOrder = async (req, res) => {
  const conn = await db.getConnection();
  try {
    const {
      customer_name,
      phone,
      address,
      landmark,
      delivery_type  = 'pickup',
      payment_method = 'cod',
      items,           // ✅ sent from frontend cart
    } = req.body;

    // ── Validate ──────────────────────────────────────────────────────────────
    if (!customer_name || !customer_name.trim()) {
      conn.release();
      return res.status(400).json({ success: false, message: 'Customer name is required.' });
    }
    if (!phone || !phone.trim()) {
      conn.release();
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      conn.release();
      return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    // ── Verify products & stock from DB ───────────────────────────────────────
    const verifiedItems = [];
    for (const item of items) {
      const [rows] = await conn.query(
        'SELECT id, name, price, stock FROM products WHERE id = ?',
        [item.product_id]
      );
      if (!rows.length) {
        conn.release();
        return res.status(400).json({ success: false, message: `Product not found: ${item.product_id}` });
      }
      const product = rows[0];
      if (product.stock < item.quantity) {
        conn.release();
        return res.status(400).json({ success: false, message: `Insufficient stock for "${product.name}".` });
      }
      verifiedItems.push({
        product_id: product.id,
        name:       product.name,
        price:      parseFloat(product.price),  // use DB price (trust server)
        quantity:   item.quantity,
      });
    }

    const totalAmount = verifiedItems.reduce((s, i) => s + i.price * i.quantity, 0);

    await conn.beginTransaction();

    // ── Create order ──────────────────────────────────────────────────────────
    const [orderResult] = await conn.query(
      `INSERT INTO orders
         (user_id, customer_name, phone, address, landmark, delivery_type, payment_method, total_amount, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [
        req.user.id,
        customer_name.trim(),
        phone.trim(),
        (address || 'Store Pickup').trim(),
        landmark ? landmark.trim() : null,
        delivery_type,
        payment_method,
        totalAmount,
      ]
    );
    const orderId = orderResult.insertId;

    // ── Insert order_items + reduce stock ─────────────────────────────────────
    for (const item of verifiedItems) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      await conn.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // ── Notify customer ───────────────────────────────────────────────────────
    await createNotification(conn, {
      user_id:  req.user.id,
      order_id: orderId,
      type:     'order_placed',
      title:    '✅ Order Placed!',
      message:  `Your order #${orderId} has been received. We'll notify you once it's packed.`,
    });

    // ── Notify all admins ─────────────────────────────────────────────────────
    const [admins] = await conn.query(`SELECT id FROM users WHERE role = 'admin'`);
    for (const admin of admins) {
      await createNotification(conn, {
        user_id:  admin.id,
        order_id: orderId,
        type:     'new_order',
        title:    '🛒 New Order Received',
        message:  `Order #${orderId} from ${customer_name} — ₹${totalAmount.toFixed(0)}. Tap to assign.`,
      });
    }

    await conn.commit();
    conn.release();

    return res.status(201).json({
      success:  true,
      message:  'Order placed successfully.',
      orderId,
      total:    totalAmount,
    });

  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error('placeOrder:', err);
    return res.status(500).json({ success: false, message: 'Server error while placing order.' });
  }
};

// ── GET /api/orders/my-orders ─────────────────────────────────────────────────
const getMyOrders = async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, a.name AS assigned_admin_name
       FROM orders o
       LEFT JOIN users a ON o.assigned_admin_id = a.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );

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
    console.error('getMyOrders:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { placeOrder, getMyOrders };
