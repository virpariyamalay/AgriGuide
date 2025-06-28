import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const MarketplaceProductCard = ({ product, addToCart, cartItems, quantity, setQuantity }) => {
    const maxQty = typeof product.stock === 'number' ? product.stock : 99;
    const cartItem = cartItems.find(item => item.product && (item.product._id === product._id || item.product.id === product._id));
    const currentCartQty = cartItem ? cartItem.quantity : 0;

    const handleQtyChange = (val) => {
        setQuantity(Math.max(1, Math.min(val, maxQty)));
    };

    const handleAddToCartWithQty = () => {
        if (quantity + currentCartQty > maxQty) {
            toast.error('Cannot add more than available stock');
            return;
        }
        addToCart(product, quantity);
        setQuantity(1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
        >
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                        {product.category}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-3 mb-2">
                    {product.unit && product.unit.trim() && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">Unit: {product.unit}</span>
                    )}
                    {typeof product.stock === 'number' && product.stock > 0 && (
                        <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-xs">Stock: {product.stock}</span>
                    )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <button
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700"
                        onClick={() => handleQtyChange(quantity - 1)}
                        disabled={quantity <= 1}
                    >-</button>
                    <input
                        type="number"
                        min={1}
                        max={maxQty}
                        value={quantity}
                        onChange={e => handleQtyChange(Number(e.target.value))}
                        className="w-12 text-center border rounded"
                    />
                    <button
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700"
                        onClick={() => handleQtyChange(quantity + 1)}
                        disabled={quantity >= maxQty}
                    >+</button>
                </div>
                <div className="flex justify-between items-end mt-auto">
                    <span className="font-bold text-gray-800 text-lg">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCartWithQty}
                        className="flex items-center justify-center btn-primary px-3 py-1.5 rounded-lg text-sm font-medium"
                        disabled={product.stock === 0}
                        title={product.stock === 0 ? 'Out of stock' : 'Add to Cart'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MarketplaceProductCard; 