import { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const validateInputs = () => {
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
    return true;
  };

  const fetchWeatherData = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);
    try {
      // For demo purposes, using mock data
      const mockData = {
        daily: {
          time: Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return format(date, 'yyyy-MM-dd');
          }),
          temperature_2m_max: Array.from({ length: 30 }, () => Math.random() * 20 + 10),
          temperature_2m_min: Array.from({ length: 30 }, () => Math.random() * 10),
          apparent_temperature_max: Array.from({ length: 30 }, () => Math.random() * 20 + 12),
          apparent_temperature_min: Array.from({ length: 30 }, () => Math.random() * 8)
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!mockData.daily || !mockData.daily.time) {
        throw new Error('Invalid data received from server');
      }

      setWeatherData(mockData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter weather data based on selected date range
  const filteredIndices = weatherData
    ? weatherData.daily.time
        .map((dateStr, index) => {
          const date = new Date(dateStr);
          if (date >= startDate && date <= endDate) {
            return index;
          }
          return null;
        })
        .filter((index) => index !== null)
    : [];

  const filteredTime = filteredIndices.map((i) =>
    format(new Date(weatherData.daily.time[i]), 'dd-MM-yyyy')
  );
  const filteredMaxTemp = filteredIndices.map((i) => weatherData.daily.temperature_2m_max[i]);
  const filteredMinTemp = filteredIndices.map((i) => weatherData.daily.temperature_2m_min[i]);

  const chartData = weatherData
    ? {
        labels: filteredTime,
        datasets: [
          {
            label: 'Max Temperature',
            data: filteredMaxTemp,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Min Temperature',
            data: filteredMinTemp,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Trends',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  const totalPages = weatherData ? Math.ceil(weatherData.daily.time.length / rowsPerPage) : 0;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Historical Weather Data</h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setError(null);
                setCity(e.target.value);
              }}
              className={`w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                error && !city.trim() ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter city name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setError(null);
                setStartDate(date);
              }}
              dateFormat="dd-MM-yyyy"
              className={`w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                error && !startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setError(null);
                setEndDate(date);
              }}
              minDate={startDate}
              dateFormat="dd-MM-yyyy"
              className={`w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                error && !endDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchWeatherData}
              disabled={loading}
              className="w-full btn btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Loading...
                </span>
              ) : (
                'Fetch Data'
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {weatherData && (
        <>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="h-[400px]">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Detailed Weather Data</h2>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-md text-sm p-2"
              >
                <option value={10}>10 rows</option>
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Max Temp (°C)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Min Temp (°C)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Apparent Max (°C)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Apparent Min (°C)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIndices.slice(startIndex, endIndex).map((i) => (
                    <tr key={weatherData.daily.time[i]} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(weatherData.daily.time[i]), 'dd-MM-yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {weatherData.daily.temperature_2m_max[i].toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {weatherData.daily.temperature_2m_min[i].toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {weatherData.daily.apparent_temperature_max[i].toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {weatherData.daily.apparent_temperature_min[i].toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, weatherData.daily.time.length)} of{' '}
                  {weatherData.daily.time.length} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherPage;