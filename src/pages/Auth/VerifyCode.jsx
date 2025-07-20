import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from '../../Group 47603.png'; // Going up 2 levels from pages/Auth/ to src/
import codeHandImage from '../../CodeHand.png'; // The image from figma

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [codeFocused, setCodeFocused] = useState(false);
  const inputRefs = useRef([]);

  // Get email and source from navigation state
  const email = location.state?.email || '';
  const source = location.state?.source || 'signup';

  // Dynamic content based on source
  const getContent = () => {
    if (source === 'forgot-password') {
      return {
        title: 'Verify code',
        description: 'An authentication code has been sent to your email.',
        resendText: "Didn't receive a code?",
        backText: 'Back to login'
      };
    } else {
      return {
        title: 'Verify code',
        description: 'An authentication code has been sent to your email.',
        resendText: "Didn't receive a code?",
        backText: 'Back to login'
      };
    }
  };

  const content = getContent();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Verification code:', verificationCode);
    
    // Handle verification logic here
    if (source === 'forgot-password') {
      // Redirect to reset password page or login
      navigate('/login');
    } else {
      // Redirect to dashboard or login after successful verification
      navigate('/login');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendCode = () => {
    console.log('Resending code to:', email);
    // Handle resend logic here
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Left Section - Verify Code Form */}
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

          {/* Back to login */}
          <div className="mb-4">
            <button 
              onClick={handleBackToLogin}
              className="flex items-center text-gray-600 hover:text-[#FF7043] transition-colors text-sm cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {content.backText}
            </button>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
            <p className="text-gray-600 text-sm">
              {content.description}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input Field with Floating Label */}
            <div className="relative">
              <div 
                className={`flex space-x-2 p-4 border-2 rounded-lg transition-all duration-200 ${
                  codeFocused ? 'border-[#FF7043]' : 'border-gray-200'
                }`}
              >
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => setCodeFocused(true)}
                    onBlur={() => {
                      // Only remove focus if no input is focused
                      setTimeout(() => {
                        if (!inputRefs.current.some(ref => ref === document.activeElement)) {
                          setCodeFocused(false);
                        }
                      }, 0);
                    }}
                    className="w-8 h-8 text-center text-lg font-semibold border-none outline-none bg-transparent"
                    maxLength={1}
                  />
                ))}
              </div>
              <label
                className={`absolute left-3 px-1 bg-white transition-all duration-200 pointer-events-none 
                  ${codeFocused || code.some(digit => digit) 
                    ? 'top-0 -translate-y-1/2 text-xs text-[#FF7043]' 
                    : 'top-1/2 -translate-y-1/2 text-gray-400'
                  }`}
              >
                Enter Code
              </label>
            </div>

            {/* Resend Code Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {content.resendText}{' '}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#FF7043] hover:text-[#E55A35] font-medium cursor-pointer"
                >
                  Resend
                </button>
              </p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full bg-[#FF7043] text-white py-2.5 px-4 rounded-lg hover:bg-[#E55A35] transition-colors font-medium cursor-pointer"
            >
              Verify
            </button>
          </form>

          {/* Login with Social Media Divider */}
          <div className="mt-6 mb-4">
            <p className="text-center text-sm text-gray-500">Or login with</p>
          </div>

          {/* Social Login Buttons with Orange Focus Border */}
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

      {/* Right Section - Illustration */}
      <div className="flex-1 bg-gray-100 hidden lg:flex items-center justify-center">
        <div className="w-80 h-80 bg-white rounded-2xl p-8 flex items-center justify-center shadow-lg">
          {/* Code Hand Illustration */}
          <div className="text-center">
            <img 
              src={codeHandImage}
              alt="Security verification illustration" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;