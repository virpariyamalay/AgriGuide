import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { API_ENDPOINTS } from '../config/api'

const MarketRatesPage = () => {
  const [marketData, setMarketData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCrop, setSelectedCrop] = useState('all')

  const gujaratCities = [
    { id: 'all', name: 'All Cities' },
    { id: 'ahmedabad', name: 'Ahmedabad' },
    { id: 'surat', name: 'Surat' },
    { id: 'vadodara', name: 'Vadodara' },
    { id: 'rajkot', name: 'Rajkot' },
    { id: 'bhavnagar', name: 'Bhavnagar' },
    { id: 'jamnagar', name: 'Jamnagar' },
    { id: 'junagadh', name: 'Junagadh' },
    { id: 'gandhinagar', name: 'Gandhinagar' },
    { id: 'anand', name: 'Anand' }
  ]

  const crops = [
    { id: 'all', name: 'All Crops' },
    { id: 'cotton', name: 'Cotton' },
    { id: 'groundnut', name: 'Groundnut' },
    { id: 'wheat', name: 'Wheat' },
    { id: 'castor', name: 'Castor' },
    { id: 'cumin', name: 'Cumin' },
    { id: 'pearl_millet', name: 'Pearl Millet' },
    { id: 'soybean', name: 'Soybean' },
    { id: 'rice', name: 'Rice' },
    { id: 'mustard', name: 'Mustard' }
  ]

  useEffect(() => {
    fetchMarketData()
  }, [selectedCity, selectedCrop])

  const fetchMarketData = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_ENDPOINTS.MARKET.RATES)
      if (!response.ok) {
        throw new Error('Failed to fetch market data')
      }
      let data = await response.json()

      if (selectedCity !== 'all') {
        data = data.filter(item => item.city === selectedCity)
      }

      if (selectedCrop !== 'all') {
        data = data.filter(item => item.cropId === selectedCrop)
      }

      setMarketData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching market data:', error)
      setMarketData([])
      setLastUpdated(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchMarketData()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gujarat Market Rates</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated ? format(lastUpdated, 'PPpp') : 'Never'}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="btn btn-primary flex items-center"
        >
          Refresh Rates
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Select City</h3>
            <div className="flex flex-wrap gap-2">
              {gujaratCities.map(city => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCity === city.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Crop</h3>
            <div className="flex flex-wrap gap-2">
              {crops.map(crop => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCrop === crop.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {crop.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.crop}</h3>
                  <p className="text-sm text-gray-600">{item.variety}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-1">
                    {gujaratCities.find(city => city.id === item.city)?.name}
                  </span>
                  <span className={`inline-flex items-center text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {item.trend === 'up' ? '↑' : '↓'} {item.change}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market</span>
                  <span className="font-medium">{item.marketName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Min Price</span>
                  <span className="font-medium">₹{item.minPrice}/quintal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Max Price</span>
                  <span className="font-medium">₹{item.maxPrice}/quintal</span>
                </div>
                <div className="flex justify-between items-center bg-primary-50 p-2 rounded">
                  <span className="text-primary-700 font-medium">Modal Price</span>
                  <span className="font-bold text-primary-700">₹{item.modalPrice}/quintal</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last updated: {format(new Date(item.lastUpdated), 'PP')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MarketRatesPage