import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { OWM_API_KEY, API_ENDPOINTS } from '../../config/api';

const WeatherSearchForm = ({ onFetchData, loading, error, setError }) => {
    const [city, setCity] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const cityInputRef = useRef();

    // Fetch city suggestions from OpenWeatherMap Geocoding API
    const fetchCitySuggestions = async (query) => {
        if (!query.trim()) {
            setCitySuggestions([]);
            return;
        }
        try {
            const res = await fetch(
                `${API_ENDPOINTS.WEATHER.GEOCODING}?q=${encodeURIComponent(query)}&limit=5&appid=${OWM_API_KEY}`
            );
            if (!res.ok) throw new Error('Failed to fetch city suggestions');
            const data = await res.json();
            setCitySuggestions(data);
        } catch (err) {
            setCitySuggestions([]);
        }
    };

    const handleCityInput = (e) => {
        const value = e.target.value;
        setError(null);
        setCity(value);
        setShowSuggestions(true);
        fetchCitySuggestions(value);
    };

    const handleCitySelect = (suggestion) => {
        setCity(`${suggestion.name}${suggestion.state ? ', ' + suggestion.state : ''}, ${suggestion.country}`);
        setShowSuggestions(false);
        setCitySuggestions([]);
        if (cityInputRef.current) cityInputRef.current.blur();
    };

    const validateInputs = () => {
        const now = new Date();
        if (!city.trim()) {
            setError('Please enter a city name');
            return false;
        }
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return false;
        }
        if (startDate > endDate) {
            setError('Start date cannot be later than end date');
            return false;
        }
        if (endDate < startDate) {
            setError('End date cannot be earlier than start date');
            return false;
        }
        if (startDate > now) {
            setError('Start date cannot be in the future');
            return false;
        }
        if (endDate > now) {
            setError('End date cannot be in the future');
            return false;
        }
        return true;
    };

    const handleFetchData = () => {
        if (validateInputs()) {
            onFetchData({ city, startDate, endDate });
        }
    };

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border border-blue-100"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Search Weather Data
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Enter a city name and select date range to get detailed weather information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* City Input */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                🌍 City Name
                            </label>
                            <div className="relative">
                                <input
                                    ref={cityInputRef}
                                    type="text"
                                    value={city}
                                    onChange={handleCityInput}
                                    onFocus={() => city && setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${error && !city.trim() ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter city name"
                                />
                                {showSuggestions && citySuggestions.length > 0 && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute z-10 left-0 right-0 bg-white border-2 border-blue-200 rounded-xl shadow-xl mt-1 max-h-48 overflow-y-auto"
                                    >
                                        {citySuggestions.map((s, idx) => (
                                            <li
                                                key={s.lat + '-' + s.lon + '-' + idx}
                                                className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                                onMouseDown={() => handleCitySelect(s)}
                                            >
                                                <div className="font-medium">{s.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {s.state ? `${s.state}, ` : ''}{s.country}
                                                </div>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </div>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                📅 Start Date
                            </label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    setError(null);
                                    setStartDate(date);
                                }}
                                dateFormat="dd-MM-yyyy"
                                maxDate={new Date()}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${error && !startDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholderText="Select start date"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                📅 End Date
                            </label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => {
                                    setError(null);
                                    setEndDate(date);
                                }}
                                minDate={startDate}
                                maxDate={new Date()}
                                dateFormat="dd-MM-yyyy"
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${error && !endDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholderText="Select end date"
                            />
                        </div>

                        {/* Fetch Button */}
                        <div className="flex items-end">
                            <motion.button
                                onClick={handleFetchData}
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                        />
                                        Loading...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        🔍 Fetch Data
                                    </span>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl"
                        >
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default WeatherSearchForm; 