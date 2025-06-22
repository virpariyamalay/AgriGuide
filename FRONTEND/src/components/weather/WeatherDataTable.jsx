import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const WeatherDataTable = ({ weatherData, startDate, endDate }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    if (!weatherData) return null;

    // Filter weather data based on selected date range
    const filteredIndices = weatherData.daily.time
        .map((dateStr, index) => {
            const date = new Date(dateStr);
            if (date >= startDate && date <= endDate) {
                return index;
            }
            return null;
        })
        .filter((index) => index !== null);

    const totalPages = Math.ceil(filteredIndices.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = filteredIndices.slice(startIndex, endIndex);

    const getTemperatureColor = (temp) => {
        if (temp >= 30) return 'text-red-600 font-semibold';
        if (temp >= 25) return 'text-orange-600 font-semibold';
        if (temp >= 20) return 'text-yellow-600 font-semibold';
        if (temp >= 15) return 'text-green-600 font-semibold';
        if (temp >= 10) return 'text-blue-600 font-semibold';
        return 'text-cyan-600 font-semibold';
    };

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    📋 Detailed Weather Data
                                </h2>
                                <p className="text-gray-300">
                                    Comprehensive temperature data for the selected period
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                >
                                    <option value={10} className="text-gray-900">10 rows</option>
                                    <option value={20} className="text-gray-900">20 rows</option>
                                    <option value={50} className="text-gray-900">50 rows</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        📅 Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        🔥 Max Temp (°C)
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        ❄️ Min Temp (°C)
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        🌡️ Apparent Max (°C)
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        🌡️ Apparent Min (°C)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {currentData.map((i, index) => (
                                    <motion.tr
                                        key={weatherData.daily.time[i]}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {format(new Date(weatherData.daily.time[i]), 'dd-MM-yyyy')}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {format(new Date(weatherData.daily.time[i]), 'EEEE')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm ${getTemperatureColor(weatherData.daily.temperature_2m_max[i])}`}>
                                                {weatherData.daily.temperature_2m_max[i].toFixed(1)}°C
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm ${getTemperatureColor(weatherData.daily.temperature_2m_min[i])}`}>
                                                {weatherData.daily.temperature_2m_min[i].toFixed(1)}°C
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm ${getTemperatureColor(weatherData.daily.apparent_temperature_max[i])}`}>
                                                {weatherData.daily.apparent_temperature_max[i].toFixed(1)}°C
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm ${getTemperatureColor(weatherData.daily.apparent_temperature_min[i])}`}>
                                                {weatherData.daily.apparent_temperature_min[i].toFixed(1)}°C
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="text-sm text-gray-700 mb-4 md:mb-0">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredIndices.length)} of{' '}
                                {filteredIndices.length} results
                            </div>
                            <div className="flex items-center space-x-2">
                                <motion.button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
                                >
                                    ← Previous
                                </motion.button>

                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const pageNum = i + 1;
                                        return (
                                            <motion.button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === pageNum
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                <motion.button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
                                >
                                    Next →
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WeatherDataTable; 