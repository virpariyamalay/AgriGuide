import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WeatherAlert = ({ alert }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
  return (
    <motion.div 
      className="bg-accent-50 border-l-4 border-accent-500 rounded-lg shadow-md mb-6 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-accent-800">
                Weather Alert: {alert.event}
              </h3>
              <div className="mt-1 text-sm text-accent-700">
                <p className="line-clamp-2">
                  {alert.description.substring(0, 120)}
                  {alert.description.length > 120 && !isExpanded && '...'}
                </p>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-2">{alert.description.substring(120)}</p>
                      {alert.recommendation && (
                        <div className="mt-2">
                          <span className="font-medium">Recommendation: </span>
                          {alert.recommendation}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  className="text-sm font-medium text-accent-600 hover:text-accent-800"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="ml-4 inline-flex text-gray-400 focus:outline-none focus:text-gray-500"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherAlert