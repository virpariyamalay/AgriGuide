import React, { createContext, useContext, useState, useEffect } from 'react';
import { OWM_API_KEY, API_ENDPOINTS } from '../config/api';

const WeatherAlertContext = createContext();

export const useWeatherAlerts = () => {
    const context = useContext(WeatherAlertContext);
    if (!context) {
        throw new Error('useWeatherAlerts must be used within a WeatherAlertProvider');
    }
    return context;
};

export const WeatherAlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [currentCoords, setCurrentCoords] = useState(null);
    const [loading, setLoading] = useState(false);

    // Generate farming alerts based on weather conditions
    const generateFarmingAlerts = (weatherData, location) => {
        const newAlerts = [];
        const { temp, humidity, windSpeed, condition, forecast } = weatherData;

        // Temperature-based alerts
        if (temp > 35) {
            newAlerts.push({
                id: 'high-temp',
                type: 'warning',
                title: 'High Temperature Alert',
                message: `Temperature is ${temp}°C. Consider additional irrigation and shade for sensitive crops.`,
                icon: '🔥',
                severity: 'high',
                recommendations: [
                    'Increase irrigation frequency',
                    'Provide shade for young plants',
                    'Monitor for heat stress symptoms'
                ]
            });
        }

        if (temp < 10) {
            newAlerts.push({
                id: 'low-temp',
                type: 'warning',
                title: 'Low Temperature Alert',
                message: `Temperature is ${temp}°C. Protect crops from cold damage.`,
                icon: '❄️',
                severity: 'high',
                recommendations: [
                    'Cover sensitive crops with frost cloth',
                    'Reduce irrigation to prevent freezing',
                    'Consider greenhouse protection'
                ]
            });
        }

        // Humidity-based alerts
        if (humidity > 80) {
            newAlerts.push({
                id: 'high-humidity',
                type: 'info',
                title: 'High Humidity Alert',
                message: `Humidity is ${humidity}%. Monitor for fungal diseases.`,
                icon: '💧',
                severity: 'medium',
                recommendations: [
                    'Improve air circulation',
                    'Apply preventive fungicides',
                    'Avoid overhead irrigation'
                ]
            });
        }

        if (humidity < 30) {
            newAlerts.push({
                id: 'low-humidity',
                type: 'info',
                title: 'Low Humidity Alert',
                message: `Humidity is ${humidity}%. Increase irrigation frequency.`,
                icon: '🌵',
                severity: 'medium',
                recommendations: [
                    'Increase irrigation frequency',
                    'Use mulch to retain moisture',
                    'Consider misting systems'
                ]
            });
        }

        // Wind-based alerts
        if (windSpeed > 20) {
            newAlerts.push({
                id: 'high-wind',
                type: 'warning',
                title: 'High Wind Alert',
                message: `Wind speed is ${windSpeed} km/h. Protect crops from wind damage.`,
                icon: '💨',
                severity: 'medium',
                recommendations: [
                    'Install windbreaks',
                    'Stake tall plants',
                    'Avoid spraying pesticides in high winds'
                ]
            });
        }

        // Rain-based alerts
        if (condition.toLowerCase().includes('rain')) {
            newAlerts.push({
                id: 'rain-alert',
                type: 'info',
                title: 'Rain Alert',
                message: 'Rain is expected. Adjust irrigation and protect from waterlogging.',
                icon: '🌧️',
                severity: 'low',
                recommendations: [
                    'Reduce irrigation frequency',
                    'Ensure proper drainage',
                    'Delay pesticide applications'
                ]
            });
        }

        // Frost alert (if temperature is near freezing)
        if (temp <= 2 && temp > 0) {
            newAlerts.push({
                id: 'frost-warning',
                type: 'warning',
                title: 'Frost Warning',
                message: 'Temperature near freezing. Protect sensitive crops.',
                icon: '🥶',
                severity: 'high',
                recommendations: [
                    'Cover crops with frost cloth',
                    'Use row covers',
                    'Consider heating systems'
                ]
            });
        }

        // Drought alert (if no rain in forecast and low humidity)
        if (humidity < 40 && !forecast.some(day => day.condition.toLowerCase().includes('rain'))) {
            newAlerts.push({
                id: 'drought-warning',
                type: 'warning',
                title: 'Drought Warning',
                message: 'Low humidity and no rain expected. Implement drought management.',
                icon: '🌵',
                severity: 'high',
                recommendations: [
                    'Implement drip irrigation',
                    'Use drought-resistant varieties',
                    'Apply mulch to retain moisture'
                ]
            });
        }

        // Optimal planting conditions
        if (temp >= 15 && temp <= 25 && humidity >= 50 && humidity <= 70) {
            newAlerts.push({
                id: 'optimal-conditions',
                type: 'success',
                title: 'Optimal Planting Conditions',
                message: 'Perfect weather for planting most crops!',
                icon: '🌱',
                severity: 'low',
                recommendations: [
                    'Plant warm-season crops',
                    'Transplant seedlings',
                    'Apply balanced fertilizer'
                ]
            });
        }

        return newAlerts;
    };

    // Fetch weather data and generate alerts
    const fetchWeatherAlerts = async (lat, lon) => {
        try {
            setLoading(true);
            setCurrentCoords({ lat, lon });

            // Fetch current weather
            const currentResponse = await fetch(
                `${API_ENDPOINTS.WEATHER.CURRENT}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`
            );

            if (!currentResponse.ok) throw new Error('Failed to fetch current weather');
            const currentData = await currentResponse.json();

            // Fetch forecast
            const forecastResponse = await fetch(
                `${API_ENDPOINTS.WEATHER.FORECAST}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`
            );

            if (!forecastResponse.ok) throw new Error('Failed to fetch forecast');
            const forecastData = await forecastResponse.json();

            // Get location name
            const geoResponse = await fetch(
                `${API_ENDPOINTS.WEATHER.GEOCODING_REVERSE}?lat=${lat}&lon=${lon}&limit=5&appid=${OWM_API_KEY}`
            );

            let locationName = 'Current Location';
            if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                if (geoData.length > 0) {
                    // Try to find a match for Lalpur or Jamnagar
                    const preferred = geoData.find(
                        loc =>
                            (loc.name && loc.name.toLowerCase().includes('lalpur')) ||
                            (loc.name && loc.name.toLowerCase().includes('jamnagar')) ||
                            (loc.state && loc.state.toLowerCase().includes('jamnagar'))
                    );
                    const location = preferred || geoData[0];
                    locationName = `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`;
                }
            }
            setCurrentLocation(locationName);

            // Process weather data
            const weatherData = {
                temp: Math.round(currentData.main.temp),
                humidity: currentData.main.humidity,
                windSpeed: Math.round(currentData.wind.speed * 3.6),
                condition: currentData.weather[0].main,
                forecast: forecastData.list.slice(0, 8).map(item => ({
                    temp: Math.round(item.main.temp),
                    condition: item.weather[0].main,
                    humidity: item.main.humidity
                }))
            };

            // Generate alerts
            const newAlerts = generateFarmingAlerts(weatherData, locationName);
            setAlerts(newAlerts);

        } catch (error) {
            console.error('Error fetching weather alerts:', error);
            // Set fallback alerts
            setAlerts([
                {
                    id: 'sample-alert',
                    type: 'info',
                    title: 'Weather Data Unavailable',
                    message: 'Unable to fetch real-time weather data. Please check your internet connection.',
                    icon: 'ℹ️',
                    severity: 'low',
                    recommendations: ['Check internet connection', 'Try refreshing the page']
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Get user location and fetch alerts
    const initializeWeatherAlerts = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherAlerts(latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setAlerts([
                        {
                            id: 'location-error',
                            type: 'warning',
                            title: 'Location Access Required',
                            message: 'Please enable location access to get personalized weather alerts.',
                            icon: '📍',
                            severity: 'medium',
                            recommendations: ['Enable location access in browser settings', 'Refresh the page']
                        }
                    ]);
                }
            );
        } else {
            setAlerts([
                {
                    id: 'no-geolocation',
                    type: 'warning',
                    title: 'Geolocation Not Supported',
                    message: 'Your browser does not support geolocation.',
                    icon: '🌐',
                    severity: 'medium',
                    recommendations: ['Use a modern browser', 'Enable location services']
                }
            ]);
        }
    };

    // Refresh alerts
    const refreshAlerts = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherAlerts(latitude, longitude);
                }
            );
        }
    };

    // Initialize on mount
    useEffect(() => {
        initializeWeatherAlerts();

        // Refresh alerts every 30 minutes
        const interval = setInterval(refreshAlerts, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    // Dismiss alert by id
    const dismissAlert = (id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const value = {
        alerts,
        currentLocation,
        currentCoords,
        loading,
        refreshAlerts,
        initializeWeatherAlerts,
        dismissAlert,
    };

    return (
        <WeatherAlertContext.Provider value={value}>
            {children}
        </WeatherAlertContext.Provider>
    );
}; 