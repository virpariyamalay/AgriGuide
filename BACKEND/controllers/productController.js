const Product = require('../models/Product');
const cartController = require('./cartController');

exports.addProduct = async (req, res) => {
    try {
        // Debug log
        console.log('addProduct req.body:', req.body);
        console.log('addProduct req.file:', req.file);

        const {
            name,
            price,
            description,
            category,
            unit,
            stock
        } = req.body;
        const imageUrl = req.file?.path;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ error: 'Name, price, description, and category are required.' });
        }

        // Ensure numeric fields are numbers
        const parsedPrice = price !== undefined && price !== '' ? Number(price) : 0;
        const parsedStock = stock !== undefined && stock !== '' ? Number(stock) : 0;
        console.log('Parsed stock value:', parsedStock);

        const newProduct = new Product({
            name,
            price: parsedPrice,
            description,
            category,
            unit,
            stock: parsedStock,
            image: imageUrl,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added', product: newProduct });
    } catch (error) {
        console.error('Add Product Error:', error);
        res.status(500).json({ error: 'Failed to add product', details: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await cartController.removeProductFromAllCarts(id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = { ...req.body };
        if (req.file) {
            updateFields.image = req.file.path;
        }
        // Ensure numeric fields are numbers
        if (updateFields.price !== undefined) updateFields.price = Number(updateFields.price);
        if (updateFields.stock !== undefined) updateFields.stock = Number(updateFields.stock);
        const updated = await Product.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated', product: updated });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
}; 