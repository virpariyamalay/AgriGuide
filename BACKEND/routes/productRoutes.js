const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { addProduct, getProducts, deleteProduct } = require('../controllers/productController');
const { adminAuthMiddleware } = require('../middleware/authMiddleware');

router.post('/add', adminAuthMiddleware, upload.single('image'), addProduct);
router.get('/', getProducts);
router.delete('/:id', adminAuthMiddleware, deleteProduct);

module.exports = router; 