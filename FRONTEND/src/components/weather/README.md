# Weather Components

This directory contains modular components for the Weather page, providing a modern and maintainable structure.

## Components

### WeatherHero
- **Purpose**: Hero section with animated background and weather statistics
- **Features**: 
  - Animated background elements
  - Gradient text effects
  - Weather feature cards
  - Responsive design

### WeatherSearchForm
- **Purpose**: Search form for city selection and date range
- **Features**:
  - City autocomplete with API integration
  - Date picker components
  - Form validation
  - Error handling
  - Modern UI with animations

### WeatherChart
- **Purpose**: Temperature trend visualization
- **Features**:
  - Interactive line chart
  - Custom styling and colors
  - Temperature statistics
  - Responsive chart container

### WeatherDataTable
- **Purpose**: Detailed weather data display
- **Features**:
  - Paginated data table
  - Temperature color coding
  - Sortable columns
  - Modern table design

### WeatherAlert
- **Purpose**: Global weather alert notifications
- **Features**:
  - Dynamic alert styling based on weather type
  - Expandable content
  - Dismissible alerts
  - Animated transitions
  - Context-aware icons and colors

## Usage

```jsx
import {
  WeatherHero,
  WeatherSearchForm,
  WeatherChart,
  WeatherDataTable,
  WeatherAlert
} from '../components/weather';

// In your WeatherPage component
<WeatherHero />
<WeatherSearchForm onFetchData={handleFetchData} />
{weatherData && (
  <>
    <WeatherChart weatherData={weatherData} startDate={startDate} endDate={endDate} />
    <WeatherDataTable weatherData={weatherData} startDate={startDate} endDate={endDate} />
  </>
)}

// For global weather alerts (in App.jsx)
{weatherData?.alerts && weatherData.alerts.length > 0 && (
  <WeatherAlert alert={weatherData.alerts[0]} />
)}
```

## Benefits

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or modified
3. **Maintainability**: Easier to debug and update individual components
4. **Performance**: Components can be optimized independently
5. **Testing**: Each component can be tested in isolation

## Dependencies

- `framer-motion`: For animations
- `react-datepicker`: For date selection
- `react-chartjs-2`: For chart visualization
- `date-fns`: For date formatting
- `tailwindcss`: For styling

## Styling

All components use Tailwind CSS classes and follow a consistent design system:
- Rounded corners (xl, 2xl, 3xl)
- Gradient backgrounds
- Shadow effects
- Hover animations
- Responsive design
- Color-coded temperature values
- Dynamic alert styling based on weather conditions 

# Weather Alerts System

This directory contains the weather-related components for the AgriGuide application, including real-time weather alerts and farming recommendations.

## Components

### WeatherAlertEnhanced.jsx
- **Purpose**: Displays real-time weather alerts based on user's location
- **Features**:
  - Fetches current weather and forecast data
  - Generates farming-specific alerts based on weather conditions
  - Shows severity levels (high, medium, low)
  - Provides actionable recommendations for farmers
  - Expandable alert details with farming tips

### WeatherAlertContext.jsx
- **Purpose**: Manages weather alert state and data fetching
- **Features**:
  - Automatic location detection using browser geolocation
  - Real-time weather data fetching from OpenWeatherMap API
  - Intelligent alert generation based on farming conditions
  - Automatic refresh every 30 minutes
  - Error handling and fallback data

## Weather Alert Types

The system generates the following types of alerts:

### Temperature Alerts
- **High Temperature** (>35°C): Irrigation and shade recommendations
- **Low Temperature** (<10°C): Frost protection and greenhouse advice
- **Frost Warning** (0-2°C): Critical frost protection measures

### Humidity Alerts
- **High Humidity** (>80%): Fungal disease prevention
- **Low Humidity** (<30%): Irrigation frequency increase

### Wind Alerts
- **High Wind** (>20 km/h): Windbreak installation and plant protection

### Rain Alerts
- **Rain Expected**: Irrigation adjustment and drainage management

### Drought Alerts
- **Low humidity + No rain forecast**: Drought management strategies

### Optimal Conditions
- **Perfect planting weather**: Recommendations for crop planting

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the `project/FRONTEND/` directory:

```env
# OpenWeatherMap API Key
VITE_OWM_API_KEY=your_openweathermap_api_key_here

# Backend API Base URL
VITE_API_BASE_URL=http://localhost:5000
```

### 2. Get OpenWeatherMap API Key
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Go to your dashboard
3. Generate a free API key
4. Add it to your `.env` file

### 3. Location Permissions
The weather alerts require location access:
- Users must allow location access in their browser
- The system will show helpful error messages if location is denied
- Fallback data is provided when location is unavailable

## Usage

### In App.jsx
The WeatherAlertProvider wraps the entire application:

```jsx
import { WeatherAlertProvider } from './contexts/WeatherAlertContext';

function App() {
  return (
    <WeatherAlertProvider>
      {/* Your app components */}
    </WeatherAlertProvider>
  );
}
```

### In Components
Use the weather alerts context in any component:

```jsx
import { useWeatherAlerts } from '../../contexts/WeatherAlertContext';

function MyComponent() {
  const { alerts, currentLocation, loading, refreshAlerts } = useWeatherAlerts();
  
  // Use the weather data
}
```

### Displaying Alerts
The WeatherAlertEnhanced component automatically displays alerts:

```jsx
import WeatherAlertEnhanced from './components/weather/WeatherAlertEnhanced';

// In your component
<WeatherAlertEnhanced />
```

## API Endpoints Used

The system uses the following OpenWeatherMap API endpoints:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`
- **Reverse Geocoding**: `https://api.openweathermap.org/geo/1.0/reverse`

## Error Handling

The system includes comprehensive error handling:

- **API Key Missing**: Shows configuration error
- **Location Denied**: Shows permission request message
- **Network Errors**: Shows connection error with retry option
- **API Rate Limits**: Handles rate limiting gracefully
- **Invalid Data**: Provides fallback data

## Customization

### Adding New Alert Types
To add new alert types, modify the `generateFarmingAlerts` function in `WeatherAlertContext.jsx`:

```jsx
// Add new alert condition
if (newCondition) {
  newAlerts.push({
    id: 'new-alert',
    type: 'warning',
    title: 'New Alert Title',
    message: 'Alert message',
    icon: '🌱',
    severity: 'medium',
    recommendations: ['Action 1', 'Action 2']
  });
}
```

### Styling Alerts
Modify the `getAlertStyles` function in `WeatherAlertEnhanced.jsx` to customize alert appearance.

## Performance Considerations

- Weather data is cached and refreshed every 30 minutes
- Location is only requested once per session
- API calls are optimized to minimize requests
- Fallback data prevents loading delays

## Troubleshooting

### Common Issues

1. **"Location Unavailable"**
   - Check browser location permissions
   - Ensure HTTPS is used (required for geolocation)

2. **"Unable to fetch weather data"**
   - Verify OpenWeatherMap API key is correct
   - Check internet connection
   - Ensure API key has proper permissions

3. **Alerts not showing**
   - Check if WeatherAlertProvider is wrapping the app
   - Verify environment variables are loaded
   - Check browser console for errors

### Debug Mode
The system includes console logging for debugging:
- API URLs and responses
- Location coordinates
- Error messages
- Data processing steps

## Future Enhancements

- Push notifications for critical weather alerts
- Weather history and trends
- Crop-specific weather recommendations
- Integration with local weather stations
- Multi-language support for alerts 