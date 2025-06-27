const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, adminAuthMiddleware } = require('../middleware/authMiddleware');

// Place a new order
router.post('/', protect, placeOrder);

// Get user's own orders
router.get('/', protect, getUserOrders);

// Admin order management
router.get('/admin', adminAuthMiddleware, getAllOrders);
router.put('/:id/status', adminAuthMiddleware, updateOrderStatus);
router.delete('/:id', adminAuthMiddleware, deleteOrder);

module.exports = router; 