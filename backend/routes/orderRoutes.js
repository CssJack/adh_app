// routes/orderRoutes.js
const express = require('express');
const router  = express.Router();
const { verifyToken }  = require('../middleware/auth');
const { placeOrder, getMyOrders } = require('../controllers/orderController');

router.post('/',          verifyToken, placeOrder);
router.get('/my-orders',  verifyToken, getMyOrders);

module.exports = router;
