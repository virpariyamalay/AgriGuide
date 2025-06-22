import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { number: '50K+', label: 'Happy Farmers', icon: '👨‍🌾' },
    { number: '100+', label: 'Crop Guides', icon: '🌾' },
    { number: '95%', label: 'Success Rate', icon: '📈' },
    { number: '24/7', label: 'Support', icon: '🛟' }
];

const StatsSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center group"
                        >
                            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection; 