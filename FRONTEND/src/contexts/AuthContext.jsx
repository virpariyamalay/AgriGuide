import { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });
  const [loading, setLoading] = useState(false);

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          otp: userData.otp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create an account.');
      }

      const data = await response.json();
      // Set user data and token after successful signup
      if (data.token) {
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
      await fetchUserProfile(); // Fetch full profile after signup
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password');
      }

      const data = await response.json();
      // Ensure token is included in user state and localStorage
      if (!data.token) {
        throw new Error('Login response missing token');
      }
      // Merge token with existing user data if any
      const userData = { ...data, token: data.token };
      setUser(userData);
      localStorage.setItem('userInfo', JSON.stringify(userData));
      await fetchUserProfile(); // Fetch full profile after login
      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const isAdmin = () => {
    return user?.isAdmin;
  };

  const fetchUserProfile = async () => {
    if (!user?.token) return null;
    try {
      const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateProfile = async (updatedData) => {
    if (!user?.token) return null;
    try {
      const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      const data = await response.json();
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  };

  // OTP login methods
  const requestOtp = async (email) => {
    console.log('AuthContext: requestOtp called with email:', email);
    setLoading(true);
    try {
      console.log('AuthContext: Making request to:', API_ENDPOINTS.AUTH.REQUEST_OTP);
      const response = await fetch(API_ENDPOINTS.AUTH.REQUEST_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      console.log('AuthContext: Response status:', response.status);
      const data = await response.json();
      console.log('AuthContext: Response data:', data);
      setLoading(false);
      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');
      return data;
    } catch (error) {
      console.error('AuthContext: Error in requestOtp:', error);
      setLoading(false);
      throw error;
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      setLoading(false);
      if (!response.ok) throw new Error(data.message || 'Invalid OTP');
      if (!data.token) throw new Error('Login response missing token');
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      await fetchUserProfile();
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAdmin,
    updateProfile,
    fetchUserProfile,
    requestOtp,
    verifyOtp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
