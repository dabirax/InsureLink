import React, { useState, Fragment, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  User, Settings, FileText, TrendingUp, Award, Bell, ChevronDown, LogOut, Home, MessageCircle, Briefcase, DollarSign, CheckCircle, Calendar, Menu as MenuIcon, Edit, Save, XCircle, Search, Star
} from 'lucide-react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import InsureLinkLogo from '../../InsureLink.jpg'; // Ensure this path is correct

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. INITIALIZE USER DATA:
  // This ensures that if user data is passed from the Dashboard (via location.state.user),
  // it is used. Otherwise, it falls back to defaultUserData.
  const initialUserData = location.state?.user || {
    firstName: "InsureLink",
    lastName: "User",
    preferredName: "Valued User",
    email: "user@insurelink.com",
    phoneNumber: "+234 801 234 5678",
    aboutYourself: "First-time user", // Default for profile journey
    insureLinkReason: "Exploring insurance options", // Default for profile journey
    avatar: null, // Default to null for neutral avatar
    // --- Added missing fields from original code / user request ---
    insuranceJourney: "My goal is to understand my current coverage better.",
    contactPreference: "Email",
    emailNotifications: true,
    smsNotifications: false,
    themePreference: "light",
  };

  const [user, setUser] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...initialUserData }); // Copy for editing
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const notificationsRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock data for notifications (consistent with Dashboard)
  const notifications = [
    { id: 1, message: "New policy 'Commercial Property' added successfully - View Details", time: "2 hours ago", read: false },
    { id: 2, message: "Payment of ₦50,000 received for Policy #POL-VEH-001 - Thank you!", time: "1 day ago", read: true },
    { id: 3, message: "Claim #CLM-2025-004 for Employee Health has been approved - Funds Disbursed", time: "3 days ago", read: false },
  ];

  // Close sidebar or notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target) && isNotificationsOpen) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, isNotificationsOpen]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // When starting to edit, copy current user data to editedUser
    if (!isEditing) {
      setEditedUser({ ...user });
    } else {
      // If canceling edit, reset editedUser to original user data
      setEditedUser({ ...user });
      setErrorMessage(''); // Clear errors if canceling
      setSuccessMessage(''); // Clear success if canceling
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!editedUser.firstName || !editedUser.lastName || !editedUser.email || !editedUser.phoneNumber) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setErrorMessage('Authentication token missing. Please log in again.');
      navigate('/login', { replace: true });
      return;
    }

    // Prepare data for backend, mapping frontend state names to backend API names
    const dataToSend = {
      first_name: editedUser.firstName,
      last_name: editedUser.lastName,
      preferred_name: editedUser.preferredName,
      email: editedUser.email,
      phone: editedUser.phoneNumber,
      about_yourself: editedUser.aboutYourself,
      insure_link_reason: editedUser.insureLinkReason,
      avatar_url: editedUser.avatar, // Still sending base64, backend needs to handle this
      // --- New fields to send to backend ---
      insurance_journey: editedUser.insuranceJourney,
      contact_preference: editedUser.contactPreference,
      email_notifications: editedUser.emailNotifications,
      sms_notifications: editedUser.smsNotifications,
      theme_preference: editedUser.themePreference,
    };

    try {
      const response = await fetch('https://Insurelink.onrender.com/user/', {
        method: 'PUT', // Assuming PUT for updating user profile
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        // Update the main user state with the saved data, mapping backend names back
        setUser(prevUser => ({
            ...prevUser,
            firstName: updatedUserData.first_name || prevUser.firstName,
            lastName: updatedUserData.last_name || prevUser.lastName,
            preferredName: updatedUserData.preferred_name || updatedUserData.first_name || prevUser.preferredName,
            email: updatedUserData.email || prevUser.email,
            phoneNumber: updatedUserData.phone || prevUser.phoneNumber,
            aboutYourself: updatedUserData.about_yourself || prevUser.aboutYourself,
            insureLinkReason: updatedUserData.insure_link_reason || prevUser.insureLinkReason,
            avatar: updatedUserData.avatar_url || null,
            // --- Update new fields from backend response ---
            insuranceJourney: updatedUserData.insurance_journey || prevUser.insuranceJourney,
            contactPreference: updatedUserData.contact_preference || prevUser.contactPreference,
            emailNotifications: updatedUserData.email_notifications !== undefined ? updatedUserData.email_notifications : prevUser.emailNotifications,
            smsNotifications: updatedUserData.sms_notifications !== undefined ? updatedUserData.sms_notifications : prevUser.smsNotifications,
            themePreference: updatedUserData.theme_preference || prevUser.themePreference,
        }));
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false); // Exit editing mode
        // Optionally, update the user state in the Dashboard if navigating back
        navigate('/dashboard', { state: { user: { ...user, ...editedUser } } }); // Pass updated user to dashboard
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData); // Log full error data
        setErrorMessage(errorData.detail || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Network or unexpected error during profile update:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-900 font-sans">
      {/* Sidebar Navigation */}
      <aside ref={sidebarRef} className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 p-6 flex flex-col shadow-lg
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center space-x-3 mb-8 cursor-pointer">
          <div className="flex-shrink-0">
            <img className="h-10 w-auto" src={InsureLinkLogo} alt="InsureLink Logo" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">InsureLink</h1>
            <p className="text-sm text-slate-500 -mt-1 tracking-wider">PREMIUM</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#FF7043] transition-colors cursor-pointer">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/policies" className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#FF7043] transition-colors cursor-pointer">
            <FileText size={20} />
            <span>My Policies</span>
          </Link>
          <Link to="/claims" className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#FF7043] transition-colors cursor-pointer">
            <Briefcase size={20} />
            <span>Claims</span>
          </Link>
          <Link to="/payment-page" className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#FF7043] transition-colors cursor-pointer">
            <DollarSign size={20} />
            <span>Payments</span>
          </Link>
          <Link to="/profile" state={{ user: user }} className="flex items-center space-x-3 p-3 rounded-lg text-[#FF7043] bg-orange-50 font-semibold hover:bg-orange-100 transition-colors cursor-pointer">
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#FF7043] transition-colors cursor-pointer">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-200">
          <Link to="/logout" className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#FF7043] transition-colors cursor-pointer">
            <LogOut size={20} />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 bg-slate-50 overflow-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 menu-button cursor-pointer"
              aria-label="Open sidebar"
            >
              <MenuIcon size={24} />
            </button>
            <div className="leading-tight">
              <h1 className="text-3xl font-bold text-gray-900 mb-0.5">
                <span className="text-[#FF7043]">{user.preferredName || user.firstName || 'Your'}</span> Profile
              </h1>
              <p className="text-base text-slate-600">Manage your personal information and preferences.</p>
              <div className="text-xs text-slate-400 mt-1">Dashboard / Profile</div>
            </div>
          </div>
          {/* Right side of header (Search, Notifications, User Profile) */}
          <div className="flex items-center space-x-4">
            {/* Search Bar (Optional) */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-[#FF7043] focus:ring-1 focus:ring-[#FF7043] outline-none transition-all"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 notification-button cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:ring-offset-2"
                aria-label="Notifications"
              >
                <Bell size={24} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              <Transition
                show={isNotificationsOpen}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div ref={notificationsRef} className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                  <div className="py-4 px-5 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div key={notification.id} className={`p-4 flex items-start space-x-3 border-b border-slate-100 ${!notification.read ? 'bg-orange-50' : 'hover:bg-slate-50'} cursor-pointer`}>
                          <div className="flex-shrink-0">
                            <Bell size={18} className={`${!notification.read ? 'text-[#FF7043]' : 'text-slate-400'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notification.read ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                              <span className="font-semibold">{notification.message.split(' - ')[0]}</span>{notification.message.includes(' - ') ? ` - ${notification.message.split(' - ')[1]}` : ''}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-sm text-slate-500 text-center">No new notifications.</p>
                    )}
                  </div>
                  <div className="p-3 border-t border-slate-200 text-center">
                    <Link to="/notifications" className="text-[#FF7043] text-sm font-medium hover:underline cursor-pointer">
                      View All Notifications
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
            {/* User Profile Dropdown Menu */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:ring-offset-2 cursor-pointer pr-2">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w-10 rounded-full object-cover mr-2"
                    src={user.avatar || `https://placehold.co/40x40/FF7043/FFFFFF?text=${(user.preferredName || user.firstName || 'U').charAt(0)}`}
                    alt="User Avatar"
                  />
                  <div className="hidden md:block text-left mr-1">
                    <p className="text-sm font-medium text-gray-900">{user.preferredName || user.firstName || 'User'}</p>
                    <p className="text-xs text-slate-500 -mt-0.5">{user.email || 'user@example.com'}</p>
                  </div>
                  <ChevronDown size={18} className="text-slate-500" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <div className="block px-4 py-2 text-sm text-gray-700">
                        <p className="font-medium text-gray-900">{user.preferredName || user.firstName || 'User'}</p>
                        <p className="text-gray-500 truncate">{user.email || 'user@example.com'}</p>
                      </div>
                    )}
                  </Menu.Item>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        state={{ user: user }} // Pass current user state
                        className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 ${active ? 'bg-slate-100 text-[#FF7043]' : ''} hover:text-[#FF7043] hover:bg-slate-100 transition-colors cursor-pointer`}
                      >
                        <User size={18} />
                        <span>Your Profile</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 ${active ? 'bg-slate-100 text-[#FF7043]' : ''} hover:text-[#FF7043] hover:bg-slate-100 transition-colors cursor-pointer`}
                      >
                        <Settings size={18} />
                        <span>Settings</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/logout"
                        className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 ${active ? 'bg-slate-100 text-[#FF7043]' : ''} hover:text-[#FF7043] hover:bg-slate-100 transition-colors cursor-pointer`}
                      >
                        <LogOut size={18} />
                        <span>Sign out</span>
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF7043] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7043] transition-colors cursor-pointer"
                  >
                    <Save size={18} className="mr-2" /> Save
                  </button>
                  <button
                    onClick={handleEditToggle} // Cancel button
                    className="inline-flex items-center px-4 py-2 border border-[#FF7043] text-sm font-medium rounded-md shadow-sm text-[#FF7043] bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7043] transition-colors cursor-pointer"
                  >
                    <XCircle size={18} className="mr-2" /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF7043] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7043] transition-colors cursor-pointer"
                >
                  <Edit size={18} className="mr-2" /> Edit Profile
                </button>
              )}
            </div>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative m-6" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative m-6" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}

            <div className="p-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF7043] shadow-lg mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={user.avatar || `https://placehold.co/128x128/FF7043/FFFFFF?text=${(user.preferredName || user.firstName || 'U').charAt(0)}`}
                    alt="User Avatar"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditedUser(prev => ({ ...prev, avatar: reader.result }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Edit size={24} className="text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user.preferredName || `${user.firstName} ${user.lastName}`}</h3>
                <p className="text-sm text-slate-600">{user.email}</p>
              </div>

              {/* User Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={isEditing ? editedUser.firstName : user.firstName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={isEditing ? editedUser.lastName : user.lastName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                  />
                </div>
                {/* Preferred Name */}
                <div>
                  <label htmlFor="preferredName" className="block text-sm font-medium text-gray-700 mb-1">Preferred Name</label>
                  <input
                    type="text"
                    name="preferredName"
                    id="preferredName"
                    value={isEditing ? editedUser.preferredName : user.preferredName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                  />
                </div>
                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={isEditing ? editedUser.email : user.email}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                  />
                </div>
                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={isEditing ? editedUser.phoneNumber : user.phoneNumber}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                  />
                </div>
                {/* About Yourself */}
                <div>
                  <label htmlFor="aboutYourself" className="block text-sm font-medium text-gray-700 mb-1">About Yourself</label>
                  <select
                    id="aboutYourself"
                    name="aboutYourself"
                    value={isEditing ? editedUser.aboutYourself : user.aboutYourself}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                  >
                    <option value="First-time user">First-time user</option>
                    <option value="Young Professional">Young Professional</option>
                    <option value="Family Person">Family Person</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Student">Student</option>
                    <option value="Retiree">Retiree</option>
                  </select>
                </div>
                {/* Reason for InsureLink */}
                <div>
                  <label htmlFor="insureLinkReason" className="block text-sm font-medium text-gray-700 mb-1">Reason for InsureLink</label>
                  <select
                    id="insureLinkReason"
                    name="insureLinkReason"
                    value={isEditing ? editedUser.insureLinkReason : user.insureLinkReason}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                  >
                    <option value="Exploring insurance options">Exploring insurance options</option>
                    <option value="First time getting insurance">First time getting insurance</option>
                    <option value="Switching from another provider">Switching from another provider</option>
                    <option value="Expanding my coverage">Expanding my coverage</option>
                    <option value="Business insurance needs">Business insurance needs</option>
                  </select>
                </div>
              </div>

              {/* New Sections: Your Insurance Journey & Preferences */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Insurance Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Insurance Journey Field (Example: Free Text) */}
                  <div>
                    <label htmlFor="insuranceJourney" className="block text-sm font-medium text-gray-700 mb-1">Your Insurance Goals</label>
                    <textarea
                      id="insuranceJourney"
                      name="insuranceJourney"
                      rows="3"
                      value={isEditing ? editedUser.insuranceJourney || '' : user.insuranceJourney || ''}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                      placeholder="e.g., 'Looking to consolidate policies and find better rates.'"
                    ></textarea>
                  </div>
                  {/* Preferred Contact Method */}
                  <div>
                    <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                    <select
                      id="contactPreference"
                      name="contactPreference"
                      value={isEditing ? editedUser.contactPreference || 'Email' : user.contactPreference || 'Email'}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="SMS">SMS</option>
                      <option value="In-App Chat">In-App Chat</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Preferences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Notification Preferences */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={isEditing ? editedUser.emailNotifications : user.emailNotifications}
                          onChange={handleChange} // Use general handleChange
                          disabled={!isEditing}
                          className="h-4 w-4 text-[#FF7043] focus:ring-[#FF7043] border-gray-300 rounded"
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                          Email Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="smsNotifications"
                          name="smsNotifications"
                          type="checkbox"
                          checked={isEditing ? editedUser.smsNotifications : user.smsNotifications}
                          onChange={handleChange} // Use general handleChange
                          disabled={!isEditing}
                          className="h-4 w-4 text-[#FF7043] focus:ring-[#FF7043] border-gray-300 rounded"
                        />
                        <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-900">
                          SMS Notifications
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Theme Preference */}
                  <div>
                    <label htmlFor="themePreference" className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
                    <select
                      id="themePreference"
                      name="themePreference"
                      value={isEditing ? editedUser.themePreference || 'light' : user.themePreference || 'light'}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 block w-auto px-3 py-2 border ${isEditing ? 'border-[#FF7043] focus:border-[#FF7043] focus:ring-[#FF7043]' : 'border-transparent'} rounded-md shadow-sm sm:text-sm transition-all ${!isEditing ? 'bg-slate-50 text-gray-700' : 'bg-white'}`}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;