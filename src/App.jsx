import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Homepage/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyCode from './pages/Auth/VerifyCode'; 
import Chatbot from './pages/Homepage/Chatbot/Chatbot';
import ContactSupport from './pages/Auth/ContactSupport';
import Settings from './pages/Homepage/Settings';
import Transactions from './pages/Homepage/Transactions';
import Claims from './pages/Homepage/Claims';
import Notifications from './pages/Homepage/Notifications';
import Profile from './pages/Homepage/Profile';
import Policies from './pages/Homepage/Policies';
import VerifyIdentity from './pages/Homepage/VerifyIdentity';
import MicroInsurancePage from './pages/Homepage/MicroInsurancePage';
import Dashboard from './pages/Homepage/Dashboard';
import PaymentPage from './pages/Homepage/PaymentPage';
import Logout from './pages/Auth/Logout';
import ResetPassword from './pages/Auth/ResetPassword';
import './App.css';
import './index.css'; 
function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50 font-poppins">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/verify-identity" element={<VerifyIdentity />} />
          <Route path="/micro-insurance-page" element={<MicroInsurancePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment-page" element={<PaymentPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;