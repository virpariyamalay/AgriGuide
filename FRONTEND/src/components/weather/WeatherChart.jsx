import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WeatherChart = ({ weatherData, startDate, endDate }) => {
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

    const filteredTime = filteredIndices.map((i) => {
        const date = new Date(weatherData.daily.time[i]);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    });

    const filteredMaxTemp = filteredIndices.map((i) => weatherData.daily.temperature_2m_max[i]);
    const filteredMinTemp = filteredIndices.map((i) => weatherData.daily.temperature_2m_min[i]);

    const chartData = {
        labels: filteredTime,
        datasets: [
            {
                label: 'Max Temperature',
                data: filteredMaxTemp,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Min Temperature',
                data: filteredMinTemp,
                borderColor: 'rgb(6, 182, 212)',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgb(6, 182, 212)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 14,
                        weight: '600'
                    }
                }
            },
            title: {
                display: true,
                text: 'Temperature Trends',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#1f2937'
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#374151',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                titleFont: {
                    size: 14,
                    weight: '600'
                },
                bodyFont: {
                    size: 13
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    font: {
                        size: 14,
                        weight: '600'
                    },
                    color: '#374151'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: 14,
                        weight: '600'
                    },
                    color: '#374151'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 12
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    return (
        <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            📊 Temperature Analysis
                        </h2>
                        <p className="text-blue-100">
                            Visual representation of temperature trends over the selected period
                        </p>
                    </div>

                    <div className="p-8">
                        <div className="h-[500px]">
                            <Line options={chartOptions} data={chartData} />
                        </div>

                        {/* Chart Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {Math.max(...filteredMaxTemp).toFixed(1)}°C
                                </div>
                                <div className="text-sm text-gray-600">Highest Temperature</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-cyan-600">
                                    {Math.min(...filteredMinTemp).toFixed(1)}°C
                                </div>
                                <div className="text-sm text-gray-600">Lowest Temperature</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-700">
                                    {filteredTime.length}
                                </div>
                                <div className="text-sm text-gray-600">Data Points</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WeatherChart; 