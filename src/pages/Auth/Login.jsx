import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../../InsureLink.jpg'; // Assuming the logo path is correct

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Dynamic greeting logic for the login page header
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Backend endpoint for login: POST /auth/token
      const response = await fetch('https://Insurelink.onrender.com/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token } = data; // We only need the access token for our purpose

        // IMPORTANT: The key used to store the token must be consistent
        // with the key the chatbot component looks for.
        // I've updated the key to 'userToken' to match the previous example.
        if (rememberMe) {
          localStorage.setItem('userToken', access_token);
          console.log('Login successful! Token stored in localStorage.');
        } else {
          sessionStorage.setItem('userToken', access_token);
          console.log('Login successful! Token stored in sessionStorage.');
        }

        // Navigate to the dashboard
        navigate('/dashboard', { state: { userEmail: email } });
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        setErrorMessage(errorData.detail || `Login failed: ${response.status}. Please check your credentials.`);
      }
    } catch (error) {
      console.error('Network or unexpected error during login:', error);
      if (error instanceof TypeError) {
        setErrorMessage('Network error: Could not connect to the server.');
      } else if (error instanceof SyntaxError) {
        setErrorMessage('Server returned an invalid response.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };
  
  // Handlers for social login buttons to prevent page refresh
  const handleSocialLogin = (e) => {
    e.preventDefault();
    setErrorMessage('This functionality is not yet implemented. Please use the email and password fields.');
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Left Section - Orange Background */}
      <div className="flex-1 bg-[#FF7043] hidden lg:block">
        <div className="w-full h-full min-h-screen"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 lg:px-12 py-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <a href="/" className="inline-block cursor-pointer">
              <img
                src={logoImage}
                alt="InsureLink"
                className="h-8 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Login Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{greeting}!</h1>
            <p className="text-gray-600 text-sm">Login to access your InsureLink account</p>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
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

            {/* Password Field with Floating Label, Orange Focus and Show/Hide Toggle */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 pr-12 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  passwordFocused ? 'border-[#FF7043]' : 'border-gray-200 focus:border-[#FF7043]'
                } focus-orange`}
                placeholder="••••••••••••"
                minLength="6"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                  ${passwordFocused || password
                    ? 'top-0 -translate-y-1/2 text-xs text-gray-500'
                    : 'top-1/2 -translate-y-1/2 text-gray-400'
                  }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#FF7043] focus:ring-[#FF7043] border-gray-300 rounded checkbox-orange cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                  Remember this device
                </label>
              </div>
              <a href="#" onClick={handleForgotPassword} className="font-medium text-sm text-[#FF7043] hover:text-[#E55A35] transition-colors cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-[#FF7043] text-white hover:bg-[#E55A35]'
              }`}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#FF7043] hover:text-[#E55A35] font-medium transition-colors cursor-pointer">
              Sign up
            </a>
          </p>

          {/* Social Login Divider */}
          <div className="mt-4 mb-3">
            <p className="text-center text-sm text-gray-500">Or login with</p>
          </div>

          {/* Social Login Buttons - REPLICATED FROM SIGNUP PAGE */}
          <div className="flex gap-3">
            {/* Facebook Button */}
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              aria-label="Login with Facebook"
            >
              <svg className="w-6 h-6 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            {/* Google Button - CORRECTED SVG PATH */}
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              aria-label="Login with Google"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M20.64 12.25c0-.61-.05-1.22-.16-1.81H12v3.62h4.74c-.2 1.15-.84 2.16-1.79 2.83v2.34h3.01c1.76-1.62 2.77-4.01 2.77-6.98z"/>
                <path fill="#34A853" d="M12 23c3.27 0 6.01-1.08 8.01-2.91l-3.01-2.34c-1.04.7-2.38 1.12-3.99 1.12-3.09 0-5.7-2.07-6.64-4.85H2.36v2.44C4.36 20.5 7.93 23 12 23z"/>
                <path fill="#FBBC05" d="M5.36 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.36C1.6 8.55 1.19 10.22 1.19 12s.41 3.45 1.17 4.93l3.01-2.34z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.32.61 4.55 1.79l2.68-2.68C18.01 2.09 15.27 1 12 1 7.93 1 4.36 3.5 2.36 7.07l3.01 2.34C6.3 6.82 8.91 4.75 12 4.75z"/>
              </svg>
            </button>
            {/* Apple Button */}
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              aria-label="Login with Apple"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.82 14.5C17.06 15.68 16.3 16.89 15.01 16.92C13.72 16.95 13.31 16.03 12.02 16.03C10.73 16.03 10.32 16.89 9.03 16.94C7.74 16.99 6.75 15.62 5.99 14.41C4.23 11.23 2.92 6.68 4.68 3.62C5.55 2.1 7.11 1.14 8.8 1.11C10.08 1.09 11.3 1.98 12.09 1.98C12.87 1.98 14.35 0.91 15.9 1.07C16.55 1.1 18.37 1.33 19.54 3.05C19.45 3.11 17.37 4.33 17.35 6.86C17.32 9.88 19.94 10.89 19.97 10.9L19.97 10.9C19.94 10.97 19.55 12.34 18.59 13.73L17.82 14.5ZM13.0001 3.5C13.7301 2.67 14.9401 2.04 15.9401 2.0C16.0701 3.17 15.6001 4.35 14.9001 5.19C14.2101 6.04 13.0701 6.7 11.9501 6.61C11.8001 5.46 12.3601 4.26 13.0001 3.5Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;