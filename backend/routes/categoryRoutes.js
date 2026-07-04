const express = require('express');
const router = express.Router();

const db = require('../config/db');


// GET ALL CATEGORIES
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.query(`
      SELECT * FROM categories
    `);

    res.json(categories);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


// GET SUBCATEGORIES BY CATEGORY
router.get('/subcategories/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    const [subcategories] = await db.query(`
      SELECT * FROM subcategories
      WHERE category_id = ?
    `, [categoryId]);

    res.json(subcategories);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;