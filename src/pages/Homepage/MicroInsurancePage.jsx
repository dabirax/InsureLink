// src/pages/MicroInsurance/MicroInsurancePage.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InsureLinkLogo from "../../assets/InsureLink.jpg";

import {
    Bell, User, ChevronDown, Settings as SettingsIcon, LogOut,
    Shield, Clock, Headset // Icons for "Why Choose Our Micro-Insurance?"
} from 'lucide-react'; // Importing necessary icons from Lucide

const currentUser = {
    name: "John Doe",
    profilePicture: null, // You can put a path to a profile picture here
};

const MicroInsurancePage = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('daily'); // State for Daily/Weekly tabs
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3); // Dummy unread count for navbar bell

    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, profileButtonRef]);

    const getNavLinkClass = (path) =>
        location.pathname === path
            ? 'text-[#FF7043] border-b-2 border-[#FF7043] pb-1'
            : 'text-gray-600 hover:text-[#FF7043] transition-colors';

    const getTabClass = (tabName) =>
        activeTab === tabName
            ? 'px-4 py-2 text-sm font-semibold text-[#FF7043] bg-white rounded-md shadow-sm'
            : 'px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors';

    return (
        <div className="min-h-screen bg-[#FDFBF9] font-poppins text-gray-800">
            {/* Navbar (reused from previous designs for consistency) */}
            <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <Link to="/" className="inline-block cursor-pointer">
                        <img
                            src={InsureLinkLogo} // Using InsureLink.jpg logo
                            alt="InsureLink Logo"
                            className="h-20 w-auto object-contain"
                        />
                    </Link>
                </div>
                <div className="flex items-center space-x-6">
                    {/* Updated Navbar links based on the image's "My Policies, Claims, Payments, Support" */}
                    <Link to="/policies" className={`${getNavLinkClass('/policies')} font-medium`}>My Policies</Link>
                    <Link to="/claims" className={`${getNavLinkClass('/claims')} font-medium`}>Claims</Link>
                    <Link to="/payments" className={`${getNavLinkClass('/payments')} font-medium`}>Payments</Link>
                    <Link to="/support" className={`${getNavLinkClass('/support')} font-medium`}>Support</Link>
                    <Link to="/notifications" className={`${getNavLinkClass('/notifications')} relative text-gray-600 hover:text-[#FF7043] transition-colors cursor-pointer`}>
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#FF7043] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </Link>
                    {/* Profile Dropdown Trigger */}
                    <div className="relative">
                        <button
                            type="button"
                            ref={profileButtonRef}
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="flex items-center space-x-2 cursor-pointer focus:outline-none"
                        >
                            {currentUser.profilePicture ? (
                                <img src={currentUser.profilePicture} alt="Profile" className="h-9 w-9 rounded-full object-cover border-2 border-[#FF7043]" />
                            ) : (
                                <div className="h-9 w-9 rounded-full bg-[#FF7043] flex items-center justify-center text-white text-base font-semibold">
                                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                            <ChevronDown size={18} className="text-gray-500" />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {showProfileDropdown && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fade-in-down"
                                style={{ transformOrigin: 'top right' }}
                            >
                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#FF7043] transition-colors cursor-pointer"
                                    onClick={() => setShowProfileDropdown(false)}
                                >
                                    <User size={18} className="mr-2" /> Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#FF7043] transition-colors cursor-pointer"
                                    onClick={() => setShowProfileDropdown(false)}
                                >
                                    <SettingsIcon size={18} className="mr-2" /> Settings
                                </Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <Link
                                    to="/logout"
                                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors cursor-pointer"
                                    onClick={() => {
                                        setShowProfileDropdown(false);
                                        alert('Logged out!'); // Dummy logout action
                                    }}
                                >
                                    <LogOut size={18} className="mr-2" /> Log Out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-12 lg:px-24">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Micro-Insurance for Your Business
                </h1>
                <p className="text-lg text-gray-600 mb-10 max-w-2xl">
                    Protect your business with affordable micro-insurance plans. Choose a plan that fits your budget and get covered today.
                </p>

                {/* Daily/Weekly Tabs */}
                <div className="flex space-x-4 mb-8">
                    <button
                        className={getTabClass('daily')}
                        onClick={() => setActiveTab('daily')}
                    >
                        Daily
                    </button>
                    <button
                        className={getTabClass('weekly')}
                        onClick={() => setActiveTab('weekly')}
                    >
                        Weekly
                    </button>
                </div>

                {/* Insurance Plan Cards */}
                <div className="space-y-8 mb-16">
                    {activeTab === 'daily' && (
                        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="md:w-2/3 pr-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Daily Micro-Insurance</h3>
                                <p className="text-gray-700 mb-4">
                                    Get daily coverage for just 500 Naira. Ideal for short-term protection and peace of mind.
                                </p>
                                <button className="bg-[#FF7043] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#FF7043]/90 transition-colors shadow-md">
                                    Buy Now
                                </button>
                            </div>
                            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                                {/* This image is illustrative, replace with an actual asset */}
                                <img src="/businessman-daily.png" alt="Daily Insurance" className="h-48 w-auto object-contain" />
                                {/* Placeholder for the image of the man in a suit from IMG-20250728-WA0010.jpg */}
                            </div>
                        </div>
                    )}

                    {activeTab === 'weekly' && (
                        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="md:w-2/3 pr-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Weekly Micro-Insurance</h3>
                                <p className="text-gray-700 mb-4">
                                    Secure your business for a week with our 200 Naira plan. Perfect for ongoing protection at a low cost.
                                </p>
                                <button className="bg-[#FF7043] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#FF7043]/90 transition-colors shadow-md">
                                    Buy Now
                                </button>
                            </div>
                            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                                {/* This image is illustrative, replace with an actual asset */}
                                <img src="/businessman-weekly.png" alt="Weekly Insurance" className="h-48 w-auto object-contain" />
                                {/* Placeholder for the image of the man in a suit from IMG-20250728-WA0010.jpg */}
                            </div>
                        </div>
                    )}
                </div>

                {/* Why Choose Our Micro-Insurance? Section */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Why Choose Our Micro-Insurance?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                        <Shield size={40} className="text-[#FF7043] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Affordable Coverage</h3>
                        <p className="text-gray-600">
                            Protect your business from unexpected events without breaking the bank.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                        <Clock size={40} className="text-[#FF7043] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Plans</h3>
                        <p className="text-gray-600">
                            Choose from daily or weekly plans to match your business needs.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                        <Headset size={40} className="text-[#FF7043] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Dedicated Support</h3>
                        <p className="text-gray-600">
                            Our team is here to assist you every step of the way.
                        </p>
                    </div>
                </div>

                {/* Get Started Button */}
                <div className="text-center">
                    <button className="bg-[#FF7043] text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#FF7043]/90 transition-colors shadow-lg">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MicroInsurancePage;