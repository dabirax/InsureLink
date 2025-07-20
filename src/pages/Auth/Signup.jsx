import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../../Group 47603.png'; // Going up 2 levels from pages/Auth/ to src/

const Signup = () => {
  const navigate = useNavigate(); // Add this hook
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  
  // Add focus states for each input
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      alert('Please agree to the Terms and Privacy Policies');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Handle signup logic here - replace with your actual API call
      console.log('Signup submitted:', { 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        password, 
        confirmPassword, 
        agreeTerms 
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to verify code page after successful signup
      // You can also pass user data if needed
      navigate('/verify-code', { 
        state: { 
          email: email,
          phoneNumber: phoneNumber,
          firstName: firstName 
        } 
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Left Section - Orange Background */}
      <div className="flex-1 bg-[#FF7043] hidden lg:block">
        <div className="w-full h-full min-h-screen"></div>
      </div>

      {/* Right Section - Signup Form */}
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

          {/* Signup Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Sign up</h1>
            <p className="text-gray-600 text-sm">Let's get you all set up so you can access your personal account</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name Field */}
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFirstNameFocused(true)}
                  onBlur={() => setFirstNameFocused(false)}
                  className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                    firstNameFocused ? 'border-[#FF7043]' : 'border-gray-200 focus:border-[#FF7043]'
                  }`}
                  placeholder="Samuel"
                  required
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none 
                    ${firstNameFocused || firstName 
                      ? 'top-0 -translate-y-1/2 text-xs text-gray-500' 
                      : 'top-1/2 -translate-y-1/2 text-gray-400'
                    }`}
                >
                  First Name
                </label>
              </div>

              {/* Last Name Field */}
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setLastNameFocused(true)}
                  onBlur={() => setLastNameFocused(false)}
                  className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                    lastNameFocused ? 'border-[#FF7043]' : 'border-gray-200 focus:border-[#FF7043]'
                  }`}
                  placeholder="Akpan"
                  required
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none 
                    ${lastNameFocused || lastName 
                      ? 'top-0 -translate-y-1/2 text-xs text-gray-500' 
                      : 'top-1/2 -translate-y-1/2 text-gray-400'
                    }`}
                >
                  Last Name
                </label>
              </div>
            </div>

            {/* Email Field */}
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
                }`}
                placeholder="akpansamuel@gmail.com"
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

            {/* Phone Number Field */}
            <div className="relative">
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setPhoneNumberFocused(true)}
                onBlur={() => setPhoneNumberFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  phoneNumberFocused ? 'border-[#FF7043]' : 'border-gray-200 focus:border-[#FF7043]'
                }`}
                placeholder="+234 810 234 5678"
                required
              />
              <label
                htmlFor="phoneNumber"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none 
                  ${phoneNumberFocused || phoneNumber 
                    ? 'top-0 -translate-y-1/2 text-xs text-gray-500' 
                    : 'top-1/2 -translate-y-1/2 text-gray-400'
                  }`}
              >
                Phone Number
              </label>
            </div>

            {/* Password Field */}
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
                }`}
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

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 pr-12 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  confirmPasswordFocused ? 'border-[#FF7043]' : 'border-gray-200 focus:border-[#FF7043]'
                }`}
                placeholder="••••••••••••"
                minLength="6"
                required
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none 
                  ${confirmPasswordFocused || confirmPassword 
                    ? 'top-0 -translate-y-1/2 text-xs text-gray-500' 
                    : 'top-1/2 -translate-y-1/2 text-gray-400'
                  }`}
              >
                Confirm Password
              </label>

              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Terms and Privacy Policy */}
            <div className="flex items-start py-1">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 mt-0.5 text-[#FF7043] focus:ring-[#FF7043] border-gray-300 rounded cursor-pointer flex-shrink-0"
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                I agree to all the{' '}
                <a href="#" className="text-[#FF7043] hover:text-[#E55A35] transition-colors">
                  Terms
                </a>
                {' '}and{' '}
                <a href="#" className="text-[#FF7043] hover:text-[#E55A35] transition-colors">
                  Privacy Policies
                </a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 px-4 rounded-lg font-medium cursor-pointer transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-[#FF7043] text-white hover:bg-[#E55A35]'
              }`}
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-[#FF7043] hover:text-[#E55A35] font-medium transition-colors cursor-pointer">
              Sign in
            </a>
          </p>

          {/* Social Login Divider */}
          <div className="mt-4 mb-3">
            <p className="text-center text-sm text-gray-500">Or sign up with</p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3">
            {/* Facebook Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* Google Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            {/* Apple Button */}
            <button className="flex-1 flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;