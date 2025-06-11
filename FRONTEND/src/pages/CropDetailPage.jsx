import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../contexts/ProgressContext'
import GrowthStages from '../components/crops/GrowthStages'
import { toast } from 'react-toastify'

const CropDetailPage = () => {
  const { cropId } = useParams()
  const [crop, setCrop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('instructions')
  const { startProgress, getProgress } = useProgress()
  const [cropProgress, setCropProgress] = useState(null)
  
  useEffect(() => {
    const fetchCrop = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/crops/" + cropId)
        if (!response.ok) {
          throw new Error('Failed to fetch crop details')
        }
        const data = await response.json()
        setCrop(data)
        setLoading(false)
        
        // Check if this crop has progress
        const progress = getProgress(cropId)
        setCropProgress(progress)
      } catch (error) {
        console.error('Error fetching crop details:', error)
        setCrop(null)
        setLoading(false)
      }
    }
    
    fetchCrop()
  }, [cropId, getProgress])
  
  const handleStartGrowing = () => {
    startProgress(cropId)
    setCropProgress(getProgress(cropId))
    toast.success(`Started growing ${crop.name}!`)
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (!crop) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Crop Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find information about this crop.</p>
        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    )
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img 
                className="h-64 w-full object-cover md:w-96" 
                src={crop.image} 
                alt={crop.name} 
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">
                    {crop.category}
                  </div>
                  <h1 className="mt-1 text-3xl font-bold">{crop.name}</h1>
                  <p className="mt-2 text-gray-600">{crop.description}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {crop.difficulty}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-primary-50 p-3 rounded-lg text-center">
                  <span className="block text-sm text-gray-600">Growing Time</span>
                  <span className="block font-bold text-primary-700">{crop.growingTime}</span>
                </div>
                <div className="bg-primary-50 p-3 rounded-lg text-center">
                  <span className="block text-sm text-gray-600">Water Needs</span>
                  <span className="block font-bold text-primary-700">{crop.waterNeeds}</span>
                </div>
                <div className="bg-primary-50 p-3 rounded-lg text-center">
                  <span className="block text-sm text-gray-600">Sunlight</span>
                  <span className="block font-bold text-primary-700">{crop.sunlight}</span>
                </div>
              </div>
              
              <div className="mt-6">
                {cropProgress ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/progress" 
                      className="btn btn-primary flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      View Progress
                    </Link>
                    <Link 
                      to="/marketplace" 
                      className="btn btn-outline flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14.0..." />
                      </svg>
                      Shop Supplies
                    </Link>
                  </div>
                ) : (
                  <button 
                    onClick={handleStartGrowing}
                    className="btn btn-primary w-full sm:w-auto flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Start Growing
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('instructions')}
                className={`${
                  activeTab === 'instructions'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Growing Instructions
              </button>
              <button
                onClick={() => setActiveTab('stages')}
                className={`${
                  activeTab === 'stages'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Growth Stages
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`${
                  activeTab === 'tips'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Tips & Troubleshooting
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'instructions' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Preparation</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    {crop.instructions.preparation.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Planting</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    {crop.instructions.planting.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Care</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    {crop.instructions.care.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Harvesting</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    {crop.instructions.harvesting.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
            
            {activeTab === 'stages' && (
              <GrowthStages stages={crop.growthStages} />
            )}
            
            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Common Problems</h3>
                  <ul className="space-y-4">
                    {crop.tips.commonProblems.map((problem, index) => (
                      <li key={index} className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-1">{problem.name}</h4>
                        <p className="text-gray-700">{problem.solution}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Expert Tips</h3>
                  <ul className="space-y-2">
                    {crop.tips.expertTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crop.recommendedProducts.map((product, index) => (
              <Link 
                key={index}
                to="/marketplace"
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary-600">${product.price.toFixed(2)}</span>
                    <button className="btn btn-sm btn-primary py-1 px-3 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CropDetailPage
