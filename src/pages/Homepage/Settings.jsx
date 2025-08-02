import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InsureLinkLogo from "../../assets/InsureLink.jpg";
import {
  Bell,
  User,
  ChevronDown,
  Edit,
  Plus,
  Mail,
  Phone,
  Moon,
  Trash2,
  Lock,
  Activity,
  Code,
  Settings as SettingsIcon,
  ShieldCheck,
  MailOpen,
  MessageSquare,
  BellRing,
  Share2,
  HelpCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react"; // Expanded icon set
import OpayLogo from "../../assets/opay.png";
import MoniepointLogo from "../../assets/moniepoint.png";

// Dummy Data
const currentUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+2348012345678",
  businessName: "Doe's Insurance Agency",
  businessAddress: "123 Insurance Road, Suite 400, Lagos, Nigeria",
  industry: "Financial Services - Insurance",
  profilePicture: null, // Can be replaced with a dummy image path if available
};

// Generic SVG data URI for a bank icon
const GenericBankLogo = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01"/><path d="M18 12h.01"/></svg>';


const Settings = () => {
  const location = useLocation();

  // State for User Details
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [businessName, setBusinessName] = useState(currentUser.businessName);
  const [businessAddress, setBusinessAddress] = useState(currentUser.businessAddress);
  const [industry, setIndustry] = useState(currentUser.industry);
  const [profilePic, setProfilePic] = useState(currentUser.profilePicture);

  // State for Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Opay Account", name: "John Doe Opay", accountNumber: "9012345678", isDefault: true, logo: OpayLogo },
    { id: 2, type: "Moniepoint Account", name: "Doe's Business Account", accountNumber: "8098765432", isDefault: false, logo: MoniepointLogo },
    { id: 3, type: "Bank Account", name: "My Savings Account", accountNumber: "0123456789", bankName: "Guaranty Trust Bank", isDefault: false, logo: GenericBankLogo },
  ]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [editingMethodId, setEditingMethodId] = useState(null);
  const [formPaymentType, setFormPaymentType] = useState('Bank Account');
  const [formAccountName, setFormAccountName] = useState('');
  const [formAccountNumber, setFormAccountNumber] = useState('');
  const [formBankName, setFormBankName] = useState('');

  // State for App Preferences & Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // State for Security & Privacy
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);

  // Refs for scrolling and dropdown
  const formRef = useRef(null);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null); // Ref for the button that opens dropdown

  // State for profile dropdown visibility
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Effect to scroll to the payment form when it appears
  useEffect(() => {
    if (showPaymentForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showPaymentForm]);

  // Effect for clicking outside the profile dropdown
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

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        console.log("Profile picture uploaded:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEditPaymentMethod = (e) => {
    e.preventDefault();
    if (!formAccountName || !formAccountNumber || (formPaymentType === 'Bank Account' && !formBankName)) {
      alert("Please fill all required fields for the payment method.");
      return;
    }

    const newOrUpdatedMethod = {
      id: editingMethodId || Date.now(),
      type: formPaymentType,
      name: formAccountName,
      accountNumber: formAccountNumber,
      bankName: formPaymentType === 'Bank Account' ? formBankName : undefined,
      isDefault: false,
      logo: formPaymentType.includes('Opay') ? OpayLogo : (formPaymentType.includes('Moniepoint') ? MoniepointLogo : GenericBankLogo),
    };

    if (editingMethodId) {
      setPaymentMethods(paymentMethods.map(method =>
        method.id === editingMethodId ? newOrUpdatedMethod : method
      ));
    } else {
      setPaymentMethods([...paymentMethods, newOrUpdatedMethod]);
    }

    setShowPaymentForm(false);
    setEditingMethodId(null);
    setFormPaymentType('Bank Account');
    setFormAccountName('');
    setFormAccountNumber('');
    setFormBankName('');
  };

  const handleEditPaymentMethodClick = (method) => {
    setEditingMethodId(method.id);
    setFormPaymentType(method.type);
    setFormAccountName(method.name);
    setFormAccountNumber(method.accountNumber);
    setFormBankName(method.bankName || '');
    setShowPaymentForm(true);
  };

  const handleDeletePaymentMethod = (id) => {
    if (window.confirm("Are you sure you want to delete this payment method?")) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
      if (editingMethodId === id) {
        setShowPaymentForm(false);
        setEditingMethodId(null);
      }
    }
  };

  const handleSetDefaultPaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Saving all settings...", {
      name, email, phone, businessName, businessAddress, industry, profilePic,
      paymentMethods, emailNotifications, smsNotifications, inAppNotifications,
      darkModeEnabled, twoFactorAuthEnabled
    });
    alert("All settings saved successfully!");
  };

  // Function to determine active link in Navbar
  const getNavLinkClass = (path) =>
    location.pathname === path
      ? 'text-[#FF7043] border-b-2 border-[#FF7043] pb-1'
      : 'text-gray-600 hover:text-[#FF7043] transition-colors';

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-poppins text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Link to="/" className="inline-block cursor-pointer">
            <img
              src={InsureLinkLogo}
              alt="InsureLink Logo"
              className="h-20 w-auto object-contain" // Increased logo size to h-20
            />
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className={`${getNavLinkClass('/')} font-medium`}>Dashboard</Link>
          <Link to="/policies" className={`${getNavLinkClass('/policies')} font-medium`}>Policies</Link>
          <Link to="/claims" className={`${getNavLinkClass('/claims')} font-medium`}>Claims</Link>
          <Link to="/transactions" className={`${getNavLinkClass('/transactions')} font-medium`}>Transactions</Link>
          <Link to="/contact-support" className={`${getNavLinkClass('/contact-support')} font-medium`}>Support</Link>
          <Link to="/notifications" className="text-gray-600 hover:text-[#FF7043] transition-colors cursor-pointer">
            <Bell size={20} />
          </Link>
          {/* Profile Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              ref={profileButtonRef}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 cursor-pointer focus:outline-none"
            >
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="h-9 w-9 rounded-full object-cover border-2 border-[#FF7043]" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-[#FF7043] flex items-center justify-center text-white text-base font-semibold">
                  JD
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

      <div className="container mx-auto px-4 py-8 lg:px-24">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
          <SettingsIcon size={32} className="text-[#FF7043] mr-3" /> Account Settings
        </h1>
        <p className="text-gray-600 text-lg mb-10">Manage your profile, business details, preferences, and security settings.</p>

        <form onSubmit={handleSaveChanges} className="bg-white p-8 rounded-lg shadow-md border border-[#E2E8F0]">

          {/* Personal Information */}
          <section className="mb-12 pb-6 border-b border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                  placeholder="Your Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                  placeholder="+234..."
                />
              </div>
              {/* Profile Picture Upload */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile Preview" className="h-28 w-28 rounded-full object-cover border-4 border-[#FF7043] shadow-md" />
                  ) : (
                    <div className="h-28 w-28 rounded-full bg-[#E2E8F0] flex items-center justify-center text-gray-500 text-sm border-4 border-[#E2E8F0]">
                      <User size={50} />
                    </div>
                  )}
                  <div className="flex space-x-3">
                    <label className="cursor-pointer bg-[#FF7043] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E55A35] transition-colors shadow-sm text-center">
                      Upload New Picture
                      <input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicUpload}
                        className="hidden"
                      />
                    </label>
                    {profilePic && (
                      <button
                        type="button"
                        onClick={() => setProfilePic(null)}
                        className="px-6 py-3 rounded-lg font-medium text-red-600 border border-red-300 hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">JPG, PNG, or GIF up to 5MB. For best results, use a square image.</p>
              </div>
            </div>
          </section>

          {/* Business Details */}
          <section className="mb-12 pb-6 border-b border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  id="business-name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                  placeholder="Your Business Name"
                />
              </div>
              <div>
                <label htmlFor="business-address" className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <input
                  type="text"
                  id="business-address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                  placeholder="123 Business Street, City, State, Country"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                  placeholder="e.g., Financial Services, Retail, Tech"
                />
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-12 pb-6 border-b border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">Payment Methods</h2>
            <div className="space-y-4 mb-6">
              {paymentMethods.length === 0 && (
                <p className="text-gray-500 italic">No payment methods added yet.</p>
              )}
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-2 rounded-lg bg-gray-50 transition-all duration-200
                    ${method.isDefault ? 'border-[#FF7043] shadow-md' : 'border-[#E2E8F0] hover:border-[#FF7043] hover:border-opacity-50'}
                  `}
                >
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    {method.logo && <img src={method.logo} alt={method.type} className="h-8 w-auto object-contain" />}
                    <div>
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.type} Account: ....{method.accountNumber.slice(-4)}</p>
                      {method.bankName && <p className="text-xs text-gray-500">{method.bankName}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm flex-wrap justify-end sm:justify-start gap-y-2">
                    {method.isDefault ? (
                      <span className="text-[#FF7043] font-medium px-3 py-1 bg-[#FF7043] bg-opacity-10 rounded-full text-xs flex items-center">
                        <ShieldCheck size={14} className="mr-1" /> Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultPaymentMethod(method.id)}
                        // Refined hover styles: text and border turn orange, no background tint
                        className="text-gray-600 hover:text-[#FF7043] font-medium transition-colors px-3 py-1 border border-gray-300 rounded-lg hover:border-[#FF7043] cursor-pointer"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleEditPaymentMethodClick(method)}
                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center cursor-pointer"
                    >
                      <Edit size={18} className="mr-1" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="text-red-600 hover:text-red-800 transition-colors flex items-center cursor-pointer"
                    >
                      <Trash2 size={18} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!showPaymentForm && (
              <button
                type="button"
                onClick={() => {
                  setShowPaymentForm(true);
                  setEditingMethodId(null);
                  setFormPaymentType('Bank Account');
                  setFormAccountName('');
                  setFormAccountNumber('');
                  setFormBankName('');
                }}
                className="flex items-center space-x-2 text-[#FF7043] hover:text-[#E55A35] font-medium transition-colors px-4 py-2 rounded-lg border border-[#FF7043] border-opacity-60 hover:border-opacity-100 cursor-pointer"
              >
                <Plus size={20} />
                <span>Add New Payment Method</span>
              </button>
            )}

            {showPaymentForm && (
              <div ref={formRef} className="mt-8 p-6 rounded-lg bg-gray-50 border border-[#FF7043] border-opacity-40 shadow-inner transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-bold text-gray-800 mb-5">{editingMethodId ? 'Edit Payment Method' : 'Add New Payment Method'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="form-payment-type" className="block text-sm font-medium text-gray-700 mb-2">Method Type</label>
                    <select
                      id="form-payment-type"
                      value={formPaymentType}
                      onChange={(e) => {
                        setFormPaymentType(e.target.value);
                        if (!e.target.value.includes('Bank Account')) {
                          setFormBankName('');
                        }
                      }}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 cursor-pointer"
                    >
                      <option value="Bank Account">Bank Account</option>
                      <option value="Opay Account">Opay Account</option>
                      <option value="Moniepoint Account">Moniepoint Account</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="form-account-name" className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                    <input
                      type="text"
                      id="form-account-name"
                      value={formAccountName}
                      onChange={(e) => setFormAccountName(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="form-account-number" className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <input
                      type="text"
                      id="form-account-number"
                      value={formAccountNumber}
                      onChange={(e) => setFormAccountNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                      placeholder="e.g., 0123456789"
                      required
                    />
                  </div>
                  {formPaymentType === 'Bank Account' && (
                    <div>
                      <label htmlFor="form-bank-name" className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                      <input
                        type="text"
                        id="form-bank-name"
                        value={formBankName}
                        onChange={(e) => setFormBankName(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200"
                        placeholder="e.g., Guaranty Trust Bank"
                        required={formPaymentType === 'Bank Account'}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    type="button"
                    onClick={() => { setShowPaymentForm(false); setEditingMethodId(null); }}
                    className="px-6 py-3 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleAddEditPaymentMethod}
                    className="bg-[#FF7043] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E55A35] transition-colors cursor-pointer shadow-md"
                  >
                    {editingMethodId ? 'Save Changes' : 'Add Method'}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Security & Privacy */}
          <section className="mb-12 pb-6 border-b border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">Security & Privacy</h2>
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <Lock size={20} className="text-gray-600" />
                  <p className="font-medium text-gray-700">Change Password</p>
                </div>
                <Link to="/change-password" className="text-[#FF7043] hover:text-[#E55A35] font-medium transition-colors cursor-pointer">
                  Update Password
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <ShieldCheck size={20} className="text-gray-600" />
                  <label htmlFor="two-factor-auth" className="text-sm font-medium text-gray-700 cursor-pointer">Two-Factor Authentication (2FA)</label>
                </div>
                <label htmlFor="two-factor-auth" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="two-factor-auth"
                      className="sr-only"
                      checked={twoFactorAuthEnabled}
                      onChange={() => setTwoFactorAuthEnabled(!twoFactorAuthEnabled)}
                    />
                    <div className={`block w-12 h-6 rounded-full ${twoFactorAuthEnabled ? 'bg-[#FF7043]' : 'bg-gray-300'} transition-colors duration-200`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${twoFactorAuthEnabled ? 'translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <Activity size={20} className="text-gray-600" />
                  <p className="font-medium text-gray-700">Recent Account Activity</p>
                </div>
                <Link to="/account-activity" className="text-[#FF7043] hover:text-[#E55A35] font-medium transition-colors cursor-pointer">
                  View Logs
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <Code size={20} className="text-gray-600" />
                  <p className="font-medium text-gray-700">Data & Privacy</p>
                </div>
                <button type="button" className="text-[#FF7043] hover:text-[#E55A35] font-medium transition-colors cursor-pointer" onClick={() => alert('Requesting data export...')}>
                  Request Data Export
                </button>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="mb-12 pb-6 border-b border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">Notification Preferences</h2>
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <MailOpen size={20} className="text-gray-600" />
                  <label htmlFor="email-notifications" className="text-sm font-medium text-gray-700 cursor-pointer">Email Notifications</label>
                </div>
                <label htmlFor="email-notifications" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id="email-notifications" className="sr-only" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                    <div className={`block w-12 h-6 rounded-full ${emailNotifications ? 'bg-[#FF7043]' : 'bg-gray-300'} transition-colors duration-200`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${emailNotifications ? 'translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <MessageSquare size={20} className="text-gray-600" />
                  <label htmlFor="sms-notifications" className="text-sm font-medium text-gray-700 cursor-pointer">SMS Notifications</label>
                </div>
                <label htmlFor="sms-notifications" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id="sms-notifications" className="sr-only" checked={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} />
                    <div className={`block w-12 h-6 rounded-full ${smsNotifications ? 'bg-[#FF7043]' : 'bg-gray-300'} transition-colors duration-200`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${smsNotifications ? 'translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <BellRing size={20} className="text-gray-600" />
                  <label htmlFor="in-app-notifications" className="text-sm font-medium text-gray-700 cursor-pointer">In-App Notifications</label>
                </div>
                <label htmlFor="in-app-notifications" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id="in-app-notifications" className="sr-only" checked={inAppNotifications} onChange={() => setInAppNotifications(!inAppNotifications)} />
                    <div className={`block w-12 h-6 rounded-full ${inAppNotifications ? 'bg-[#FF7043]' : 'bg-gray-300'} transition-colors duration-200`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${inAppNotifications ? 'translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* App Preferences (Dark Mode etc.) */}
          <section className="mb-12 pb-6 border-b border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">App Preferences</h2>
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center space-x-3">
                  <Moon size={20} className="text-gray-600" />
                  <label htmlFor="dark-mode-toggle" className="text-sm font-medium text-gray-700 cursor-pointer">Dark Mode</label>
                </div>
                <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="dark-mode-toggle"
                      className="sr-only"
                      checked={darkModeEnabled}
                      onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                    />
                    <div className={`block w-12 h-6 rounded-full ${darkModeEnabled ? 'bg-[#FF7043]' : 'bg-gray-300'} transition-colors duration-200`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${darkModeEnabled ? 'translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* Referral Program (Dummy) */}
          <section className="mb-12 pb-6 border-b border-[#E2E8F0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">Referral Program</h2>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-[#FF7043] to-[#E55A35] text-white rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Share2 size={40} className="text-white" />
                <div>
                  <h3 className="text-xl font-bold">Refer a Business, Get Rewarded!</h3>
                  <p className="text-sm opacity-90">Invite other SMEs to InsureLink and earn exclusive benefits.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Referral program details coming soon!')}
                className="bg-white text-[#FF7043] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
              >
                Learn More
              </button>
            </div>
          </section>

          {/* Help & Support */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-[#FF7043] inline-block">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Link to="/contact-support" className="flex items-center p-5 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm hover:border-[#FF7043] hover:bg-[#FF7043] hover:bg-opacity-5 transition-all duration-200 cursor-pointer">
                <Mail size={24} className="text-[#FF7043] mr-4" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Contact Support</h3>
                  <p className="text-gray-600 text-sm">Get in touch with our support team.</p>
                </div>
              </Link>
              <Link to="/faq" className="flex items-center p-5 bg-gray-50 rounded-lg border border-[#E2E8F0] shadow-sm hover:border-[#FF7043] hover:bg-[#FF7043] hover:bg-opacity-5 transition-all duration-200 cursor-pointer">
                <HelpCircle size={24} className="text-[#FF7043] mr-4" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Frequently Asked Questions</h3>
                  <p className="text-gray-600 text-sm">Find answers to common questions.</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Save Changes Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="bg-[#FF7043] text-white px-10 py-4 rounded-lg font-bold text-xl hover:bg-[#E55A35] transition-colors focus:outline-none focus:ring-4 focus:ring-[#FF7043] focus:ring-opacity-50 shadow-lg cursor-pointer"
            >
              Save All Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;