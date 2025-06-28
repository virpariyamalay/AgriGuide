import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
// Removed import of crops from cropData.js

const CropSearch = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const [crops, setCrops] = useState([]) // state to hold fetched crops
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch crops from backend API
    const fetchCrops = async () => {
      try {
        const response = await fetch('/api/crops')
        if (!response.ok) {
          throw new Error('Failed to fetch crops')
        }
        const data = await response.json()
        setCrops(data)
      } catch (error) {
        console.error('Error fetching crops:', error)
      }
    }
    fetchCrops()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    if (query.trim() === '') return

    const foundCrop = crops.find(
      crop => crop.name.toLowerCase() === query.toLowerCase()
    )

    if (foundCrop) {
      navigate(`/crop/${foundCrop._id || foundCrop.id}`)
    } else {
      setSearchQuery(query)
    }
  }

  const handleQueryChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      setSuggestions([])
    } else {
      const filtered = crops.filter(crop =>
        crop.name.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
    }
  }

  const handleSuggestionClick = (cropId) => {
    navigate(`/crop/${cropId}`)
    setSuggestions([])
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="mx-auto w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={handleQueryChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="block w-full pl-10 pr-3 py-4 border border-neutral-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-neutral-900 placeholder-gray-500"
                placeholder="Enter a crop name (e.g., Tomato, Corn, Lettuce)"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 px-6 rounded-r-lg transition duration-150 ease-in-out flex items-center"
            >
              Search
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {isFocused && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
              <ul className="py-1">
                {suggestions.map(crop => (
                  <li
                    key={crop._id || crop.id}
                    onClick={() => handleSuggestionClick(crop._id || crop.id)}
                    className="px-4 py-2 hover:bg-primary-50 cursor-pointer flex items-center"
                  >
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <span>{crop.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-4 text-center">
        <p className="text-sm text-white/90">
          Popular searches:
          <button
            onClick={() => handleSuggestionClick('tomato')}
            className="text-white hover:text-green-300 font-medium mx-1 transition-colors duration-200"
          >
            Tomato
          </button>
          <button
            onClick={() => handleSuggestionClick('cucumber')}
            className="text-white hover:text-green-300 font-medium mx-1 transition-colors duration-200"
          >
            Cucumber
          </button>
          <button
            onClick={() => handleSuggestionClick('carrot')}
            className="text-white hover:text-green-300 font-medium mx-1 transition-colors duration-200"
          >
            Carrot
          </button>
          <button
            onClick={() => handleSuggestionClick('lettuce')}
            className="text-white hover:text-green-300 font-medium mx-1 transition-colors duration-200"
          >
            Lettuce
          </button>
        </p>
      </div>
    </div>
  )
}

export default CropSearch
