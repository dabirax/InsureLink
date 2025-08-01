// src/pages/Notifications/Notifications.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InsureLinkLogo from '../../InsureLink.jpg'; // Corrected path assumption

import {
    Bell, User, ChevronDown, Settings as SettingsIcon, LogOut,
    CheckCircle, Info, Tag, CalendarDays, Mail, Trash2 // Added Trash2 for clearing notifications
} from 'lucide-react';

// Dummy data for the current user (consistent with other pages)
const currentUser = {
    name: "John Doe",
    profilePicture: null,
};

// Dummy Notification Data
const initialNotifications = [
    {
        id: 'notif-001',
        type: 'Policy Update',
        message: 'Your Auto Insurance Policy POL-AUTO-ABC123 has been successfully renewed. New premium is NGN 15,000.',
        date: '2025-07-28T10:30:00Z',
        read: false,
        link: '/policies/POL-AUTO-ABC123'
    },
    {
        id: 'notif-002',
        type: 'Claim Status',
        message: 'Claim CLM-2025-001 for Auto Accident has been approved. Payout of NGN 150,000 will be processed within 24 hours.',
        date: '2025-07-27T15:00:00Z',
        read: false,
        link: '/claims/CLM-2025-001'
    },
    {
        id: 'notif-003',
        type: 'Payment Reminder',
        message: 'Your premium for Health Policy GHI789 is due on 2025-08-01. Please ensure sufficient funds are available.',
        date: '2025-07-26T09:00:00Z',
        read: false,
        link: '/payments'
    },
    {
        id: 'notif-004',
        type: 'General',
        message: 'New features available! Check out our enhanced claims tracking in the latest app update.',
        date: '2025-07-25T11:00:00Z',
        read: true,
        link: '/updates'
    },
    {
        id: 'notif-005',
        type: 'Policy Update',
        message: 'Your Home Insurance Policy XYZ456 has been updated. Review changes in your policy documents.',
        date: '2025-07-24T14:00:00Z',
        read: true,
        link: '/policies/XYZ456'
    },
    {
        id: 'notif-006',
        type: 'Claim Status',
        message: 'Medical Reimbursement claim CLM-2025-002 has been settled. Funds transferred.',
        date: '2025-07-23T16:30:00Z',
        read: true,
        link: '/claims/CLM-2025-002'
    },
    {
        id: 'notif-007',
        type: 'Payment Reminder',
        message: 'Your next premium for Life Policy JKL101 is scheduled for 2025-09-01.',
        date: '2025-07-22T08:00:00Z',
        read: true,
        link: '/payments'
    },
];

const Notifications = () => {
    const location = useLocation();
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState('All'); // 'All', 'Unread', 'Read'
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

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

    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const handleClearReadNotifications = () => {
        setNotifications(notifications.filter(notif => !notif.read));
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'Policy Update': return <Tag size={18} className="text-blue-500" />;
            case 'Claim Status': return <CheckCircle size={18} className="text-green-500" />;
            case 'Payment Reminder': return <Mail size={18} className="text-orange-500" />;
            case 'General': return <Info size={18} className="text-gray-500" />;
            default: return <Info size={18} className="text-gray-500" />;
        }
    };

    const getNotificationBgAndBorder = (read) => {
        if (!read) {
            return `bg-[#FFF8F0] border-[#FF7043]/20`; // Light orange background, subtle orange border for unread
        }
        return `bg-white border-gray-100`; // White background, light gray border for read
    };

    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'Unread') return !notif.read;
        if (filter === 'Read') return notif.read;
        return true; // All
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

    const unreadCount = notifications.filter(notif => !notif.read).length;

    return (
        <div className="min-h-screen bg-[#FDFBF9] font-poppins text-gray-800">
            {/* Navbar (consistent across pages) */}
            <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <Link to="/" className="inline-block cursor-pointer">
                        <img
                            src={InsureLinkLogo}
                            alt="InsureLink Logo"
                            className="h-20 w-auto object-contain"
                        />
                    </Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="/dashboard" className={`${getNavLinkClass('/dashboard')} font-medium`}>Dashboard</Link>
                    <Link to="/policies" className={`${getNavLinkClass('/policies')} font-medium`}>Policies</Link>
                    <Link to="/claims" className={`${getNavLinkClass('/claims')} font-medium`}>Claims</Link>
                    <Link to="/transactions" className={`${getNavLinkClass('/transactions')} font-medium`}>Transactions</Link>
                    <Link to="/contact-support" className={`${getNavLinkClass('/contact-support')} font-medium`}>Support</Link>
                    <Link to="/notifications" className={`${getNavLinkClass('/notifications')} relative text-gray-600 hover:text-[#FF7043] transition-colors cursor-pointer`}>
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#FF7043] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-once">
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
            <div className="container mx-auto px-4 py-8 lg:px-24">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <h1 className="text-3xl font-normal tracking-wide text-gray-900 mb-4 md:mb-0 flex items-center">
                        <span className="text-gray-900 leading-tight">
                            Notifications
                        </span>
                    </h1>
                    <div className="flex flex-wrap gap-3">
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="bg-[#FF7043] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#FF7043]/90 transition-colors cursor-pointer shadow-md text-sm flex items-center"
                            >
                                <CheckCircle size={18} className="mr-2" /> Mark All as Read
                            </button>
                        )}
                        {notifications.some(notif => notif.read) && ( // Only show if there are read notifications to clear
                            <button
                                onClick={handleClearReadNotifications}
                                className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer shadow-md text-sm flex items-center"
                            >
                                <Trash2 size={18} className="mr-2 text-gray-600" /> Clear Read Notifications
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="mb-6 flex space-x-3">
                    {['All', 'Unread', 'Read'].map(filterOption => (
                        <button
                            key={filterOption}
                            onClick={() => setFilter(filterOption)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors
                                ${filter === filterOption
                                    ? 'bg-[#FF7043] text-white shadow'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {filterOption} ({notifications.filter(n => filterOption === 'All' ? true : (filterOption === 'Unread' ? !n.read : n.read)).length})
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl shadow-md border border-gray-100">
                            <Bell size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-lg text-gray-500">No notifications found.</p>
                        </div>
                    ) : (
                        filteredNotifications.map(notif => (
                            <div
                                key={notif.id}
                                className={`flex items-start p-5 rounded-xl border ${getNotificationBgAndBorder(notif.read)} shadow-sm
                                    hover:shadow-md transition-all duration-200 ${notif.link ? 'cursor-pointer' : ''}`}
                                onClick={() => notif.link && window.location.href !== notif.link ? window.location.href = notif.link : (notif.read ? null : handleMarkAsRead(notif.id))}
                            >
                                <div className="flex-shrink-0 mr-4 mt-1">
                                    {getNotificationIcon(notif.type)}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${notif.read ? 'bg-gray-100 text-gray-600' : 'bg-[#FF7043]/20 text-[#FF7043]'}`}>
                                            {notif.type}
                                        </span>
                                        {!notif.read && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notif.id); }}
                                                className="text-xs text-gray-500 hover:text-[#FF7043] transition-colors"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                    </div>
                                    <p className={`font-medium ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                        {notif.message}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                                        <CalendarDays size={14} className="mr-1" />
                                        {new Date(notif.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(notif.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;