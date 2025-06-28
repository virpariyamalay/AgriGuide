import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
    {
        id: 'expert-guidance',
        title: 'Expert Guidance',
        description: 'Access detailed, step-by-step growing instructions for any crop, written by farming experts.',
        icon: '📚',
        gradient: 'from-orange-400 to-red-500',
        stats: {
            experts: '50+',
            guides: '1000+',
            languages: '10+'
        },
        benefits: [
            'Detailed growing instructions',
            'Pest control guidance',
            'Disease management',
            'Harvest timing tips'
        ]
    },
    {
        id: 'market-intelligence',
        title: 'Market Intelligence',
        description: 'Get real-time market prices, trends, and insights to maximize your profits.',
        icon: '📈',
        gradient: 'from-blue-400 to-indigo-500',
        stats: {
            markets: '500+',
            updates: 'Daily',
            accuracy: '98%'
        },
        benefits: [
            'Real-time price tracking',
            'Market trend analysis',
            'Profit optimization',
            'Demand forecasting'
        ]
    },
    {
        id: 'weather-alerts',
        title: 'Weather Alerts',
        description: 'Get timely notifications about weather conditions that might affect your crops.',
        icon: '🌦️',
        gradient: 'from-green-400 to-teal-500',
        stats: {
            accuracy: '99%',
            coverage: 'Global',
            alerts: '24/7'
        },
        benefits: [
            'Real-time weather updates',
            'Frost warnings',
            'Rain predictions',
            'Temperature alerts'
        ]
    }
];

const FeaturesSection = () => {
    const [selectedFeature, setSelectedFeature] = useState(null);

    const handleFeatureClick = (feature) => {
        setSelectedFeature(feature);
    };

    return (
        <>
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Why Choose AgriGuide?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide all the tools and knowledge you need to succeed in farming,
                            whether you're a beginner or experienced grower.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                onClick={() => handleFeatureClick(feature)}
                                className="group cursor-pointer"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                                    <div className={`text-6xl mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300">
                                        Learn More
                                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Modal */}
            <AnimatePresence>
                {selectedFeature && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center">
                                        <span className="text-4xl mr-4">{selectedFeature.icon}</span>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedFeature.title}</h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedFeature(null)}
                                        className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {Object.entries(selectedFeature.stats).map(([key, value]) => (
                                        <div key={key} className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-100">
                                            <div className="text-2xl font-bold text-green-600">{value}</div>
                                            <div className="text-sm text-gray-600 capitalize">{key}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Key Benefits</h3>
                                    <ul className="space-y-3">
                                        {selectedFeature.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setSelectedFeature(null)}
                                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Got it
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FeaturesSection; 