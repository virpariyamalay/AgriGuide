import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
    <span className="ml-2">Loading...</span>
  </div>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: fill form, 2: verify OTP
  const [loading, setLoading] = useState(false);
  const { signup, requestOtp } = useAuth();
  const navigate = useNavigate();

  console.log('Signup component rendered, step:', step, 'loading:', loading);

  // Monitor step changes
  useEffect(() => {
    console.log('Step changed to:', step);
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendOtp = async () => {
    console.log('handleSendOtp called');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate all required fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      console.log('Sending OTP request for:', formData.email);

      const response = await requestOtp(formData.email);
      console.log('OTP response:', response);

      toast.success('OTP sent to your email!');
      // For testing: if OTP is returned in response, show it in console
      if (response.otp) {
        console.log('OTP for testing:', response.otp);
        toast.info(`OTP: ${response.otp} (check console for testing)`);
      }
      console.log('Setting step to 2 for OTP verification');
      setStep(2);
    } catch (error) {
      console.error('Error in handleSendOtp:', error);
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      console.log('Resending OTP for:', formData.email);

      const response = await requestOtp(formData.email);
      console.log('Resend OTP response:', response);

      toast.success('OTP resent to your email!');
      if (response.otp) {
        console.log('New OTP for testing:', response.otp);
        toast.info(`New OTP: ${response.otp} (check console for testing)`);
      }
    } catch (error) {
      console.error('Error in handleResendOtp:', error);
      toast.error(error.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp,
      });
      navigate('/');
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Sending OTP...</p>
            </div>
          </div>
        )}

        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.png"
            alt="AgriGuide"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Debug info - remove this later */}
        <div className="text-center text-xs text-gray-500">
          Current step: {step} | OTP: {otp}
        </div>

        {/* Temporary test button - remove this later */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              console.log('Manual step change to:', step === 1 ? 2 : 1);
              setStep(step === 1 ? 2 : 1);
            }}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Test: Change to Step {step === 1 ? 2 : 1}
          </button>
        </div>

        {step === 1 ? (
          // Step 1: Fill registration form
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner /> : 'Send OTP'}
            </button>
          </div>
        ) : (
          // Step 2: OTP verification
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Verify Your Email</h3>
              <p className="text-sm text-gray-600 mt-1">
                We've sent a verification code to {formData.email}
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                disabled={loading}
                placeholder="Enter 6-digit OTP"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg tracking-widest disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Verify & Sign Up'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
              >
                Didn't receive code? Resend
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
