import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext()

export const useProgress = () => useContext(ProgressContext)

export const ProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({})
  
  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('agriguide-progress')
    if (savedProgress) {
      try {
        setUserProgress(JSON.parse(savedProgress))
      } catch (error) {
        console.error('Error parsing progress data from localStorage:', error)
        setUserProgress({})
      }
    }
  }, [])
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('agriguide-progress', JSON.stringify(userProgress))
  }, [userProgress])
  
  const startProgress = (cropId) => {
    setUserProgress(prevProgress => ({
      ...prevProgress,
      [cropId]: {
        currentStage: 1,
        startDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        completedTasks: []
      }
    }))
  }
  
  const updateStage = (cropId) => {
    setUserProgress(prevProgress => {
      const cropProgress = prevProgress[cropId]
      
      if (!cropProgress) return prevProgress
      
      return {
        ...prevProgress,
        [cropId]: {
          ...cropProgress,
          currentStage: cropProgress.currentStage + 1,
          lastUpdated: new Date().toISOString()
        }
      }
    })
  }
  
  const completeTask = (cropId, taskIndex) => {
    setUserProgress(prevProgress => {
      const cropProgress = prevProgress[cropId]
      
      if (!cropProgress) return prevProgress
      
      const completedTasks = cropProgress.completedTasks || []
      
      return {
        ...prevProgress,
        [cropId]: {
          ...cropProgress,
          completedTasks: [...completedTasks, taskIndex],
          lastUpdated: new Date().toISOString()
        }
      }
    })
  }
  
  const removeProgress = (cropId) => {
    setUserProgress(prevProgress => {
      const newProgress = { ...prevProgress }
      delete newProgress[cropId]
      return newProgress
    })
  }
  
  const getProgress = (cropId) => {
    return userProgress[cropId] || null
  }
  
  const value = {
    userProgress,
    startProgress,
    updateStage,
    completeTask,
    removeProgress,
    getProgress
  }
  
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}