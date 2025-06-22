import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const featuredProducts = [
    {
        id: 1,
        name: 'Premium Wheat Seeds',
        category: 'Seeds',
        price: '₹450',
        originalPrice: '₹600',
        discount: '25% OFF',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
        rating: 4.8,
        reviews: 124,
        badge: 'Best Seller',
        badgeColor: 'bg-red-500'
    },
    {
        id: 2,
        name: 'Organic Fertilizer Pack',
        category: 'Fertilizers',
        price: '₹1,200',
        originalPrice: '₹1,500',
        discount: '20% OFF',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
        rating: 4.9,
        reviews: 89,
        badge: 'Organic',
        badgeColor: 'bg-green-500'
    },
    {
        id: 3,
        name: 'Smart Irrigation System',
        category: 'Equipment',
        price: '₹8,500',
        originalPrice: '₹12,000',
        discount: '29% OFF',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        rating: 4.7,
        reviews: 56,
        badge: 'New',
        badgeColor: 'bg-blue-500'
    },
    {
        id: 4,
        name: 'Pest Control Solution',
        category: 'Pesticides',
        price: '₹750',
        originalPrice: '₹900',
        discount: '17% OFF',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
        rating: 4.6,
        reviews: 203,
        badge: 'Popular',
        badgeColor: 'bg-purple-500'
    }
];

const categories = [
    { name: 'Seeds', icon: '🌱', count: '500+' },
    { name: 'Fertilizers', icon: '🌿', count: '200+' },
    { name: 'Equipment', icon: '🔧', count: '150+' },
    { name: 'Pesticides', icon: '🛡️', count: '100+' }
];

const MarketplacePreviewSection = () => {
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
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className={`absolute top-3 left-3 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                                    {product.badge}
                                </div>
                                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                    {product.discount}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                                {/* Rating */}
                                <div className="flex items-center mb-3">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                ⭐
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">
                                        ({product.reviews})
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
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