
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Image Slider */}
      <div className="relative w-full h-60 md:h-96 overflow-hidden mb-8 rounded-xl shadow-lg">
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
      </div>

      <section className="py-8 md:py-12 lg:py-20">
        <div className="text-center mb-8 md:mb-12">
          <motion.h1
            className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Grow Better with <span className="text-primary-600">AgriGuide</span>
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-base md:text-lg text-gray-600 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your complete companion for successful farming - from seed to harvest.
            Get step-by-step instructions, track your progress, and shop for supplies.
          </motion.p>
        </div>

        <div className="mb-12 md:mb-16">
          <CropSearch setSearchQuery={() => {}} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">How to Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: 'Search Your Crop',
                description: 'Find detailed information about the crop you want to grow'
              },
              {
                step: 2,
                title: 'Start Growing',
                description: 'Begin your growing journey with our step-by-step guidance'
              },
              {
                step: 3,
                title: 'Track Progress',
                description: 'Monitor your crop\'s growth and get timely notifications'
              }
            ].map(({ step, title, description }) => (
              <div className="text-center p-4" key={step}>
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">{step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PopularCrops />
        </motion.div>
      </section>

      <section className="py-12 md:py-16 bg-white rounded-xl shadow-soft px-4 md:px-8 mb-12 md:mb-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose AgriGuide?</h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-600">
            We provide all the tools and knowledge you need to succeed in farming,
            whether you're a beginner or experienced grower.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            title="Expert Guidance"
            description="Access detailed, step-by-step growing instructions for any crop, written by farming experts."
          />
          <FeatureCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Track Your Progress"
            description="Monitor your plants' growth, set reminders, and track your farming journey from planting to harvest."
          />
          <FeatureCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Real-time Weather Alerts"
            description="Get timely notifications about weather conditions that might affect your crops and farming activities."
          />
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <div className="bg-primary-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-8 md:p-12 md:flex items-center justify-between">
            <div className="md:max-w-xl mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to grow better crops?</h2>
              <p className="text-primary-50 text-base md:text-lg mb-6">
                Start your journey with AgriGuide today and transform your farming experience
                with expert guidance and tools.
              </p>
              <div className="flex flex-wrap gap-4">
                {/* <Link
                  to="/marketplace"
                  className="w-full sm:w-auto inline-block btn bg-white text-primary-700 hover:bg-primary-50 text-center"
                >
                  Shop Supplies
                </Link> */}
                <Link
  to="/marketplace"
  className="w-full sm:w-auto inline-block bg-white text-primary-700 font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out text-center"
>
  Shop Supplies
</Link>

                <button className="w-full sm:w-auto inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
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
