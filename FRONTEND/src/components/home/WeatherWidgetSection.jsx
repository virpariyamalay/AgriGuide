import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { OWM_API_KEY, API_ENDPOINTS } from '../../config/api';

const WeatherWidgetSection = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('');

    // Get weather icon based on weather condition
    const getWeatherIcon = (condition) => {
        const conditionLower = condition.toLowerCase();
        if (conditionLower.includes('clear')) return '☀️';
        if (conditionLower.includes('cloud')) return '⛅';
        if (conditionLower.includes('rain')) return '🌧️';
        if (conditionLower.includes('snow')) return '❄️';
        if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return '⛈️';
        if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
        if (conditionLower.includes('haze')) return '🌫️';
        return '🌤️';
    };

    // Get day name from date
    const getDayName = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    // Fetch weather data for given coordinates
    const fetchWeatherData = async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching weather data for:', lat, lon);
            console.log('API Key available:', !!OWM_API_KEY);
            console.log('API Endpoints:', API_ENDPOINTS.WEATHER);

            if (!OWM_API_KEY) {
                throw new Error('OpenWeatherMap API key is not configured');
            }

            // Fetch current weather
            const currentUrl = `${API_ENDPOINTS.WEATHER.CURRENT}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`;
            console.log('Current weather URL:', currentUrl);

            const currentResponse = await fetch(currentUrl);

            if (!currentResponse.ok) {
                const errorText = await currentResponse.text();
                console.error('Current weather API error:', currentResponse.status, errorText);
                throw new Error(`Failed to fetch current weather: ${currentResponse.status}`);
            }

            const currentData = await currentResponse.json();
            console.log('Current weather data:', currentData);

            // Fetch 5-day forecast
            const forecastUrl = `${API_ENDPOINTS.WEATHER.FORECAST}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`;
            console.log('Forecast URL:', forecastUrl);

            const forecastResponse = await fetch(forecastUrl);

            if (!forecastResponse.ok) {
                const errorText = await forecastResponse.text();
                console.error('Forecast API error:', forecastResponse.status, errorText);
                throw new Error(`Failed to fetch forecast: ${forecastResponse.status}`);
            }

            const forecastData = await forecastResponse.json();
            console.log('Forecast data:', forecastData);

            // Get location name using reverse geocoding
            const geoUrl = `${API_ENDPOINTS.WEATHER.GEOCODING_REVERSE}?lat=${lat}&lon=${lon}&limit=1&appid=${OWM_API_KEY}`;
            console.log('Geocoding URL:', geoUrl);

            const geoResponse = await fetch(geoUrl);

            let locationName = 'Current Location';
            if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                console.log('Geocoding data:', geoData);
                if (geoData.length > 0) {
                    const location = geoData[0];
                    locationName = `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`;
                }
            } else {
                console.warn('Geocoding failed:', geoResponse.status);
            }

            setLocation(locationName);

            // Process current weather
            setCurrentWeather({
                location: 'Current Location',
                temperature: Math.round(currentData.main.temp),
                condition: currentData.weather[0].main,
                humidity: currentData.main.humidity,
                windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
                icon: getWeatherIcon(currentData.weather[0].main),
                feelsLike: Math.round(currentData.main.feels_like)
            });

            // Process forecast (get one forecast per day for next 5 days)
            const dailyForecasts = [];
            const today = new Date();

            for (let i = 1; i <= 5; i++) {
                const targetDate = new Date(today);
                targetDate.setDate(today.getDate() + i);

                // Find forecast for this day (around noon)
                const dayForecast = forecastData.list.find(item => {
                    const itemDate = new Date(item.dt * 1000);
                    return itemDate.getDate() === targetDate.getDate() &&
                        itemDate.getHours() >= 12 &&
                        itemDate.getHours() <= 14;
                });

                if (dayForecast) {
                    dailyForecasts.push({
                        day: getDayName(dayForecast.dt * 1000),
                        temp: Math.round(dayForecast.main.temp),
                        icon: getWeatherIcon(dayForecast.weather[0].main),
                        condition: dayForecast.weather[0].main
                    });
                }
            }

            setForecast(dailyForecasts);
            console.log('Weather data processed successfully');

        } catch (err) {
            console.error('Weather fetch error:', err);
            setError(`Unable to fetch weather data: ${err.message}`);
            // Don't set fallback data when fetch fails
            setCurrentWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // Get user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Got location:', latitude, longitude);
                    fetchWeatherData(latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setError(`Location access denied: ${error.message}`);
                    setLoading(false);
                    // Don't set fallback data when location is denied
                    setCurrentWeather(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        } else {
            setError('Geolocation not supported');
            setLoading(false);
            setCurrentWeather(null);
        }
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Smart Weather Insights
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Getting your local weather data...
                        </p>
                    </motion.div>

                    <div className="flex justify-center">
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading weather data...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Smart Weather Insights
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get real-time weather updates and farming recommendations tailored to your location
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center items-stretch max-w-4xl mx-auto">
                    {/* Current Weather Widget */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className=""
                    >
                        <div className="bg-white rounded-3xl shadow-xl p-8 h-full flex flex-col justify-between">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Current Weather</h3>
                                <p className="text-gray-600">{location || currentWeather?.location}</p>
                                {error && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {error}
                                    </p>
                                )}
                            </div>

                            {currentWeather ? (
                                <>
                                    <div className="text-center mb-8">
                                        <div className="text-6xl mb-4">{currentWeather.icon}</div>
                                        <div className="text-4xl font-bold text-gray-900 mb-2">
                                            {currentWeather.temperature}°C
                                        </div>
                                        <div className="text-lg text-gray-600 mb-4">{currentWeather.condition}</div>
                                        <div className="text-sm text-gray-500">Feels like {currentWeather.feelsLike}°C</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-blue-50 p-4 rounded-xl text-center">
                                            <div className="text-2xl mb-1">💧</div>
                                            <div className="text-sm text-gray-600">Humidity</div>
                                            <div className="font-semibold text-gray-900">{currentWeather.humidity}%</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-xl text-center">
                                            <div className="text-2xl mb-1">💨</div>
                                            <div className="text-sm text-gray-600">Wind</div>
                                            <div className="font-semibold text-gray-900">{currentWeather.windSpeed} km/h</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">🌤️</div>
                                    <p className="text-gray-600 mb-2">Weather data unavailable</p>
                                    <p className="text-sm text-gray-500">Please enable location access to view weather information</p>
                                </div>
                            )}

                            <Link
                                to="/weather"
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 text-center block"
                            >
                                View Detailed Forecast
                            </Link>
                        </div>
                    </motion.div>

                    {/* 5-Day Forecast */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className=""
                    >
                        <div className="bg-white rounded-3xl shadow-xl p-8 h-full flex flex-col justify-between">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">5-Day Forecast</h3>

                            <div className="space-y-4">
                                {forecast.length > 0 ? (
                                    forecast.map((day, index) => (
                                        <motion.div
                                            key={day.day}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3">{day.icon}</span>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{day.day}</div>
                                                    <div className="text-sm text-gray-600">{day.condition}</div>
                                                </div>
                                            </div>
                                            <div className="text-xl font-bold text-gray-900">{day.temp}°C</div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <div className="text-4xl mb-4">🌤️</div>
                                        <p>Forecast data unavailable</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WeatherWidgetSection; 