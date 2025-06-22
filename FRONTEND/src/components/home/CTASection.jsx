import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                                Ready to grow better crops?
                            </h2>
                            <p className="text-xl text-green-100 mb-8 leading-relaxed">
                                Start your journey with AgriGuide today and transform your farming experience
                                with expert guidance and tools.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/marketplace"
                                    className="group inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Explore Marketplace
                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/weather"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
                                >
                                    Check Weather
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="hidden lg:block"
                        >
                            <img
                                src="https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Happy farmer"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection; 