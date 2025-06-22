import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CropSearch from '../components/crops/CropSearch';
import PopularCrops from '../components/crops/PopularCrops';
import FeatureCard from '../components/ui/FeatureCard';

const sliderImages = [
  'https://images.pexels.com/photos/18793006/pexels-photo-18793006/free-photo-of-crop-field-with-trees-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/21393/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/583459/pexels-photo-583459.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5230972/pexels-photo-5230972.jpeg?auto=compress&cs=tinysrgb&w=1200'
];

const additionalCrops = [
  {
    name: 'Spinach',
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    growingTime: '30-45 days',
    successRate: 90
  },
  {
    name: 'Bell Peppers',
    image: 'https://images.pexels.com/photos/128536/pexels-photo-128536.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Moderate',
    growingTime: '60-90 days',
    successRate: 75
  },
  {
    name: 'Strawberries',
    image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Moderate',
    growingTime: '90-120 days',
    successRate: 70
  },
  {
    name: 'Basil',
    image: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    growingTime: '20-30 days',
    successRate: 95
  },
  {
    name: 'Cauliflower',
    image: 'https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Moderate',
    growingTime: '70-100 days',
    successRate: 65
  },
  {
    name: 'Eggplant',
    image: 'https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Moderate',
    growingTime: '100-120 days',
    successRate: 70
  },
  {
    name: 'Mint',
    image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    growingTime: '20-30 days',
    successRate: 95
  },
  {
    name: 'Broccoli',
    image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Moderate',
    growingTime: '80-100 days',
    successRate: 75
  },
  {
    name: 'Cilantro',
    image: 'https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    growingTime: '20-30 days',
    successRate: 90
  },
  {
    name: 'Zucchini',
    image: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    growingTime: '50-70 days',
    successRate: 85
  },
  {
    name: 'Radish',
    image: 'https://images.pexels.com/photos/244393/pexels-photo-244393.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    growingTime: '20-30 days',
    successRate: 95
  },
  {
    name: 'Kale',
    image: 'https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-51372.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    growingTime: '50-70 days',
    successRate: 90
  }
];

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
    id: 'progress-tracking',
    title: 'Progress Tracking',
    description: 'Monitor your plants\' growth, set reminders, and track your farming journey.',
    icon: '📊',
    gradient: 'from-blue-400 to-indigo-500',
    stats: {
      users: '10K+',
      crops: '100+',
      success: '95%'
    },
    benefits: [
      'Growth stage tracking',
      'Custom reminders',
      'Photo documentation',
      'Yield predictions'
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

const stats = [
  { number: '50K+', label: 'Happy Farmers', icon: '👨‍🌾' },
  { number: '100+', label: 'Crop Guides', icon: '🌾' },
  { number: '95%', label: 'Success Rate', icon: '📈' },
  { number: '24/7', label: 'Support', icon: '🛟' }
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMoreCrops, setShowMoreCrops] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showMoreCrops) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showMoreCrops]);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section with Modern Design */}
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

      {/* Stats Section */}
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

      {/* How to Get Started Section */}
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

      {/* Popular Crops Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <PopularCrops />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* CTA Section */}
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
    </div>
  );
};

export default HomePage;