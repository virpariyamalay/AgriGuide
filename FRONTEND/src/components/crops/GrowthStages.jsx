import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GrowthStages = ({ stages }) => {
  const [expandedStage, setExpandedStage] = useState(0)
  
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-12 w-1 bg-gray-200 z-0"></div>
      
      <div className="space-y-8 relative z-10">
        {stages.map((stage, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex"
          >
            <div className="flex-shrink-0 relative">
              <div 
                className={`flex items-center justify-center w-24 h-24 rounded-full ${
                  expandedStage === index 
                    ? 'bg-primary-100 text-primary-700 border-4 border-primary-500'
                    : 'bg-gray-100 text-gray-700 border-4 border-gray-300'
                } cursor-pointer hover:bg-primary-50 transition-colors duration-200 font-bold text-lg z-10`}
                onClick={() => setExpandedStage(index)}
              >
                Day {stage.day}
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                <div className={`w-8 h-8 rounded-full ${expandedStage === index ? 'bg-primary-500' : 'bg-gray-400'}`}></div>
              </div>
            </div>
            
            <div className="ml-8 flex-grow">
              <div 
                className={`p-4 rounded-lg transition-all duration-300 ${
                  expandedStage === index ? 'bg-primary-50 shadow-md' : 'bg-white border border-gray-200'
                }`}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedStage(index === expandedStage ? null : index)}
                >
                  <h3 className={`font-semibold text-lg ${expandedStage === index ? 'text-primary-700' : 'text-gray-800'}`}>
                    {stage.name}
                  </h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transform transition-transform duration-200 ${expandedStage === index ? 'rotate-180 text-primary-600' : 'text-gray-500'}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <AnimatePresence>
                  {expandedStage === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <img 
                            src={stage.image} 
                            alt={stage.name}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-gray-700 mb-4">{stage.description}</p>
                          
                          <div>
                            <h4 className="font-medium text-primary-700 mb-2">What to do at this stage:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {stage.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="text-gray-700">{task}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default GrowthStages