import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CropSearch from '../components/crops/CropSearch'
import PopularCrops from '../components/crops/PopularCrops'
import FeatureCard from '../components/ui/FeatureCard'
import { TypeAnimation } from 'react-type-animation';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* <section className="py-12 md:py-20">
        <div className="text-center mb-12">
          <motion.h1 
            className="mb-4 text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Grow Better with <span className="text-primary-600">AgriGuide</span>
          </motion.h1>
          <motion.p 
            className="mx-auto max-w-2xl text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your complete companion for successful farming - from seed to harvest.
            Get step-by-step instructions, track your progress, and shop for supplies.
          </motion.p>
        </div>
        
        <div className="mb-16">
          <CropSearch setSearchQuery={setSearchQuery} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PopularCrops />
        </motion.div>
      </section> */}
      
<section className="py-12 md:py-20">
  <div className="text-center mb-12">
    <motion.h1 
      className="mb-4 text-4xl md:text-5xl font-bold leading-tight"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Grow Better with <span className="text-primary-600">AgriGuide</span>
    </motion.h1>

    <div className="text-xl md:text-2xl font-semibold text-primary-700 h-[50px] mb-4">
      <TypeAnimation
        sequence={[
          "Plan Smarter.",
          2000,
          "Grow Faster.",
          2000,
          "Harvest Better.",
          2000,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        className="text-secondary"
      />
    </div>

    <motion.p 
      className="mx-auto max-w-2xl text-lg text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Your complete companion for successful farming - from seed to harvest.
      Get step-by-step instructions, track your progress, and shop for supplies.
    </motion.p>
  </div>
  
  <div className="mb-16">
    <CropSearch setSearchQuery={setSearchQuery} />
  </div>
  
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <PopularCrops />
  </motion.div>
</section>

      
      <section className="py-16 bg-white rounded-xl shadow-soft px-4 md:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose AgriGuide?</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We provide all the tools and knowledge you need to succeed in farming,
            whether you're a beginner or experienced grower.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            title="Expert Guidance"
            description="Access detailed, step-by-step growing instructions for any crop, written by farming experts."
          />
          
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Track Your Progress"
            description="Monitor your plants' growth, set reminders, and track your farming journey from planting to harvest."
          />
          
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Real-time Weather Alerts"
            description="Get timely notifications about weather conditions that might affect your crops and farming activities."
          />
          
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title="One-Stop Shop"
            description="Browse and purchase all your farming needs - from seeds and fertilizers to tools and equipment."
          />
          
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
            title="Smart Notifications"
            description="Receive timely reminders for important farming tasks like watering, fertilizing, and harvesting."
          />
          
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
            title="Mobile Friendly"
            description="Access all features on the go with our mobile-optimized design - perfect for checking while in the field."
          />
        </div>
      </section>
      
      <section className="mb-16">
        <div className="bg-primary-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-12 md:p-12 md:flex items-center justify-between">
            <div className="md:max-w-xl mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to grow better crops?</h2>
              <p className="text-primary-50 text-lg mb-6">
                Start your journey with AgriGuide today and transform your farming experience
                with expert guidance and tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/marketplace" 
                  className="inline-block btn bg-white text-primary-700 hover:bg-primary-50"
                >
                  Shop Supplies
                </Link>
                <button className="inline-block btn btn-outline border-white text-white hover:bg-primary-700">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/3">
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
  )
}

export default HomePage