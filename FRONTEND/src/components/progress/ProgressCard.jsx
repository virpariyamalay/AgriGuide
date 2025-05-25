import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProgressCard = ({ crop, onAdvance, onRemove }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  const { currentStage, startDate } = crop.progress
  const totalStages = crop.growthStages.length
  const percentComplete = Math.round((currentStage / totalStages) * 100)
  
  const currentStageInfo = crop.growthStages[currentStage - 1]
  const nextStageInfo = currentStage < totalStages ? crop.growthStages[currentStage] : null
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  const daysElapsed = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24))
  
  return (
    <div 
      className="relative bg-white rounded-xl shadow-md overflow-hidden h-full"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className={`relative w-full h-full transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}
        >
          <div className="relative">
            <img 
              src={crop.image} 
              alt={crop.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-xl mb-1">{crop.name}</h3>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Started: {formatDate(startDate)}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 text-primary-600 rounded-full px-2 py-1 text-xs font-bold">
              Day {daysElapsed}
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Current Stage</h3>
              <span className="text-sm text-gray-600">
                {currentStage} of {totalStages}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-primary-600 h-2.5 rounded-full animate-pulse-slow" 
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
            
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 mr-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                  {currentStage}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary-600">{currentStageInfo.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{currentStageInfo.description}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                View Details
              </button>
              
              {currentStage < totalStages ? (
                <button
                  onClick={onAdvance}
                  className="btn btn-primary py-1 px-3 text-sm"
                >
                  Next Stage
                </button>
              ) : (
                <button
                  className="btn bg-accent-500 text-white hover:bg-accent-600 py-1 px-3 text-sm"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Back Side */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 ${isFlipped ? 'visible' : 'invisible'}`}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">{crop.name} - Tasks</h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4 flex-grow">
              <h4 className="font-medium text-primary-600 mb-2">Current Stage Tasks:</h4>
              <ul className="space-y-2">
                {currentStageInfo.tasks.map((task, index) => (
                  <li key={index} className="flex items-start">
                    <input
                      type="checkbox"
                      id={`task-${index}`}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor={`task-${index}`} className="text-gray-700">{task}</label>
                  </li>
                ))}
              </ul>
            </div>
            
            {nextStageInfo && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Coming Up Next:</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-medium">{nextStageInfo.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">{nextStageInfo.description}</p>
                </div>
              </div>
            )}
            
            <div className="mt-auto flex justify-between">
              <Link 
                to={`/crop/${crop.id}`}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Crop Guide
              </Link>
              
              <button
                onClick={onRemove}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProgressCard