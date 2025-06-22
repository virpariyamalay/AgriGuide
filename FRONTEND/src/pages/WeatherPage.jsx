import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  WeatherHero,
  WeatherSearchForm,
  WeatherChart,
  WeatherDataTable
} from '../components/weather';

const WeatherPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchParams, setSearchParams] = useState({
    city: '',
    startDate: new Date(),
    endDate: new Date()
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchWeatherData = async ({ city, startDate, endDate }) => {
    setLoading(true);
    setError(null);
    setSearchParams({ city, startDate, endDate });

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Weather Data</h2>
          <p className="text-gray-600">Please wait while we fetch the latest weather information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
      <WeatherHero />

      <WeatherSearchForm
        onFetchData={fetchWeatherData}
        loading={loading}
        error={error}
        setError={setError}
      />

      {weatherData && (
        <>
          <WeatherChart
            weatherData={weatherData}
            startDate={searchParams.startDate}
            endDate={searchParams.endDate}
          />

          <WeatherDataTable
            weatherData={weatherData}
            startDate={searchParams.startDate}
            endDate={searchParams.endDate}
          />
        </>
      )}
    </div>
  );
};

export default WeatherPage;