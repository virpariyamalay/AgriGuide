import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProgressContext = createContext()

export const useProgress = () => useContext(ProgressContext)

export const ProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({})
  const { user } = useAuth()
  
  // Load progress from localStorage on initial render
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`agriguide-progress-${user.id}`)
      if (savedProgress) {
        try {
          setUserProgress(JSON.parse(savedProgress))
        } catch (error) {
          console.error('Error parsing progress data from localStorage:', error)
          setUserProgress({})
        }
      }
    } else {
      setUserProgress({})
    }
  }, [user])
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`agriguide-progress-${user.id}`, JSON.stringify(userProgress))
    }
  }, [userProgress, user])
  
  const startProgress = (cropId) => {
    if (!user) return
    
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
    if (!user) return
    
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
    if (!user) return
    
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
    if (!user) return
    
    setUserProgress(prevProgress => {
      const newProgress = { ...prevProgress }
      delete newProgress[cropId]
      return newProgress
    })
  }
  
  const getProgress = (cropId) => {
    if (!user) return null
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