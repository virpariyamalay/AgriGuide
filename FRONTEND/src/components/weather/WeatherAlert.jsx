import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherAlert = ({ alert }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || !alert) return null;

    const getAlertIcon = (event) => {
        const eventLower = event.toLowerCase();
        if (eventLower.includes('storm') || eventLower.includes('thunder')) return '⛈️';
        if (eventLower.includes('rain') || eventLower.includes('shower')) return '🌧️';
        if (eventLower.includes('snow') || eventLower.includes('blizzard')) return '❄️';
        if (eventLower.includes('wind') || eventLower.includes('gale')) return '💨';
        if (eventLower.includes('heat') || eventLower.includes('hot')) return '🔥';
        if (eventLower.includes('cold') || eventLower.includes('freeze')) return '🥶';
        if (eventLower.includes('fog') || eventLower.includes('mist')) return '🌫️';
        return '⚠️';
    };

    const getAlertColor = (event) => {
        const eventLower = event.toLowerCase();
        if (eventLower.includes('storm') || eventLower.includes('thunder') || eventLower.includes('severe')) {
            return 'from-red-500 to-orange-500';
        }
        if (eventLower.includes('rain') || eventLower.includes('shower')) {
            return 'from-blue-500 to-cyan-500';
        }
        if (eventLower.includes('snow') || eventLower.includes('blizzard')) {
            return 'from-blue-400 to-indigo-500';
        }
        if (eventLower.includes('wind') || eventLower.includes('gale')) {
            return 'from-gray-500 to-gray-600';
        }
        if (eventLower.includes('heat') || eventLower.includes('hot')) {
            return 'from-orange-500 to-red-500';
        }
        if (eventLower.includes('cold') || eventLower.includes('freeze')) {
            return 'from-blue-300 to-cyan-400';
        }
        return 'from-yellow-500 to-orange-500';
    };

    return (
        <motion.div
            className={`bg-gradient-to-r ${getAlertColor(alert.event)} rounded-2xl shadow-xl mx-4 mt-4 mb-6 overflow-hidden border border-white/20`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                        <div className="flex-shrink-0 mr-4">
                            <div className="text-3xl">
                                {getAlertIcon(alert.event)}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">
                                Weather Alert: {alert.event}
                            </h3>
                            <div className="text-white/90">
                                <p className={`leading-relaxed ${!isExpanded && alert.description.length > 120 ? 'line-clamp-2' : ''}`}>
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
                                            className="mt-3"
                                        >
                                            <p className="leading-relaxed">
                                                {alert.description.substring(120)}
                                            </p>
                                            {alert.recommendation && (
                                                <div className="mt-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                                    <span className="font-semibold text-white">💡 Recommendation: </span>
                                                    <span className="text-white/90">{alert.recommendation}</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="mt-4">
                                <motion.button
                                    type="button"
                                    className="text-white/90 hover:text-white font-semibold text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isExpanded ? 'Show less' : 'Show more'}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    <motion.button
                        type="button"
                        className="ml-4 inline-flex text-white/70 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
                        onClick={() => setIsVisible(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherAlert; 