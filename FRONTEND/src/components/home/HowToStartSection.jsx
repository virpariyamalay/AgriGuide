import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: 'Search Your Crop',
        description: 'Find detailed information about the crop you want to grow',
        icon: '🔍'
    },
    {
        id: 2,
        title: 'Get Expert Guidance',
        description: 'Access comprehensive growing guides and best practices',
        icon: '🌱'
    },
    {
        id: 3,
        title: 'Market Intelligence',
        description: 'Stay informed with real-time market rates and trends',
        icon: '📈'
    }
];

const HowToStartSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        How to Get Started with AgriGuide
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Follow these simple steps to begin your successful farming journey
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="bg-gray-50 rounded-lg p-6 h-full border border-gray-200 hover:border-primary-300 transition-colors duration-200">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">
                                        {step.icon}
                                    </div>

                                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mx-auto mb-4">
                                        {step.id}
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToStartSection; 