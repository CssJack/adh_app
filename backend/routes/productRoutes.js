// routes/productRoutes.js
const express = require('express');
const router  = express.Router();
const {
  getCategories,
  getSubcategoriesBySlug,
  getProducts,
  getProductById,
} = require('../controllers/productController');

// Categories
router.get('/categories', getCategories);

// Subcategories by category slug  →  /api/subcategories/paints
router.get('/subcategories/:categorySlug', getSubcategoriesBySlug);

// Products — must be before /:id
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

module.exports = router;
