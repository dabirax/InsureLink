import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Home, RefreshCw, CheckCircle } from 'lucide-react';
import InsureLinkLogo from "../../assets/InsureLink.jpg";

const Logout = () => {
  const [logoutStatus, setLogoutStatus] = useState('loggingOut'); // 'loggingOut', 'success'

  // State for image loading error for InsureLinkLogo
  const [insureLinkLogoError, setInsureLinkLogoError] = useState(false);

  // Define a named function for image error handling
  const handleInsureLinkLogoError = () => {
    setInsureLinkLogoError(true);
  };

  useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      setLogoutStatus('success');
      // In a real application, you would clear user session here (e.g., localStorage.clear(), API call to logout)
    }, 2000); // Simulate a 2-second logout process

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-200">
        <div className="relative mb-10">
          <div className="w-32 h-32 mx-auto flex items-center justify-center">
            <img
              src={InsureLinkLogo}
              alt="InsureLink"
              className="w-full h-full object-contain"
              onError={handleInsureLinkLogoError} // Use the named function
            />
            {insureLinkLogoError && ( // Conditionally render fallback
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center absolute inset-0">
                <span className="text-[#FF7043] font-bold text-xl">IL</span>
              </div>
            )}
          </div>
        </div>

        {logoutStatus === 'loggingOut' ? (
          <>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Logging Out...</h2>
            <p className="text-slate-600 mb-8 text-xl">
              Securing your session and signing you out safely.
            </p>
            <div className="flex items-center justify-center text-orange-500 animate-spin mb-10">
              <RefreshCw className="w-12 h-12" />
            </div>
            <p className="text-slate-500 text-lg">
              Please wait a moment. You will be redirected shortly.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">You have been logged out!</h2>
            <p className="text-slate-600 mb-8 text-xl">
              Your session has been securely terminated.
            </p>
            <div className="flex items-center justify-center text-green-600 mb-10">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF7043] to-orange-500 text-white rounded-2xl font-bold text-xl hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Home className="w-6 h-6 mr-3" />
                Go to Homepage
              </Link>
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all duration-300 cursor-pointer"
              >
                <LogOut className="w-6 h-6 mr-3" />
                Login Again
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Logout;