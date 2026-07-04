// controllers/cartController.js
// Matches: cart (id, user_id, product_id, quantity)

const db = require('../config/db');

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.id, c.quantity,
              p.id AS product_id, p.name, p.brand, p.price, p.image, p.stock
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [req.user.id]
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getCart:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST /api/cart/add  { product_id, quantity }
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) return res.status(400).json({ success: false, message: 'product_id required.' });

    const [prod] = await db.query('SELECT id, stock FROM products WHERE id = ?', [product_id]);
    if (!prod.length) return res.status(404).json({ success: false, message: 'Product not found.' });

    // Check if already in cart — if yes, increment
    const [existing] = await db.query(
      'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?',
      [req.user.id, product_id]
    );

    if (existing.length) {
      await db.query(
        'UPDATE cart SET quantity = quantity + ? WHERE id = ?',
        [quantity, existing[0].id]
      );
    } else {
      await db.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [req.user.id, product_id, quantity]
      );
    }

    return res.status(201).json({ success: true, message: 'Added to cart.' });
  } catch (err) {
    console.error('addToCart:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// PUT /api/cart/update/:id  { quantity }
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ success: false, message: 'Invalid quantity.' });

    const [result] = await db.query(
      'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, req.params.id, req.user.id]
    );
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Cart item not found.' });

    return res.json({ success: true, message: 'Updated.' });
  } catch (err) {
    console.error('updateCart:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// DELETE /api/cart/remove/:id
const removeFromCart = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Cart item not found.' });
    return res.json({ success: true, message: 'Removed.' });
  } catch (err) {
    console.error('removeFromCart:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    await db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
    return res.json({ success: true, message: 'Cart cleared.' });
  } catch (err) {
    console.error('clearCart:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart, clearCart };
