import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';

const categories = [
    { name: 'Seeds', icon: '🌱', count: '500+' },
    { name: 'Fertilizers', icon: '🌿', count: '200+' },
    { name: 'Equipment', icon: '🔧', count: '150+' },
    { name: 'Pesticides', icon: '🛡️', count: '100+' }
];

const MarketplacePreviewSection = () => {
    const { products, loading } = useProducts();
    const { addToCart, cartItems } = useCart();

    // Only show first 4 available products (stock > 0)
    const availableProducts = products.filter(p => typeof p.stock === 'number' ? p.stock > 0 : true).slice(0, 4);

    const handleAddToCart = (product) => {
        // Find if product is already in cart
        const cartItem = cartItems.find(item => item.product && (item.product._id === product._id || item.product.id === product._id));
        const currentQty = cartItem ? cartItem.quantity : 0;
        if (typeof product.stock === 'number' && currentQty >= product.stock) {
            toast.error('Cannot add more than available stock');
            return;
        }
        addToCart(product);
        toast.success(`Added ${product.name} to cart!`);
    };

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Farm Supplies Marketplace
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Get everything you need for successful farming - from premium seeds to smart equipment
                    </p>

                    {/* Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/80 transition-all duration-200 cursor-pointer"
                            >
                                <div className="text-2xl mb-2">{category.icon}</div>
                                <div className="font-semibold text-gray-800">{category.name}</div>
                                <div className="text-sm text-gray-600">{category.count}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-md p-6 animate-pulse h-80" />
                        ))
                    ) : availableProducts.length === 0 ? (
                        <div className="col-span-4 text-center text-gray-500 text-lg py-12">No products available</div>
                    ) : (
                        availableProducts.map((product, index) => (
                            <motion.div
                                key={product._id || product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
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
                                    <div className="flex justify-between items-end mt-auto">
                                        <span className="font-bold text-gray-800 text-lg">₹{product.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(product)}
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
                        ))
                    )}
                </div>

                {/* Marketplace Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🚚</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Delivery</h3>
                        <p className="text-gray-600">Free shipping on orders above ₹1500</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                        <p className="text-gray-600">100% quality assurance on all products</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">💰</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
                        <p className="text-gray-600">Competitive prices with regular discounts</p>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        to="/marketplace"
                        className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <span>Explore Full Marketplace</span>
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default MarketplacePreviewSection; 