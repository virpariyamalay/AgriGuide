// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// OpenWeatherMap API Key
export const OWM_API_KEY = import.meta.env.VITE_OWM_API_KEY;

// API endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        REGISTER: `${API_BASE_URL}/api/auth/register`,
        LOGIN: `${API_BASE_URL}/api/auth/login`,
    },

    // User endpoints
    USER: {
        PROFILE: `${API_BASE_URL}/api/users/profile`,
    },

    // Product endpoints
    PRODUCTS: {
        LIST: '/api/products',
        ADD: '/api/products/add',
        DELETE: (id) => `/api/products/${id}`,
    },

    // Cart endpoints
    CART: {
        GET: '/api/cart',
        ADD: '/api/cart/add',
        REMOVE: '/api/cart/remove',
        CLEAR: '/api/cart/clear',
    },

    // Crop endpoints
    CROPS: {
        LIST: '/api/crops',
        DETAIL: (id) => `/api/crops/${id}`,
    },

    // Market endpoints
    MARKET: {
        RATES: `${API_BASE_URL}/api/crop-market`,
    },

    // Weather endpoints
    WEATHER: {
        GEOCODING: `https://api.openweathermap.org/geo/1.0/direct`,
        GEOCODING_REVERSE: `https://api.openweathermap.org/geo/1.0/reverse`,
        CURRENT: `https://api.openweathermap.org/data/2.5/weather`,
        FORECAST: `https://api.openweathermap.org/data/2.5/forecast`,
        ONECALL: `https://api.openweathermap.org/data/3.0/onecall`,
    },
};

// Helper function to get API URL
export const getApiUrl = (endpoint) => {
    if (endpoint.startsWith('http')) {
        return endpoint;
    }
    return `${API_BASE_URL}${endpoint}`;
}; 