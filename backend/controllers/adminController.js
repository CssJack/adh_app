// controllers/adminController.js
// Admin-only endpoints: full CRUD on products, view all orders & users

const db = require('../config/db');

// ── POST /api/admin/products ──────────────────────────────────────────────────
const createProduct = async (req, res) => {
  try {
    const { subcategory_id, brand, name, description, size, price, stock, image, is_featured } = req.body;
    if (!name || !subcategory_id || !price) {
      return res.status(400).json({ success: false, message: 'name, subcategory_id and price are required.' });
    }
    const [result] = await db.query(
      `INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [subcategory_id, brand||null, name, description||null, size||null, price, stock||0, image||null, is_featured||0]
    );
    return res.status(201).json({ success: true, message: 'Product created.', id: result.insertId });
  } catch (err) {
    console.error('createProduct:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── PUT /api/admin/products/:id ───────────────────────────────────────────────
const updateProduct = async (req, res) => {
  try {
    const { subcategory_id, brand, name, description, size, price, stock, image, is_featured } = req.body;
    const [result] = await db.query(
      `UPDATE products SET
         subcategory_id = COALESCE(?, subcategory_id),
         brand          = COALESCE(?, brand),
         name           = COALESCE(?, name),
         description    = COALESCE(?, description),
         size           = COALESCE(?, size),
         price          = COALESCE(?, price),
         stock          = COALESCE(?, stock),
         image          = COALESCE(?, image),
         is_featured    = COALESCE(?, is_featured)
       WHERE id = ?`,
      [subcategory_id||null, brand||null, name||null, description||null, size||null,
       price||null, stock !== undefined ? stock : null, image||null, is_featured !== undefined ? is_featured : null,
       req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Product not found.' });
    return res.json({ success: true, message: 'Product updated.' });
  } catch (err) {
    console.error('updateProduct:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── DELETE /api/admin/products/:id ────────────────────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    // Remove from cart first to avoid FK constraint
    await db.query('DELETE FROM cart WHERE product_id = ?', [req.params.id]);
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Product not found.' });
    return res.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    console.error('deleteProduct:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/admin/orders ─────────────────────────────────────────────────────
const getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, u.name AS user_name, u.phone
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
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
    console.error('getAllOrders:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── PUT /api/admin/orders/:id/status ─────────────────────────────────────────
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending','Processing','Shipped','Delivered','Cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status.' });
    const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Order not found.' });
    return res.json({ success: true, message: 'Order status updated.' });
  } catch (err) {
    console.error('updateOrderStatus:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/admin/users ──────────────────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC'
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getAllUsers:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/admin/stats ──────────────────────────────────────────────────────
const getStats = async (req, res) => {
  try {
    const [[{ total_products }]]   = await db.query('SELECT COUNT(*) AS total_products FROM products');
    const [[{ total_categories }]] = await db.query('SELECT COUNT(*) AS total_categories FROM categories');
    const [[{ total_orders }]]     = await db.query('SELECT COUNT(*) AS total_orders FROM orders');
    const [[{ total_users }]]      = await db.query('SELECT COUNT(*) AS total_users FROM users');
    const [[{ revenue }]]          = await db.query(`SELECT COALESCE(SUM(total_amount),0) AS revenue FROM orders WHERE status != 'Cancelled'`);
    return res.json({ success: true, data: { total_products, total_categories, total_orders, total_users, revenue } });
  } catch (err) {
    console.error('getStats:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getAllOrders, updateOrderStatus, getAllUsers, getStats };
