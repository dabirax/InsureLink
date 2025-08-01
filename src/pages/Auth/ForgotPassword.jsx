import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../InsureLink.jpg'; // Assuming the logo path is correct
import forgotImage from '../../Forgot.png'; // The image from figma

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    setIsSubmitting(true);

    try {
      // Backend endpoint for requesting forgot password OTP: POST /auth/forgot-password-otp/
      const response = await fetch('https://Insurelink.onrender.com/auth/forgot-password-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        // Assuming the backend sends a success response for OTP sent
        setSuccessMessage('A password reset code has been sent to your email. Redirecting to verification...');
        setTimeout(() => {
          navigate('/verify-code', {
            state: {
              email: email,
              source: 'forgot-password' // Indicate the source for the VerifyCode page
            }
          });
        }, 1500);
      } else {
        const errorData = await response.json();
        console.error('Forgot password error:', errorData);
        setErrorMessage(errorData.detail || `Failed to send reset code: ${response.status}. Please try again.`);
      }
    } catch (error) {
      console.error('Network or unexpected error during forgot password request:', error);
      if (error instanceof TypeError) {
        setErrorMessage('Network error: Could not connect to the server. Please ensure the backend is running and accessible.');
      } else if (error instanceof SyntaxError) {
        setErrorMessage('Server returned an invalid response. Please check backend logs.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Left Section - Forgot Password Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 lg:px-12 py-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <a href="#" className="inline-block cursor-pointer">
              <img
                src={logoImage}
                alt="InsureLink"
                className="h-8 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
          {/* Back to login */}
          <div className="mb-4">
            <button
              onClick={handleBackToLogin}
              className="flex items-center text-gray-600 hover:text-[#FF7043] transition-colors text-sm cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to login
            </button>
          </div>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot your password?</h1>
            <p className="text-gray-600 text-sm">
              Don't worry, it happens to all of us. Enter your email below to recover your password
            </p>
          </div>

          {/* Success/Error Message Display */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field with Floating Label and Orange Focus */}
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  emailFocused ? 'border-[#FF7043]' : 'border-gray-200 focus:border-[#FF7043]'
                } focus-orange`}
                placeholder="akpansam1986@gmail.com"
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                  ${emailFocused || email
                    ? 'top-0 -translate-y-1/2 text-xs text-gray-500'
                    : 'top-1/2 -translate-y-1/2 text-gray-400'
                  }`}
              >
                Email
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-[#FF7043] text-white hover:bg-[#E55A35]'
              }`}
            >
              {isSubmitting ? 'Sending code...' : 'Submit'}
            </button>
          </form>
          {/* Login with Social Media Divider */}
          <div className="mt-6 mb-4">
            <p className="text-center text-sm text-gray-500">Or login with</p>
          </div>
          {/* Social Login Buttons with Orange Focus Border */}
          <div className="flex gap-3">
            {/* Facebook Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer">
              <svg className="w-6 h-6 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            {/* Google Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M20.64 12.25c0-.61-.05-1.22-.16-1.81H12v3.62h4.74c-.2 1.15-.84 2.16-1.79 2.83v2.34h3.01c1.76-1.62 2.77-4.01 2.77-6.98z"/>
                <path fill="#34A853" d="M12 23c3.27 0 6.01-1.08 8.01-2.91l-3.01-2.34c-1.04.7-2.38 1.12-3.99 1.12-3.09 0-5.7-2.07-6.64-4.85H2.36v2.44C4.36 20.5 7.93 23 12 23z"/>
                <path fill="#FBBC05" d="M5.36 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.36C1.6 8.55 1.19 10.22 1.19 12s.41 3.45 1.17 4.93l3.01-2.34z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.32.61 4.55 1.79l2.68-2.68C18.01 2.09 15.27 1 12 1 7.93 1 4.36 3.5 2.36 7.07l3.01 2.34C6.3 6.82 8.91 4.75 12 4.75z"/>
              </svg>
            </button>
            {/* Apple Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.82 14.5C17.06 15.68 16.3 16.89 15.01 16.92C13.72 16.95 13.31 16.03 12.02 16.03C10.73 16.03 10.32 16.89 9.03 16.94C7.74 16.99 6.75 15.62 5.99 14.41C4.23 11.23 2.92 6.68 4.68 3.62C5.55 2.1 7.11 1.14 8.8 1.11C10.08 1.09 11.3 1.98 12.09 1.98C12.87 1.98 14.35 0.91 15.9 1.07C16.55 1.1 18.37 1.33 19.54 3.05C19.45 3.11 17.37 4.33 17.35 6.86C17.32 9.88 19.94 10.89 19.97 10.9L19.97 10.9C19.94 10.97 19.55 12.34 18.59 13.73L17.82 14.5ZM13.0001 3.5C13.7301 2.67 14.9401 2.04 15.9401 2.0C16.0701 3.17 15.6001 4.35 14.9001 5.19C14.2101 6.04 13.0701 6.7 11.9501 6.61C11.8001 5.46 12.3601 4.26 13.0001 3.5Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Right Section - Forgot Password Illustration */}
      <div className="flex-1 bg-[#F5F5F5] hidden lg:flex items-center justify-center p-8">
        <div className="max-w-lg w-full flex items-center justify-center">
          <img
            src={forgotImage}
            alt="Forgot Password Illustration"
            className="w-full h-auto max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;