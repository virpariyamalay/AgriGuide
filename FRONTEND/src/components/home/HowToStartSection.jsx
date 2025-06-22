import React, { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: 'Search Your Crop',
        description: 'Find detailed information about the crop you want to grow',
        icon: '🔍',
        color: 'from-emerald-400 to-emerald-600',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        animation: {
            hover: { scale: 1.05, rotate: 5 },
            tap: { scale: 0.95 }
        }
    },
    {
        id: 2,
        title: 'Start Growing',
        description: 'Begin your growing journey with our step-by-step guidance',
        icon: '🌱',
        color: 'from-blue-400 to-blue-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        animation: {
            hover: { scale: 1.05, y: -5 },
            tap: { scale: 0.95 }
        }
    },
    {
        id: 3,
        title: 'Track Progress',
        description: 'Monitor your crop\'s growth and get timely notifications',
        icon: '📈',
        color: 'from-purple-400 to-purple-600',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        animation: {
            hover: { scale: 1.05, rotate: -5 },
            tap: { scale: 0.95 }
        }
    }
];

const HowToStartSection = () => {
    const [activeStep, setActiveStep] = useState(null);

    return (
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        🌱 How to Get Started with AgriGuide
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Follow these simple steps to begin your successful farming journey
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={step.animation.hover}
                            whileTap={step.animation.tap}
                            onHoverStart={() => setActiveStep(step.id)}
                            onHoverEnd={() => setActiveStep(null)}
                            className="relative group"
                        >
                            <div className={`${step.bgColor} rounded-2xl p-8 h-full border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
                                <div className="text-center">
                                    <motion.div
                                        className="text-6xl mb-6"
                                        animate={activeStep === step.id ? { scale: 1.2, rotate: 360 } : {}}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {step.icon}
                                    </motion.div>

                                    <div className={`absolute top-4 left-4 w-10 h-10 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                        {step.id}
                                    </div>

                                    <h3 className={`text-2xl font-bold mb-4 ${step.textColor}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-700 text-lg leading-relaxed">
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