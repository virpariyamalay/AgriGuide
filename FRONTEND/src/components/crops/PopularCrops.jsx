import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { crops } from '../../data/cropData'

const PopularCrops = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'herbs', name: 'Herbs' },
    { id: 'grains', name: 'Grains' }
  ]
  
  const filteredCrops = selectedCategory === 'all' 
    ? crops.slice(0, 8) 
    : crops.filter(crop => crop.category === selectedCategory).slice(0, 8)
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popular Crops</h2>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {filteredCrops.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link 
              to={`/crop/${crop.id}`}
              className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src={crop.image} 
                  alt={crop.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {crop.difficulty}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{crop.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Growing time: {crop.growingTime}</p>
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary-500 rounded-full animate-pulse" 
                        style={{ width: `${crop.successRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-600">{crop.successRate}% success</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          to="/marketplace"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          Explore More Crops
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default PopularCrops