import React from 'react';
import { motion } from 'framer-motion';

const WeatherHero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 py-20">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-200 rounded-full opacity-20"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200 rounded-full opacity-10"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-6xl mb-4">🌤️</div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Historical Weather
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {' '}Data
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Explore detailed weather patterns and temperature trends for any location worldwide.
                        Get insights to plan your farming activities with precision.
                    </p>
                </motion.div>

                {/* Weather stats cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl mb-2">🌍</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Coverage</h3>
                        <p className="text-gray-600">Access weather data from cities worldwide</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl mb-2">📊</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
                        <p className="text-gray-600">Comprehensive temperature and weather insights</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="text-3xl mb-2">📈</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Analysis</h3>
                        <p className="text-gray-600">Visualize weather patterns over time</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WeatherHero; 