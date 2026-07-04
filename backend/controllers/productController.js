// controllers/productController.js
// Matches YOUR exact database schema:
//   categories (id, name, slug, image)
//   subcategories (id, category_id, name, slug, image)
//   products (id, subcategory_id, brand, name, description, price, stock, image)

const db = require('../config/db');

// ── GET /api/categories ───────────────────────────────────────────────────────
const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY id');
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getCategories:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/subcategories/:categorySlug ──────────────────────────────────────
const getSubcategoriesBySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const [rows] = await db.query(
      `SELECT s.* FROM subcategories s
       JOIN categories c ON s.category_id = c.id
       WHERE c.slug = ?
       ORDER BY s.id`,
      [categorySlug]
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getSubcategoriesBySlug:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/products ─────────────────────────────────────────────────────────
// Query params: ?search=&subcategory=<slug>&category=<slug>&sort=price_asc|price_desc
const getProducts = async (req, res) => {
  try {
    const { search, subcategory, category, sort } = req.query;

    let sql = `
      SELECT p.*,
             s.name  AS subcategory_name,
             s.slug  AS subcategory_slug,
             c.name  AS category_name,
             c.slug  AS category_slug
      FROM products p
      JOIN subcategories s ON p.subcategory_id = s.id
      JOIN categories    c ON s.category_id    = c.id
      WHERE 1=1
    `;
    const params = [];

    if (search && search.trim()) {
      sql += ' AND (p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)';
      const q = `%${search.trim()}%`;
      params.push(q, q, q);
    }

    if (subcategory) {
      sql += ' AND s.slug = ?';
      params.push(subcategory);
    }

    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }

    if (sort === 'price_asc')  sql += ' ORDER BY p.price ASC';
    else if (sort === 'price_desc') sql += ' ORDER BY p.price DESC';
    else if (sort === 'name')  sql += ' ORDER BY p.name ASC';
    else                       sql += ' ORDER BY p.created_at DESC';

    const [rows] = await db.query(sql, params);
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getProducts:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/products/:id ─────────────────────────────────────────────────────
const getProductById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*,
              s.name  AS subcategory_name,
              s.slug  AS subcategory_slug,
              c.name  AS category_name,
              c.slug  AS category_slug
       FROM products p
       JOIN subcategories s ON p.subcategory_id = s.id
       JOIN categories    c ON s.category_id    = c.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const product = rows[0];

    // Similar products — same subcategory, excluding current
    const [similar] = await db.query(
      `SELECT p.*, s.slug AS subcategory_slug, c.slug AS category_slug
       FROM products p
       JOIN subcategories s ON p.subcategory_id = s.id
       JOIN categories    c ON s.category_id    = c.id
       WHERE p.subcategory_id = ? AND p.id != ?
       LIMIT 6`,
      [product.subcategory_id, product.id]
    );

    return res.json({ success: true, data: product, similar });
  } catch (err) {
    console.error('getProductById:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  getCategories,
  getSubcategoriesBySlug,
  getProducts,
  getProductById,
};
