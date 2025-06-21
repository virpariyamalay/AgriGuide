const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const imageUrl = req.file?.path;

        if (!name || !price || !description || !category || !imageUrl) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            category,
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
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
}; 