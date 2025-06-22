# Environment Variables Setup Guide

This guide explains how to set up environment variables for your AgriGuide project.

## Backend Environment Variables

Create a `.env` file in the `project/BACKEND/` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/agriguide

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Environment
NODE_ENV=development
```

### How to get these values:

1. **MONGO_URI**: 
   - For local development: `mongodb://localhost:27017/agriguide`
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/agriguide`

2. **JWT_SECRET**: Generate a secure random string (at least 32 characters)

3. **Cloudinary Credentials**: 
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get your credentials from the dashboard

## Frontend Environment Variables

Create a `.env` file in the `project/FRONTEND/` directory with the following variables:

```env
# OpenWeatherMap API Key
VITE_OWM_API_KEY=your_openweathermap_api_key_here

# Backend API Base URL
VITE_API_BASE_URL=http://localhost:5000
```

### How to get these values:

1. **VITE_OWM_API_KEY**: 
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your API key from the dashboard

2. **VITE_API_BASE_URL**: 
   - For local development: `http://localhost:5000`
   - For production: Your deployed backend URL

## Important Notes

1. **Vite Environment Variables**: All frontend environment variables must start with `VITE_` to be accessible in the browser.

2. **Security**: Never commit your `.env` files to version control. They are already in `.gitignore`.

3. **Backend Usage**: The backend uses `process.env.VARIABLE_NAME` to access environment variables.

4. **Frontend Usage**: The frontend uses `import.meta.env.VITE_VARIABLE_NAME` to access environment variables.

## Code Changes Made

The following files have been updated to use environment variables:

### Frontend:
- `src/config/api.js` - Centralized API configuration
- `src/contexts/AuthContext.jsx` - Uses environment variables for API calls
- `src/pages/MarketRatesPage.jsx` - Uses environment variables for API calls
- `src/pages/WeatherPage.jsx` - Uses environment variables for OpenWeatherMap API
- `vite.config.js` - Uses environment variables for proxy configuration

### Backend:
- All backend files already use `process.env` for environment variables
- No changes needed as the backend was already properly configured

## Testing

After setting up your `.env` files:

1. Start the backend: `cd project/BACKEND && npm start`
2. Start the frontend: `cd project/FRONTEND && npm run dev`
3. Test the application to ensure all API calls work correctly

## Production Deployment

For production deployment, make sure to:

1. Set `NODE_ENV=production` in your backend `.env`
2. Use production URLs for `VITE_API_BASE_URL`
3. Use production MongoDB URI
4. Use production Cloudinary credentials 