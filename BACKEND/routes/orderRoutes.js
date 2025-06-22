const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, adminAuthMiddleware } = require('../middleware/authMiddleware');

// Place a new order
router.post('/', protect, placeOrder);

// Admin order management
router.get('/admin', adminAuthMiddleware, getAllOrders);
router.put('/:id/status', adminAuthMiddleware, updateOrderStatus);
router.delete('/:id', adminAuthMiddleware, deleteOrder);

module.exports = router; 