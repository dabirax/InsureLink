import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Dialog, Transition, Menu } from '@headlessui/react';
import {
  Menu as MenuIcon, X, FileText, Award, Calendar, Briefcase, MessageCircle,
  Bell, User, Settings, LogOut, Search, Shield, ArrowRight, Home, Users, DollarSign, CheckCircle, ChevronDown, TrendingUp, Star, CreditCard, ChevronRight, Clock, Zap, Phone
} from 'lucide-react';
import InsureLinkLogo from '../../InsureLink.jpg'; // Ensure this path is correct
import OpayLogo from '../../opay.png'; // Assuming opay.png is in src/
import MoniepointLogo from '../../moniepoint.png'; // Assuming moniepoint.png is in src/

// Mock Data (will be replaced by actual data fetching for user details)
const defaultUserData = {
  firstName: "InsureLink",
  lastName: "User",
  preferredName: "Valued User",
  email: "user@insurelink.com",
  phoneNumber: "+234 801 234 5678",
  aboutYourself: "Young Professional", // Default to a specific type for richer demo content
  insureLinkReason: "First time getting insurance", // Default for richer demo content
  avatar: null, // Changed to null for a neutral default
};

const dashboardSummary = {
  activePolicies: 3, // Adjusted for demo consistency
  totalCoverage: "₦250,000,000",
  upcomingPaymentsCount: 345000,
};

const notifications = [
  { id: 1, message: "New policy 'Commercial Property' added successfully - View Details", time: "2 hours ago", read: false },
  { id: 2, message: "Payment of ₦50,000 received for Policy #POL-VEH-001 - Thank you!", time: "1 day ago", read: true },
  { id: 3, message: "Claim #CLM-2025-004 for Employee Health has been approved - Funds Disbursed", time: "3 days ago", read: false },
  { id: 4, message: "Your annual insurance review is due next month - Schedule Now", time: "1 week ago", read: true },
];

const activityLog = [
  { id: "TRX-INS-001", policy: "Vehicle Insurance", amount: "₦75,000", date: "2025-07-28", status: "Completed" },
  { id: "TRX-CLM-002", policy: "Commercial Auto", amount: "₦0", date: "2025-07-25", status: "Claim Filed" },
  { id: "TRX-PAY-003", policy: "Employee Health", amount: "₦120,000", date: "2025-07-20", status: "Pending Payment" },
  { id: "TRX-UPD-004", policy: "Property Damage", amount: "₦0", date: "2025-07-15", status: "Policy Updated" },
];

const whyChooseInsureLink = [
  {
    title: "Expert Guidance",
    description: "Our dedicated advisors help you find the perfect coverage.",
    icon: Award,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    title: "Tailored Solutions",
    description: "Customizable policies designed to fit your unique needs.",
    icon: FileText,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    title: "Seamless Experience",
    description: "Manage policies and claims effortlessly online, 24/7.",
    icon: MessageCircle,
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    title: "Reliable Support",
    description: "Always here for you with responsive and friendly service.",
    icon: User,
    bgColor: "bg-red-50",
    textColor: "text-red-700",
  },
];

const policiesOverview = [
  { id: "POL-VEH-001", type: "Vehicle Insurance", status: "Active", premiumDue: "₦75,000", renewalDate: "2026-07-30", icon: Briefcase, coverage: "₦15,000,000" },
  { id: "POL-CP-001", type: "Commercial Property", status: "Active", premiumDue: "₦200,000", renewalDate: "2026-05-20", icon: Home, coverage: "₦100,000,000" },
  { id: "POL-HLTH-002", type: "Employee Health", status: "Active", premiumDue: "₦120,000", renewalDate: "2026-09-10", icon: Users, coverage: "₦8,000,000" },
  { id: "POL-PROP-003", type: "Property Damage", status: "Active", premiumDue: "₦150,000", renewalDate: "2027-01-25", icon: Home, coverage: "₦7,000,000" },
];

const claimsData = [
  { id: "CLM-2025-005", policy: "Commercial Auto", type: "Minor Collision", status: "Submitted", dateFiled: "2025-07-25", amount: 75000 },
  { id: "CLM-2025-004", policy: "Employee Health", type: "Medical Coverage", status: "Approved", dateFiled: "2025-07-10", amount: 45000, progress: 100 },
];

// Mock data for Policy Insights
const policyInsights = [
  {
    title: "Annual Policy Review",
    description: "Schedule a free consultation to review your current policies and ensure optimal coverage.",
    icon: Calendar,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    cta: { text: "Schedule Review", link: "/schedule-review" } // Hypothetical link
  },
  {
    title: "Explore New Benefits",
    description: "Discover additional benefits or add-ons that could enhance your existing protection.",
    icon: Star,
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    cta: { text: "Learn More", link: "/policies" }
  },
  {
    title: "Understand Your Coverage",
    description: "Dive deep into your policy documents with our AI assistant for clarity on terms and conditions.",
    icon: MessageCircle,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    cta: { text: "Chat with AI", link: "/chatbot" }
  },
];

// New data for Quick Actions based on user's request
const quickActionsData = [
  {
    title: "Update Profile",
    description: "Manage your personal information.",
    icon: User,
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    link: "/profile"
  },
  {
    title: "View Policies",
    description: "Access your active insurance plans.",
    icon: Shield,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    link: "/policies"
  },
  {
    title: "Make Payment",
    description: "Pay your premiums securely.",
    icon: CreditCard,
    bgColor: "bg-orange-50",
    textColor: "text-[#FF7043]",
    link: "/payment-page"
  },
  {
    title: "File Claim",
    description: "Initiate a new claim or track existing ones.",
    icon: FileText,
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    link: "/claims"
  },
  {
    title: "Chat with Support",
    description: "Get instant assistance from our AI.",
    icon: MessageCircle,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    link: "/chatbot"
  },
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(defaultUserData); // Initialize with default, fetch actual data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const notificationsRef = useRef(null);
  const [greetingTime, setGreetingTime] = useState('');

  // Helper function to get the JWT token from storage
  const getAuthToken = () => {
    // First check localStorage (for "Remember Me" option)
    let token = localStorage.getItem('userToken');
    if (token) return token;

    // Then check sessionStorage (for temporary session)
    token = sessionStorage.getItem('userToken');
    if (token) return token;

    // Also check for the old key name as fallback
    token = localStorage.getItem('access_token');
    if (token) return token;

    token = sessionStorage.getItem('access_token');
    if (token) return token;

    return null;
  };

  // Helper function to clear all tokens and redirect to login
  const handleAuthFailure = (message = 'Session expired or invalid. Please log in again.') => {
    // Clear all possible token storage locations
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    
    alert(message);
    navigate('/login', { replace: true });
  };

  // Effect to fetch user data after successful login
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = getAuthToken();
      
      if (!accessToken) {
        console.warn("No access token found, redirecting to login.");
        handleAuthFailure("No authentication token found. Please log in.");
        return;
      }

      try {
        const response = await fetch('https://Insurelink.onrender.com/user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          // Update user state with fetched data
          setUser(prevUser => ({
            ...prevUser, // Keep existing defaults if not overwritten
            firstName: userData.first_name || prevUser.firstName,
            lastName: userData.last_name || prevUser.lastName,
            preferredName: userData.preferred_name || userData.first_name || prevUser.preferredName,
            email: userData.email || prevUser.email,
            phoneNumber: userData.phone || prevUser.phoneNumber,
            aboutYourself: userData.about_yourself || prevUser.aboutYourself,
            insureLinkReason: userData.insure_link_reason || prevUser.insureLinkReason,
            avatar: userData.avatar_url || null, // Ensure avatar is null if not provided by backend
          }));
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch user data:', errorData);
          // If token is invalid or expired, redirect to login
          if (response.status === 401 || response.status === 403) {
            handleAuthFailure('Session expired or invalid. Please log in again.');
          }
        }
      } catch (error) {
        console.error('Network error fetching user data:', error);
        // Handle network errors (e.g., show a message to the user)
        if (error instanceof TypeError && error.message.includes('fetch')) {
          console.error('Network error: Could not connect to the server.');
          // Don't redirect on network error, just log it
        } else {
          handleAuthFailure('An unexpected error occurred. Please log in again.');
        }
      }
    };

    fetchUserData();
  }, [navigate]); // Dependency array: re-run when navigate changes

  // Update user state if location.state.user changes (e.g., after profile update)
  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location.state?.user]); // Re-run when location.state.user changes

  // Set time-based greeting on component mount
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreetingTime('morning');
    } else if (hour < 18) {
      setGreetingTime('afternoon');
    } else {
      setGreetingTime('evening');
    }
  }, []);

  // Determine personalized subtitle
  const getPersonalizedSubtitle = () => {
    switch(user.aboutYourself) {
      case "Young Professional":
        return "Ready to secure your future? Let's explore policies that fit your dynamic lifestyle.";
      case "Family Person":
        return "Protecting what matters most - here's your family's insurance overview.";
      case "Business Owner":
        return "Your business deserves the best protection. Review your commercial coverage.";
      case "Student":
        return "Budget-friendly options to keep you covered while you focus on studies.";
      case "Retiree":
        return "Ensuring peace of mind and security during your golden years.";
      case "First-time user":
        return "Welcome to InsureLink! Let's get started with some essential insurance knowledge.";
      default:
        // Fallback or more generic message based on insureLinkReason
        switch(user.insureLinkReason) {
            case "First time getting insurance":
                return "Welcome to InsureLink! Your journey to comprehensive coverage begins here.";
            case "Switching from another provider":
                return "Glad to have you with InsureLink! Let's get your coverage seamlessly transferred.";
            case "Expanding my coverage":
                return "Ready to grow your protection? Explore new policies tailored for you.";
            case "Business insurance needs":
                return "Secure your enterprise with InsureLink's business insurance solutions.";
            default:
                return "Here's an overview of your InsureLink account today."; // More generic, but still positive
        }
    }
  };

  // Determine personalized tips for "Just for You" section
  const getPersonalizedTips = () => {
    const tips = [];
    if (user.insureLinkReason === "First time getting insurance") {
      tips.push({
        title: "New to Insurance? Chat with AI!",
        description: "Our AI assistant can guide you through the basics and help you find your first policy.",
        icon: MessageCircle,
        bgColor: "bg-orange-50",
        textColor: "text-[#FF7043]",
        cta: { text: "Start Chat", link: "/chatbot" }
      });
    }
    if (user.aboutYourself === "Family Person") {
      tips.push({
        title: "Family Coverage Review",
        description: "Ensure all family members are adequately covered. Explore family health plans.",
        icon: Users,
        bgColor: "bg-blue-50",
        textColor: "text-blue-700"
      });
    }
    if (user.aboutYourself === "Business Owner") {
      tips.push({
        title: "Protect Your Business",
        description: "Review commercial property or liability insurance options. Chat with our experts!",
        icon: Briefcase,
        bgColor: "bg-green-50",
        textColor: "text-green-700"
      });
    }
    if (user.insureLinkReason === "Expanding my coverage") {
      tips.push({
        title: "Explore New Policies",
        description: "Looking for more? Discover life insurance or home protection plans.",
        icon: Star, // Using Star icon for 'new'
        bgColor: "bg-purple-50",
        textColor: "text-purple-700"
      });
    }
    // Fallback tips if no specific personalization applies
    if (tips.length === 0) {
      tips.push({
        title: "Complete Your Profile",
        description: "Add more details to your profile for tailored recommendations.",
        icon: User,
        bgColor: "bg-gray-50",
        textColor: "text-gray-700"
      });
      tips.push({
        title: "Chat with InsureLink AI",
        description: "Our AI can help you navigate your insurance needs and answer questions.",
        icon: MessageCircle,
        bgColor: "bg-orange-50",
        textColor: "text-[#FF7043]",
        cta: { text: "Start Chat", link: "/chatbot" }
      });
    }
    return tips;
  };

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

  // Find the specific claim to display in the Claims Overview section
  // Ensure this is always a valid claim for demo purposes, or handle its absence gracefully
  const claimToDisplay = claimsData.find(claim => claim.id === "CLM-2025-005") || claimsData[0] || null; // Fallback to first claim or null

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
          <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg text-[#FF7043] bg-orange-50 font-semibold hover:bg-orange-100 transition-colors cursor-pointer">
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
          {/* Updated Link to pass user state */}
          <Link to="/profile" state={{ user: user }} className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#FF7043] transition-colors cursor-pointer">
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
            {/* Personalized Greeting */}
            <div className="leading-tight">
              <h1 className="text-3xl font-bold text-gray-900 mb-0.5">
                Good {greetingTime}, <span className="text-[#FF7043]">{user.preferredName || user.firstName || 'User'}</span>!
                {user.insureLinkReason === "First time getting insurance" && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star size={12} className="mr-1" /> Great Start!
                  </span>
                )}
              </h1>
              <p className="text-base text-slate-600">
                {getPersonalizedSubtitle()}
              </p>
              {/* Breadcrumb Navigation Placeholder */}
              <div className="text-xs text-slate-400 mt-1">Dashboard</div>
            </div>
          </div>
          {/* Right side of header (Search, Notifications, User Profile) */}
          <div className="flex items-center space-x-4">
            {/* Search Bar (Optional, can be expanded) */}
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
                        state={{ user: user }} // Updated Link to pass user state
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
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText size={20} className="text-[#FF7043]" />
                </div>
                <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  Total
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardSummary.activePolicies}</h3>
              <p className="text-base text-slate-600">Active Policies</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp size={14} className="mr-1" /> 18% above average!
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-[#FF7043]" />
                </div>
                <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  Global
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardSummary.totalCoverage}</h3>
              <p className="text-base text-slate-600">Total Coverage Amount</p>
              <p className="text-sm text-slate-600 mt-1">Great coverage for your peace of mind.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar size={20} className="text-[#FF7043]" />
                </div>
                <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  Future Benefits
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">₦{dashboardSummary.upcomingPaymentsCount.toLocaleString()}</h3>
              <p className="text-base text-slate-600">Future Savings</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <CheckCircle size={14} className="mr-1" /> Keep up the great planning!
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-full flex items-center justify-center">
                  <Briefcase size={20} className="text-[#FF7043]" />
                </div>
                <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  In Progress
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{claimsData.filter(c => c.status === 'Submitted').length}</h3>
              <p className="text-base text-slate-600">Claims Submitted</p>
              <p className="text-sm text-orange-600 mt-1">
                {claimsData.filter(c => c.status === 'Submitted').length > 0 ? "We're on it!" : "All clear, no pending claims!"}
              </p>
            </div>
          </div>
          {/* Main Content Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-8 min-w-0">
              {/* Chatbot Spotlight Section */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-tr-full opacity-50"></div>
                <div className="relative z-10 p-4 bg-orange-100 rounded-2xl flex-shrink-0">
                  <MessageCircle size={64} className="text-[#FF7043]" />
                </div>
                <div className="flex-1 text-center md:text-left relative z-10 leading-relaxed min-w-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Meet InsureLink AI: Your Personal Insurance Assistant</h2>
                  <p className="text-lg text-slate-600 mb-6 max-w-lg mx-auto md:mx-0">
                    Get instant answers, personalized advice, and seamless support 24/7. Our intelligent chatbot is here to simplify your insurance journey.
                  </p>
                  <Link
                    to="/chatbot"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#FF7043] hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Start Chatting
                    <ArrowRight size={18} className="ml-2 -mr-1" />
                  </Link>
                </div>
              </div>
              {/* Recent Activity Log */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Recent Activities</h2>
                  <p className="text-sm text-slate-600">A snapshot of your latest transactions and updates.</p>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Transaction ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Policy
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {activityLog.map(activity => (
                          <tr key={activity.id} className="hover:bg-slate-50 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{activity.policy}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{activity.amount === "₦0" ? "N/A" : activity.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{activity.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.status === 'Completed' ? 'bg-green-100 text-green-800' : activity.status === 'Claim Filed' ?
                                'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {activity.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Just for You: Personalized Tips Section */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Just for You: Personalized Tips</h2>
                  <p className="text-sm text-slate-600">Recommendations tailored to your profile.</p>
                </div>
                <div className="p-6 space-y-4">
                  {getPersonalizedTips().map((tip, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden hover:shadow-md transition-shadow">
                      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-30" style={{ backgroundColor: tip.bgColor.replace('bg-', '').replace('-50', '') === 'orange' ? '#fff7ed' : tip.bgColor === 'bg-blue-50' ? '#eff6ff' : tip.bgColor === 'bg-green-50' ? '#f0fdf4' : tip.bgColor === 'bg-purple-50' ? '#faf5ff' : '#f9fafb' }}></div>
                      <div className="relative z-10 p-3 rounded-2xl flex-shrink-0" style={{ backgroundColor: tip.bgColor.replace('bg-', '').replace('-50', '') === 'orange' ? '#fed7aa' : tip.bgColor === 'bg-blue-50' ? '#dbeafe' : tip.bgColor === 'bg-green-50' ? '#dcfce7' : tip.bgColor === 'bg-purple-50' ? '#f3e8ff' : '#f1f5f9' }}>
                        <tip.icon size={32} className={tip.textColor} />
                      </div>
                      <div className="flex-1 text-center md:text-left relative z-10 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
                        <p className="text-base text-slate-600 mb-4 max-w-lg mx-auto md:mx-0">
                          {tip.description}
                        </p>
                        {tip.cta && (
                          <Link
                            to={tip.cta.link}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#FF7043] hover:bg-orange-600 transition-colors cursor-pointer"
                          >
                            {tip.cta.text}
                            <ArrowRight size={18} className="ml-2 -mr-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Policy Insights (Replaced Upcoming Renewals) */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Your Coverage Insights</h2>
                  <p className="text-sm text-slate-600">Proactive tips to maximize your insurance benefits.</p>
                </div>
                <div className="p-6 space-y-4">
                  {policyInsights.map((insight, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative z-10 p-3 rounded-2xl flex-shrink-0" style={{ backgroundColor: insight.bgColor.replace('bg-', '').replace('-50', '') === 'orange' ? '#fed7aa' : insight.bgColor === 'bg-blue-50' ? '#dbeafe' : insight.bgColor === 'bg-green-50' ? '#dcfce7' : insight.bgColor === 'bg-purple-50' ? '#f3e8ff' : '#f1f5f9' }}>
                        <insight.icon size={32} className={insight.textColor} />
                      </div>
                      <div className="flex-1 text-center md:text-left relative z-10 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{insight.title}</h3>
                        <p className="text-base text-slate-600 mb-4 max-w-lg mx-auto md:mx-0">
                          {insight.description}
                        </p>
                        {insight.cta && (
                          <Link
                            to={insight.cta.link}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#FF7043] hover:bg-orange-600 transition-colors cursor-pointer"
                          >
                            {insight.cta.text}
                            <ArrowRight size={18} className="ml-2 -mr-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dedicated Payments Section (Moved to bottom of left column) */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-tr-full opacity-50"></div>
                <div className="relative z-10 p-4 bg-orange-100 rounded-2xl flex-shrink-0">
                  <CreditCard size={64} className="text-[#FF7043]" />
                </div>
                <div className="flex-1 text-center md:text-left relative z-10 leading-relaxed min-w-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Seamless Payments, Your Way</h2>
                  <p className="text-lg text-slate-600 mb-6 max-w-lg mx-auto md:mx-0">
                    Experience unparalleled convenience in managing your insurance finances. InsureLink supports a wide array of payment options, including popular fintech platforms like OPay and Moniepoint, ensuring a smooth and secure transaction every time.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                    <img src={OpayLogo} alt="OPay" className="h-8 w-auto" />
                    <img src={MoniepointLogo} alt="Moniepoint" className="h-8 w-auto" />
                  </div>
                  <Link
                    to="/payment-page"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#FF7043] hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Explore Payment Options
                    <ArrowRight size={18} className="ml-2 -mr-1" />
                  </Link>
                </div>
              </div>
              {/* New: Dedicated Contact Support Section */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-tr-full opacity-50"></div>
                <div className="relative z-10 p-4 bg-orange-100 rounded-2xl flex-shrink-0">
                  <Phone size={64} className="text-[#FF7043]" />
                </div>
                <div className="flex-1 text-center md:text-left relative z-10 leading-relaxed min-w-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Need Personalized Assistance?</h2>
                  <p className="text-lg text-slate-600 mb-6 max-w-lg mx-auto md:mx-0">
                    Our dedicated support team is always ready to provide you with expert guidance and prompt solutions. Reach out to us for any questions about your policies, claims, or general inquiries. Your peace of mind is our priority.
                  </p>
                  <Link
                    to="/contact-support"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#FF7043] hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Contact Our Support Team
                    <ArrowRight size={18} className="ml-2 -mr-1" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Right Column (1/3 width) */}
            <div className="lg:col-span-1 space-y-8 min-w-0">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Quick Actions</h2>
                  <p className="text-base text-slate-600">Your shortcuts to essential services.</p>
                </div>
                <div className="p-6 space-y-4">
                  {quickActionsData.map((action, index) => (
                    <Link key={index} to={action.link} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${action.bgColor}`}>
                          <action.icon size={24} className={action.textColor} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                          <p className="text-sm text-slate-600">{action.description}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
              {/* Why Choose InsureLink */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Why Choose InsureLink?</h2>
                  <p className="text-base text-slate-600">Our commitment to your peace of mind.</p>
                </div>
                <div className="p-6 space-y-4">
                  {whyChooseInsureLink.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${item.bgColor}`}>
                        <item.icon size={24} className={item.textColor} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Policy Overview (Recent Policies) */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">Your Essential Coverage</h2>
                    <p className="text-base text-slate-600">Tailored solutions for your peace of mind</p>
                  </div>
                  <Link to="/policies" className="text-[#FF7043] text-sm font-medium hover:underline flex items-center gap-1 cursor-pointer">
                    View All Policies <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6">
                  {policiesOverview.slice(0, 4).map(policy => (
                    <div key={policy.id} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-slate-100 rounded-full">
                            <policy.icon size={18} className="text-[#FF7043]" />
                          </div>
                          <h4 className="font-semibold text-gray-900 text-base">{policy.type}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${policy.status === 'Active' ? 'bg-green-100 text-green-800 text-xs' : 'bg-yellow-100 text-yellow-800 text-xs'}`}>
                          {policy.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">Coverage: <span className="font-medium text-gray-900">{policy.coverage}</span></p>
                      <p className="text-sm text-slate-600">Renewal: <span className="font-medium text-gray-900">{policy.renewalDate}</span></p>
                      <p className="text-sm text-slate-600">Premium Due: <span className="font-medium text-gray-900">{policy.premiumDue}</span></p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Claims Overview */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">Claims Overview</h2>
                    <p className="text-base text-slate-600">Track your pending claims.</p>
                  </div>
                  <Link to="/claims" className="text-[#FF7043] text-sm font-medium hover:underline flex items-center gap-1 cursor-pointer">
                    View All Claims <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="p-6 space-y-4">
                  {claimToDisplay ? ( // Only render if a claim to display is found
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">Claim <span className="text-[#FF7043]">#{claimToDisplay.id}</span> - {claimToDisplay.type}</p>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          claimToDisplay.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {claimToDisplay.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">Policy: <span className="font-medium text-gray-900">{claimToDisplay.policy}</span></p>
                      <p className="text-sm text-slate-600">Filed On: <span className="font-medium text-gray-900">{claimToDisplay.dateFiled}</span></p>
                      <p className="text-sm font-medium text-orange-700 mt-1">Status: {claimToDisplay.status}</p>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                      <p>No claims currently in review.</p>
                    </div>
                  )}
                </div>
              </div>
              {/* InsureLink Community & Support */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Community & Support</h2>
                  <p className="text-base text-slate-600">Connect, learn, and get help from our vibrant community.</p>
                </div>
                <div className="p-6 space-y-4">
                  <Link to="/community" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Users size={24} className="text-green-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Join Our Community Forum</h3>
                        <p className="text-sm text-slate-600">Share insights and get peer support.</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-400" />
                  </Link>
                  <Link to="/faq" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <MessageCircle size={24} className="text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
                        <p className="text-sm text-slate-600">Find quick answers to common queries.</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-400" />
                  </Link>
                  <Link to="/contact" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-orange-100 rounded-full">
                        <Phone size={24} className="text-[#FF7043]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Contact Support</h3>
                        <p className="text-sm text-slate-600">Reach out to our dedicated team.</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;