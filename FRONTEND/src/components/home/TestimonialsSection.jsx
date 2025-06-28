import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        location: 'Punjab, India',
        role: 'Wheat Farmer',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        quote: 'AgriGuide transformed my farming! The step-by-step guidance helped me increase my wheat yield by 40%. The weather alerts saved my crops during unexpected rains.',
        crops: ['Wheat', 'Rice'],
        yield: '+40%',
        experience: '3 years'
    },
    {
        id: 2,
        name: 'Priya Sharma',
        location: 'Maharashtra, India',
        role: 'Organic Farmer',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
        quote: 'As a new farmer, I was overwhelmed. AgriGuide made everything simple with their detailed crop guides and market intelligence. My organic vegetables are thriving!',
        crops: ['Tomatoes', 'Bell Peppers', 'Herbs'],
        yield: '+60%',
        experience: '1 year'
    },
    {
        id: 3,
        name: 'Amit Patel',
        location: 'Gujarat, India',
        role: 'Cotton Farmer',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        quote: 'The marketplace feature is fantastic! I can buy quality seeds and fertilizers at great prices. The crop monitoring tools help me optimize irrigation perfectly.',
        crops: ['Cotton', 'Soybeans'],
        yield: '+35%',
        experience: '8 years'
    },
    {
        id: 4,
        name: 'Sunita Devi',
        location: 'Bihar, India',
        role: 'Vegetable Farmer',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        quote: 'AgriGuide helped me start my vegetable farming business. The expert guidance and market rates information helped me make better decisions and increase profits.',
        crops: ['Potatoes', 'Onions', 'Carrots'],
        yield: '+50%',
        experience: '2 years'
    }
];

const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [imageError, setImageError] = useState({});

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index) => {
        setCurrentTestimonial(index);
    };

    const handleImageError = (testimonialId) => {
        setImageError(prev => ({ ...prev, [testimonialId]: true }));
    };

    const getImageSrc = (testimonial) => {
        if (imageError[testimonial.id]) {
            // Fallback to a placeholder image or initials
            return null;
        }
        return testimonial.image;
    };

    return (
        <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
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
                        What Our Farmers Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of successful farmers who have transformed their farming with AgriGuide
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                {/* Testimonial Content */}
                                <div className="lg:col-span-2">
                                    <div className="flex items-center mb-6">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="text-2xl text-yellow-400"
                                            >
                                                ⭐
                                            </motion.span>
                                        ))}
                                    </div>

                                    <blockquote className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed italic">
                                        "{testimonials[currentTestimonial].quote}"
                                    </blockquote>

                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {testimonials[currentTestimonial].crops.map((crop, index) => (
                                            <motion.span
                                                key={crop}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {crop}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-xl">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {testimonials[currentTestimonial].yield}
                                            </div>
                                            <div className="text-sm text-blue-700">Yield Increase</div>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-xl">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {testimonials[currentTestimonial].experience}
                                            </div>
                                            <div className="text-sm text-purple-700">Using AgriGuide</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Farmer Profile */}
                                <div className="text-center lg:text-left">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="mb-6"
                                    >
                                        {getImageSrc(testimonials[currentTestimonial]) ? (
                                            <img
                                                src={getImageSrc(testimonials[currentTestimonial])}
                                                alt={testimonials[currentTestimonial].name}
                                                className="w-24 h-24 rounded-full mx-auto lg:mx-0 border-4 border-white shadow-lg"
                                                onError={() => handleImageError(testimonials[currentTestimonial].id)}
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full mx-auto lg:mx-0 border-4 border-white shadow-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                                                {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        )}
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {testimonials[currentTestimonial].name}
                                    </h3>
                                    <p className="text-gray-600 mb-1">{testimonials[currentTestimonial].role}</p>
                                    <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <motion.button
                        onClick={prevTestimonial}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>

                    <motion.button
                        onClick={nextTestimonial}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentTestimonial
                                ? 'bg-orange-500 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
                >
                    <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
                        <div className="text-gray-600">Happy Farmers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                        <div className="text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                        <div className="text-gray-600">Support</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection; 