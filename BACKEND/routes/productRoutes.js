const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { addProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/productController');
const { adminAuthMiddleware } = require('../middleware/authMiddleware');

router.post('/add', adminAuthMiddleware, upload.single('image'), addProduct);
router.get('/', getProducts);
router.delete('/:id', adminAuthMiddleware, deleteProduct);
router.put('/:id', adminAuthMiddleware, upload.single('image'), updateProduct);

module.exports = router; 