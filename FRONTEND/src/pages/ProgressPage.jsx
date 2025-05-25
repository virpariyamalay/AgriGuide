import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgress } from '../contexts/ProgressContext'
import { crops } from '../data/cropData'
import ProgressCard from '../components/progress/ProgressCard'
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
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Growing Progress</h1>
        <p className="text-lg text-gray-600">
          Track and manage all your ongoing crops in one place. Update their progress as they grow.
        </p>
      </div>
      
      {cropData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No crops growing yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't started growing any crops yet. Browse our catalog and start growing today!
          </p>
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Start Growing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cropData.map((crop, index) => (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProgressCard 
                crop={crop} 
                onAdvance={() => handleAdvanceStage(crop.id)}
                onRemove={() => confirmRemove(crop.id)}
              />
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-2">Remove Crop</h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to remove this crop from your growing list? This will delete all progress data.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelRemove}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
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