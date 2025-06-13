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
    color: 'from-green-400 to-green-600',
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

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMoreCrops, setShowMoreCrops] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Image Slider - Responsive */}
      {/* <div className="relative w-screen left-1/2 -translate-x-1/2 h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden mb-6 sm:mb-8 rounded-xl shadow-lg"> */}
      <div className=" relative w-screen left-1/2 -translate-x-1/2 h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] overflow-hidden mb-6">

        {sliderImages.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Slider indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Section - Responsive */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-20">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <motion.h1
            className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Grow Better with <span className="text-primary-600">AgriGuide</span>
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your complete companion for successful farming - from seed to harvest.
            Get step-by-step instructions, track your progress, and shop for supplies.
          </motion.p>
        </div>

        {/* Search Section - Responsive */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <CropSearch setSearchQuery={() => {}} />
        </div>

       
        <div className="bg-[#f7faf5] rounded-2xl shadow-lg px-4 py-10 sm:px-8 md:px-12 mb-10">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌱 How to Get Started with AgriGuide
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={step.animation.hover}
            whileTap={step.animation.tap}
            onHoverStart={() => setActiveStep(step.id)}
            onHoverEnd={() => setActiveStep(null)}
          >
            <div className="flex flex-col items-center text-center text-green-900">
              <motion.div
                className="text-4xl sm:text-5xl mb-4"
                animate={activeStep === step.id ? { scale: 1.3, rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {step.icon}
              </motion.div>

              <motion.div
                className="absolute top-3 left-3 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-semibold text-sm"
                animate={activeStep === step.id ? { scale: 1.2 } : {}}
              >
                {step.id}
              </motion.div>

              <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-700">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

        {/* Popular Crops - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PopularCrops />
        </motion.div>

        {/* Additional Crops - Responsive */}
        {showMoreCrops && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
             
          >
            {additionalCrops.map((crop, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={crop.image} 
                    alt={crop.name}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {crop.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-2 sm:p-3 md:p-4">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1">{crop.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Growing time: {crop.growingTime}</p>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-1.5 sm:h-2 bg-primary-500 rounded-full animate-pulse" 
                          style={{ width: `${crop.successRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-gray-600">{crop.successRate}% success</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Features Section - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 bg-white rounded-xl shadow-soft px-4 sm:px-6 md:px-8 mb-8 sm:mb-12 md:mb-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Why Choose AgriGuide?</h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 px-2">
            We provide all the tools and knowledge you need to succeed in farming,
            whether you're a beginner or experienced grower.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              className="bg-primary-50 p-4 sm:p-6 rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Modal - Responsive */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <span className="text-3xl sm:text-4xl mr-3">{selectedFeature.icon}</span>
                    <h2 className="text-xl sm:text-2xl font-bold">{selectedFeature.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {Object.entries(selectedFeature.stats).map(([key, value]) => (
                    <div key={key} className="bg-primary-50 p-2 sm:p-4 rounded-lg text-center">
                      <div className="text-lg sm:text-2xl font-bold text-primary-600">{value}</div>
                      <div className="text-xs sm:text-sm text-gray-600 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {selectedFeature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-700 text-sm sm:text-base">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm sm:text-base"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section - Responsive */}
      <section className="mb-8 sm:mb-12 md:mb-16">
        <div className="bg-primary-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-6 sm:p-8 md:p-12 md:flex items-center justify-between">
            <div className="md:max-w-xl mb-6 md:mb-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Ready to grow better crops?</h2>
              <p className="text-primary-50 text-sm sm:text-base md:text-lg mb-6">
                Start your journey with AgriGuide today and transform your farming experience
                with expert guidance and tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/marketplace"
                  className="w-full sm:w-auto inline-block bg-white text-primary-700 font-semibold px-4 sm:px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out text-center text-sm sm:text-base"
                >
                  Shop Supplies
                </Link>
                <button 
                  onClick={() => setShowLearnMore(true)}
                  className="w-full sm:w-auto inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <img
                src="https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy farmer"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;