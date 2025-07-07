import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';

const CartItemsList = () => {
    const { cartItems, updateQuantity, removeFromCart, loading } = useCart();
    const [updatingItems, setUpdatingItems] = useState({});
    const [removingItems, setRemovingItems] = useState({});

    const handleQuantityChange = async (productId, newQuantity) => {
        setUpdatingItems(prev => ({ ...prev, [productId]: true }));
        try {
            await updateQuantity(productId, newQuantity);
        } catch (error) {
            // Error handling is done in updateQuantity function
        } finally {
            setUpdatingItems(prev => ({ ...prev, [productId]: false }));
        }
    };

    const handleRemoveItem = async (productId) => {
        setRemovingItems(prev => ({ ...prev, [productId]: true }));
        try {
            await removeFromCart(productId);
        } catch (error) {
            // Error handling is done in removeFromCart function
        } finally {
            setRemovingItems(prev => ({ ...prev, [productId]: false }));
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some products to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {cartItems.map((item, index) => (
                    <motion.div
                        key={item.product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-sm border p-4"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                    {item.product.name}
                                </h3>
                                <p className="text-sm text-gray-500">${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'} each</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1 || updatingItems[item.product._id]}
                                        className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                                        {updatingItems[item.product._id] ? (
                                            <svg className="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            item.quantity
                                        )}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                        disabled={updatingItems[item.product._id]}
                                        className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <div className="text-sm font-medium text-gray-900">
                                    {typeof item.price === 'number' && typeof item.quantity === 'number' ? (item.price * item.quantity).toFixed(2) : '0.00'}
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.product._id)}
                                    disabled={removingItems[item.product._id]}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                                >
                                    {removingItems[item.product._id] ? (
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        'Remove'
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CartItemsList; 