import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../../Group 47603.png'; // Going up 2 levels from pages/Auth/ to src/

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Add focus states for each input
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { email, password, rememberMe });
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Left Section - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 lg:px-12 py-4">
        <div className="w-full max-w-md">
         {/* Logo */}
          <div className="mb-6">
            <a href="#" className="inline-block">
              <img 
                src={logoImage}
                alt="InsureLink" 
                className="h-8 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Login Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Login</h1>
            <p className="text-gray-600 text-sm">Login to access your InsureLink account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
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
                  emailFocused || email 
                    ? 'border-[#FF7043] focus:border-[#FF7043]' 
                    : 'border-gray-200 focus:border-[#FF7043]'
                }`}
                placeholder="akpansam1986@gmail.com"
              />
              <label
                htmlFor="email"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none 
                  ${emailFocused || email 
                    ? 'top-0 -translate-y-1/2 text-xs text-[#FF7043]' 
                    : 'top-1/2 -translate-y-1/2 text-gray-400'
                  }`}
              >
                Email
              </label>
            </div>

            {/* Password Field with Floating Label and Orange Focus */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 pr-12 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  passwordFocused || password 
                    ? 'border-[#FF7043] focus:border-[#FF7043]' 
                    : 'border-gray-200 focus:border-[#FF7043]'
                }`}
                placeholder="••••••••••••"
              />
              <label
                htmlFor="password"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none 
                  ${passwordFocused || password 
                    ? 'top-0 -translate-y-1/2 text-xs text-[#FF7043]' 
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
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#FF7043] focus:ring-[#FF7043] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>
              <span 
                onClick={handleForgotPassword} 
                className="text-sm text-[#FF7043] hover:text-[#E55A35] transition-colors cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#FF7043] text-white py-2.5 px-4 rounded-lg hover:bg-[#E55A35] transition-colors font-medium cursor-pointer"
            >
              Login
            </button>
          </div>

          {/* Sign Up Link - UPDATED WITH NAVIGATION */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/signup')} 
              className="text-[#FF7043] hover:text-[#E55A35] font-medium transition-colors cursor-pointer"
            >
              Sign up
            </span>
          </p>

          {/* Social Login Divider */}
          <div className="mt-4 mb-3">
            <p className="text-center text-sm text-gray-500">Or login with</p>
          </div>

          {/* Social Login Buttons with Orange Borders */}
          <div className="flex gap-3">
            {/* Facebook Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border-2 border-[#FF7043] border-opacity-30 rounded-lg hover:bg-gray-50 hover:border-[#FF7043] hover:border-opacity-50 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* Google Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border-2 border-[#FF7043] border-opacity-30 rounded-lg hover:bg-gray-50 hover:border-[#FF7043] hover:border-opacity-50 transition-all cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            {/* Apple Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border-2 border-[#FF7043] border-opacity-30 rounded-lg hover:bg-gray-50 hover:border-[#FF7043] hover:border-opacity-50 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Orange Background */}
      <div className="flex-1 bg-[#FF7043] hidden lg:block">
        <div className="w-full h-full min-h-screen"></div>
      </div>
    </div>
  );
};

export default Login;