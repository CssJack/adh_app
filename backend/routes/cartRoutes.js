// routes/cartRoutes.js
const express = require('express');
const router  = express.Router();
const { getCart, addToCart, updateCart, removeFromCart, clearCart } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);
router.get('/',            getCart);
router.post('/add',        addToCart);
router.put('/update/:id',  updateCart);
router.delete('/remove/:id', removeFromCart);
router.delete('/clear',    clearCart);

module.exports = router;
