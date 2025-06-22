import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeatherAlerts } from '../../contexts/WeatherAlertContext';

const WeatherAlertEnhanced = () => {
    const { alerts, currentLocation, currentCoords, loading, dismissAlert } = useWeatherAlerts();
    const [expandedAlert, setExpandedAlert] = useState(null);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-xl"
            >
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                    <p className="text-blue-700">Loading weather alerts...</p>
                </div>
            </motion.div>
        );
    }

    if (!alerts || alerts.length === 0) {
        return null;
    }

    const getAlertStyles = (type, severity) => {
        const baseStyles = 'border-l-4 p-4 mb-4 rounded-r-xl';

        switch (type) {
            case 'warning':
                return `${baseStyles} bg-red-50 border-red-400`;
            case 'info':
                return `${baseStyles} bg-blue-50 border-blue-400`;
            case 'success':
                return `${baseStyles} bg-green-50 border-green-400`;
            default:
                return `${baseStyles} bg-yellow-50 border-yellow-400`;
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return 'ℹ️';
        }
    };

    return (
        <div className="space-y-4">
            {alerts.map((alert, index) => (
                <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={getAlertStyles(alert.type, alert.severity)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
                            <div className="flex-shrink-0 mr-3">
                                <div className="text-2xl">{alert.icon}</div>
                                <div className="text-sm mt-1">{getSeverityIcon(alert.severity)}</div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center mb-2 flex-wrap gap-2">
                                    <h3 className="text-lg font-semibold text-gray-900 mr-2">
                                        {alert.title}
                                    </h3>
                                    {currentLocation && (
                                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {currentLocation}
                                        </span>
                                    )}
                                    {currentCoords && (
                                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                            [{currentCoords.lat?.toFixed(3)}, {currentCoords.lon?.toFixed(3)}]
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-700 mb-3 leading-relaxed">
                                    {alert.message}
                                </p>

                                <AnimatePresence>
                                    {expandedAlert === alert.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4"
                                        >
                                            <div className="bg-white/50 rounded-lg p-4">
                                                <h4 className="font-semibold text-gray-900 mb-2">Recommendations:</h4>
                                                <ul className="space-y-2">
                                                    {alert.recommendations.map((rec, recIndex) => (
                                                        <li key={recIndex} className="flex items-start">
                                                            <span className="text-green-500 mr-2 mt-1">✓</span>
                                                            <span className="text-gray-700">{rec}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="mt-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                    >
                                        {expandedAlert === alert.id ? 'Show less' : 'Show recommendations'}
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                onClick={() => dismissAlert(alert.id)}
                                aria-label="Dismiss alert"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default WeatherAlertEnhanced; 