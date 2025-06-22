const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get current user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.json(cart || { user: req.user._id, items: [] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Add or update an item in the cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) return res.status(400).json({ error: 'Product and quantity required' });
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from cart' });
    }
};

// Clear the cart
exports.clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear cart' });
    }
};

// Remove a product from all carts (admin use only)
exports.removeProductFromAllCarts = async (productId) => {
    try {
        await Cart.updateMany(
            {},
            { $pull: { items: { product: productId } } }
        );
    } catch (error) {
        console.error('Failed to remove product from all carts:', error);
    }
}; 