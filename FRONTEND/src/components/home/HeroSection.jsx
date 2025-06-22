import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CropSearch from '../crops/CropSearch';

const sliderImages = [
    'https://images.pexels.com/photos/18793006/pexels-photo-18793006/free-photo-of-crop-field-with-trees-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/21393/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/583459/pexels-photo-583459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5230972/pexels-photo-5230972.jpeg?auto=compress&cs=tinysrgb&w=1200'
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden">
            {/* Background Image Slider */}
            <div className="relative h-screen">
                {sliderImages.map((img, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <img
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
                    </motion.div>
                ))}

                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                Grow Better with{' '}
                                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    AgriGuide
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Your complete companion for successful farming - from seed to harvest.
                                Get expert guidance, track your progress, and shop for supplies.
                            </p>
                        </motion.div>

                        {/* Search Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-8"
                        >
                            <CropSearch setSearchQuery={() => { }} />
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link
                                to="/marketplace"
                                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
                            >
                                <span className="relative z-10">Explore Marketplace</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <Link
                                to="/weather"
                                className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Check Weather
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {sliderImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection; 