import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../contexts/ProgressContext'
import { crops } from '../data/cropData'
import { toast } from 'react-toastify'

const ProgressPage = () => {
  const { userProgress, updateStage, removeProgress } = useProgress()
  const [cropData, setCropData] = useState([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [cropToRemove, setCropToRemove] = useState(null)
  
  useEffect(() => {
    const getCropDetails = () => {
      return Object.entries(userProgress).map(([cropId, progress]) => {
        const cropInfo = crops.find(crop => crop.id === cropId)
        return {
          ...cropInfo,
          progress
        }
      })
    }
    
    setCropData(getCropDetails())
  }, [userProgress])
  
  const handleAdvanceStage = (cropId) => {
    updateStage(cropId)
    toast.success('Progress updated!')
  }
  
  const confirmRemove = (cropId) => {
    setCropToRemove(cropId)
    setShowConfirmModal(true)
  }
  
  const handleRemove = () => {
    if (cropToRemove) {
      removeProgress(cropToRemove)
      toast.info('Removed from your growing list')
      setShowConfirmModal(false)
      setCropToRemove(null)
    }
  }
  
  const cancelRemove = () => {
    setShowConfirmModal(false)
    setCropToRemove(null)
  }
  
  if (cropData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Start Your Growing Journey</h2>
            <p className="text-gray-600 mb-8">
              Begin by selecting a crop you'd like to grow. We'll provide step-by-step guidance and track your progress throughout the growing season.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition duration-150 ease-in-out w-full md:w-auto"
            >
              Browse Crops to Grow
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">My Growing Progress</h1>
          <p className="text-gray-600 text-center mb-6">
            Track and manage your growing crops. Each card shows the current stage, tasks, and progress of your plants.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cropData.map((crop) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="relative h-48">
                  <img 
                    src={crop.image} 
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{crop.name}</h3>
                    <p className="text-sm">Stage {crop.progress.currentStage} of {crop.growthStages.length}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-primary-600">
                        {Math.round((crop.progress.currentStage / crop.growthStages.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(crop.progress.currentStage / crop.growthStages.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Current Stage:</h4>
                      <p className="text-gray-600">{crop.growthStages[crop.progress.currentStage - 1].name}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => confirmRemove(crop.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                      
                      <button
                        onClick={() => handleAdvanceStage(crop.id)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium"
                        disabled={crop.progress.currentStage >= crop.growthStages.length}
                      >
                        {crop.progress.currentStage >= crop.growthStages.length ? 'Completed' : 'Next Stage'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Remove Crop</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to remove this crop from your growing list? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelRemove}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressPage