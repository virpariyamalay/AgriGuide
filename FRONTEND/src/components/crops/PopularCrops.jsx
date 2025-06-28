import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PopularCrops = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'herbs', name: 'Herbs' },
    { id: 'grains', name: 'Grains' }
  ]

  const handleImageError = (cropId) => {
    setImageErrors(prev => ({ ...prev, [cropId]: true }))
  }

  const getImageSrc = (crop) => {
    if (imageErrors[crop.id]) {
      // Return a placeholder image or null to show fallback
      return null
    }
    return crop.image
  }

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/crops')
        if (!response.ok) {
          throw new Error('Failed to fetch crops')
        }
        const data = await response.json()
        setCrops(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCrops()
  }, [])

  const filteredCrops = selectedCategory === 'all'
    ? crops.slice(0, 8)
    : crops.filter(crop => crop.category === selectedCategory).slice(0, 8)

  if (loading) {
    return <div>Loading popular crops...</div>
  }

  if (error) {
    return <div>Error loading crops: {error}</div>
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Popular Crops</h2>
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${selectedCategory === category.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-primary-600'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
                {getImageSrc(crop) ? (
                  <img
                    src={getImageSrc(crop)}
                    alt={crop.name}
                    className="w-full h-32 sm:h-36 md:h-40 object-cover"
                    onError={() => handleImageError(crop.id)}
                  />
                ) : (
                  <div className="w-full h-32 sm:h-36 md:h-40 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🌱</div>
                      <div className="text-sm text-gray-600 font-medium">{crop.name}</div>
                    </div>
                  </div>
                )}
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
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <Link
          to="/marketplace"
          className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 w-full sm:w-auto"
        >
          Explore Marketplace
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default PopularCrops
