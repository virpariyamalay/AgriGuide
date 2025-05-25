import { createContext, useContext, useState, useEffect } from 'react'

const WeatherContext = createContext()

export const useWeather = () => useContext(WeatherContext)

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Normally we would use the OpenWeatherMap API here
        // For demo purposes, we're using mock data
        const mockData = {
          lat: 40.7128,
          lon: -74.006,
          timezone: 'America/New_York',
          current: {
            temp: 24,
            feels_like: 25,
            humidity: 65,
            wind_speed: 3.5,
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
              }
            ]
          },
          daily: [
            {
              dt: Date.now() / 1000,
              temp: {
                day: 24,
                min: 19,
                max: 27
              },
              weather: [
                {
                  id: 800,
                  main: 'Clear',
                  description: 'clear sky',
                  icon: '01d'
                }
              ]
            },
            // Additional days would be here
          ],
          alerts: [
            {
              sender_name: 'Weather Service',
              event: 'Heat Advisory',
              description: 'High temperatures expected over the next 3 days. Make sure to water your plants more frequently, especially during morning or evening hours to prevent water loss due to evaporation.',
              recommendation: 'Shield sensitive plants from direct afternoon sunlight and increase watering frequency.'
            }
          ]
        }
        
        setTimeout(() => {
          setWeatherData(mockData)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchWeatherData()
    
    // Set up interval to refresh weather data every hour
    const interval = setInterval(fetchWeatherData, 3600000)
    
    return () => clearInterval(interval)
  }, [])
  
  const value = {
    weatherData,
    loading,
    error
  }
  
  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}