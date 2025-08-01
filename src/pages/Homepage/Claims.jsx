// src/pages/Claims/Claims.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InsureLinkLogo from '../../InsureLink.jpg'; // Ensure this path is correct

import {
    Bell, User, ChevronDown, Search, FileText, ShieldCheck, CalendarDays, ScrollText, DollarSign, 
    Settings as SettingsIcon, LogOut, PlusCircle, X, Upload, Zap, Car, Briefcase, Heart, 
    Home as HomeIcon, Clock, CheckCircle, AlertCircle, XCircle
} from 'lucide-react';

const CustomMessageBox = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-[100] p-4 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center">
            <Zap size={48} className="text-[#FF7043] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Claim Submitted!</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
                onClick={onClose}
                className="bg-[#FF7043] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E55A35] transition-colors shadow-md w-full"
            >
                OK
            </button>
        </div>
    </div>
);

const NewClaimModal = ({ isOpen, onClose, onAddClaim }) => {
    const [formData, setFormData] = useState({
        policyType: '',
        dateOfIncident: '',
        description: '',
        incidentLocation: '',
        supportingDocuments: null,
    });
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    const modalContentRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                policyType: '',
                dateOfIncident: '',
                description: '',
                incidentLocation: '',
                supportingDocuments: null,
            });
            setFileName('');
            setErrors({});
            setShowMessage(false);
        } else {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, supportingDocuments: file }));
        setFileName(file ? file.name : '');
        if (errors.supportingDocuments) {
            setErrors(prev => ({ ...prev, supportingDocuments: '' }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.policyType) newErrors.policyType = 'Policy Type is required.';
        if (!formData.dateOfIncident) newErrors.dateOfIncident = 'Date of Incident is required.';
        if (!formData.description) newErrors.description = 'Description is required.';
        if (!formData.incidentLocation) newErrors.incidentLocation = 'Incident Location is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const newClaim = {
            id: `CLM-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
            policyType: formData.policyType,
            dateFiled: new Date().toISOString().split('T')[0],
            description: formData.description,
            status: 'Submitted',
            amount: null,
            incidentLocation: formData.incidentLocation,
            supportingDocuments: formData.supportingDocuments ? formData.supportingDocuments.name : 'N/A',
            incidentDate: formData.dateOfIncident,
        };

        onAddClaim(newClaim);
        onClose();
        setShowMessage(true);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 font-poppins animate-fade-in">
                <div
                    ref={modalContentRef}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform scale-95 animate-scale-in-up border border-[#E2E8F0]
                                flex flex-col max-h-[90vh]"
                >
                    <div className="flex justify-between items-center p-8 pb-4 border-b border-gray-100 flex-shrink-0">
                        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                            <PlusCircle size={28} className="text-[#FF7043] mr-3" />
                            File a New Claim
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
                            <X size={28} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-grow custom-scrollbar">
                        <div>
                            <label htmlFor="policyType" className="block text-sm font-medium text-gray-700 mb-2">Policy Type <span className="text-red-500">*</span></label>
                            <select
                                id="policyType"
                                name="policyType"
                                value={formData.policyType}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 ${errors.policyType ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                            >
                                <option value="">Select a Policy Type</option>
                                <option value="Auto">Auto Insurance</option>
                                <option value="Health">Health Insurance</option>
                                <option value="Home">Home Insurance</option>
                                <option value="Life">Life Insurance</option>
                                <option value="Travel">Travel Insurance</option>
                                <option value="SME">Daily Micro-Insurance (SME)</option>
                            </select>
                            {errors.policyType && <p className="text-red-500 text-xs mt-1">{errors.policyType}</p>}
                        </div>

                        <div>
                            <label htmlFor="dateOfIncident" className="block text-sm font-medium text-gray-700 mb-2">Date of Incident <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                id="dateOfIncident"
                                name="dateOfIncident"
                                value={formData.dateOfIncident}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 ${errors.dateOfIncident ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                            />
                            {errors.dateOfIncident && <p className="text-red-500 text-xs mt-1">{errors.dateOfIncident}</p>}
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="incidentLocation" className="block text-sm font-medium text-gray-700 mb-2">Location of Incident <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="incidentLocation"
                                name="incidentLocation"
                                value={formData.incidentLocation}
                                onChange={handleChange}
                                placeholder="e.g., 123 Main St, Lagos, Nigeria"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 ${errors.incidentLocation ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                            />
                            {errors.incidentLocation && <p className="text-red-500 text-xs mt-1">{errors.incidentLocation}</p>}
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description of Incident <span className="text-red-500">*</span></label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Provide a detailed description of what happened..."
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 resize-y ${errors.description ? 'border-red-500' : 'border-[#E2E8F0]'}`}
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Documents (Optional)</label>
                            <label htmlFor="supportingDocuments" className="flex items-center justify-center w-full px-4 py-3 border border-dashed border-[#E2E8F0] rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600">
                                <Upload size={20} className="mr-2" />
                                {fileName ? `Selected: ${fileName}` : 'Choose File (e.g., Police Report, Photos)'}
                            </label>
                            <input
                                type="file"
                                id="supportingDocuments"
                                name="supportingDocuments"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </form>

                    <div className="flex justify-end gap-3 p-8 pt-0 border-t border-gray-100 flex-shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg border border-[#E2E8F0] text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-[#FF7043] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E55A35] transition-colors cursor-pointer shadow-md"
                        >
                            Submit Claim
                        </button>
                    </div>
                </div>
            </div>
            {showMessage && (
                <CustomMessageBox
                    message="Claim submitted successfully! Expect feedback from us in literally hours, not days!"
                    onClose={() => setShowMessage(false)}
                />
            )}
        </>
    );
};

const Claims = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Claims');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNewClaimModal, setShowNewClaimModal] = useState(false);
    const [showNewClaimMessage, setShowNewClaimMessage] = useState(false);

    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);

    // Dummy claims data
    const [claims, setClaims] = useState([
        // Active Claims (Submitted status)
        {
            id: 'CLM-2025-1001',
            policyType: 'Auto',
            dateFiled: '2025-07-28',
            incidentDate: '2025-07-25',
            description: 'Minor collision with another vehicle at traffic intersection. Front bumper damaged, headlight cracked.',
            status: 'Submitted',
            amount: null,
            incidentLocation: 'Victoria Island, Lagos',
            supportingDocuments: 'Police Report.pdf, Photos.jpg',
            icon: <Car size={20} className="text-orange-500" />
        },
        {
            id: 'CLM-2025-1002',
            policyType: 'SME',
            dateFiled: '2025-07-30',
            incidentDate: '2025-07-29',
            description: 'Fire incident at shop premises due to electrical fault. Inventory damaged including electronics and clothing.',
            status: 'Under Review',
            amount: null,
            incidentLocation: 'Onitsha Main Market, Anambra',
            supportingDocuments: 'Fire Report.pdf, Inventory List.xlsx',
            icon: <Briefcase size={20} className="text-purple-500" />
        },
        {
            id: 'CLM-2025-1003',
            policyType: 'Health',
            dateFiled: '2025-07-31',
            incidentDate: '2025-07-30',
            description: 'Emergency hospitalization for acute appendicitis. Surgery performed at Lagos University Teaching Hospital.',
            status: 'Submitted',
            amount: null,
            incidentLocation: 'LUTH, Idi-Araba, Lagos',
            supportingDocuments: 'Medical Report.pdf, Hospital Bills.pdf',
            icon: <Heart size={20} className="text-red-500" />
        },
        // Past Claims (Approved, Paid, Closed)
        {
            id: 'CLM-2025-0987',
            policyType: 'Auto',
            dateFiled: '2025-06-15',
            incidentDate: '2025-06-12',
            description: 'Theft of vehicle from parking lot. Car was stolen overnight with no signs of forced entry.',
            status: 'Paid',
            amount: 850000,
            incidentLocation: 'Ikeja GRA, Lagos',
            supportingDocuments: 'Police Report.pdf, Keys Receipt.pdf',
            icon: <Car size={20} className="text-orange-500" />
        },
        {
            id: 'CLM-2025-0965',
            policyType: 'Home',
            dateFiled: '2025-05-20',
            incidentDate: '2025-05-18',
            description: 'Burglary at residential property. Electronics, jewelry, and cash were stolen during break-in.',
            status: 'Approved',
            amount: 320000,
            incidentLocation: 'Surulere, Lagos',
            supportingDocuments: 'Police Report.pdf, Inventory.xlsx',
            icon: <HomeIcon size={20} className="text-blue-500" />
        },
        {
            id: 'CLM-2025-0943',
            policyType: 'Health',
            dateFiled: '2025-04-10',
            incidentDate: '2025-04-08',
            description: 'Routine surgery for gallbladder removal. Procedure completed successfully at private hospital.',
            status: 'Paid',
            amount: 180000,
            incidentLocation: 'Gbagada General Hospital, Lagos',
            supportingDocuments: 'Surgery Report.pdf, Bills.pdf',
            icon: <Heart size={20} className="text-red-500" />
        },
        {
            id: 'CLM-2025-0921',
            policyType: 'SME',
            dateFiled: '2025-03-25',
            incidentDate: '2025-03-23',
            description: 'Water damage to shop inventory due to burst pipe from upper floor. Stock ruined.',
            status: 'Closed',
            amount: 95000,
            incidentLocation: 'Computer Village, Ikeja',
            supportingDocuments: 'Damage Report.pdf, Photos.jpg',
            icon: <Briefcase size={20} className="text-purple-500" />
        },
        {
            id: 'CLM-2025-0898',
            policyType: 'Auto',
            dateFiled: '2025-02-14',
            incidentDate: '2025-02-12',
            description: 'Side collision during lane change on expressway. Passenger door and mirror damaged.',
            status: 'Paid',
            amount: 125000,
            incidentLocation: 'Third Mainland Bridge, Lagos',
            supportingDocuments: 'Accident Report.pdf, Repair Quote.pdf',
            icon: <Car size={20} className="text-orange-500" />
        },
        {
            id: 'CLM-2025-0876',
            policyType: 'Health',
            dateFiled: '2025-01-30',
            incidentDate: '2025-01-28',
            description: 'Treatment for broken arm after motorcycle accident. X-rays, casting, and physiotherapy.',
            status: 'Closed',
            amount: 75000,
            incidentLocation: 'National Orthopedic Hospital, Igbobi',
            supportingDocuments: 'X-Ray Reports.pdf, Treatment Bill.pdf',
            icon: <Heart size={20} className="text-red-500" />
        }
    ]);

    const activeClaimDisplayStatuses = ['Submitted', 'Under Review'];
    const pastClaimDisplayStatuses = ['Approved', 'Paid', 'Closed'];

    // Dummy user data for Navbar dropdown (consistent with Policies page)
    const currentUser = {
        name: "John Doe",
        profilePicture: null,
    };

    const filteredClaims = claims.filter(claim => {
        const claimId = typeof claim.id === 'string' ? claim.id : '';
        const policyType = typeof claim.policyType === 'string' ? claim.policyType : '';
        const description = typeof claim.description === 'string' ? claim.description : '';

        const matchesSearch = claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            policyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;

        if (activeFilter === 'Active Claims') {
            matchesFilter = activeClaimDisplayStatuses.includes(claim.status);
        } else if (activeFilter === 'Past Claims') {
            matchesFilter = pastClaimDisplayStatuses.includes(claim.status);
        }

        return matchesSearch && matchesFilter;
    }).sort((a, b) => new Date(b.dateFiled) - new Date(a.dateFiled));

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

    const handleAddClaim = (newClaim) => {
        setClaims(prevClaims => [newClaim, ...prevClaims]);
        setShowNewClaimMessage(true);
    };

    const getNavLinkClass = (path) =>
        location.pathname === path
            ? 'text-[#FF7043] border-b-2 border-[#FF7043] pb-1'
            : 'text-gray-600 hover:text-[#FF7043] transition-colors';

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return 'Pending';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Under Review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
            case 'Closed': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Submitted': return <Clock size={14} className="mr-1" />;
            case 'Under Review': return <AlertCircle size={14} className="mr-1" />;
            case 'Approved': return <CheckCircle size={14} className="mr-1" />;
            case 'Paid': return <CheckCircle size={14} className="mr-1" />;
            case 'Closed': return <XCircle size={14} className="mr-1" />;
            default: return <Clock size={14} className="mr-1" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF9] font-poppins text-gray-800">
            {/* Navbar (consistent with Policies page) */}
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
                    <Link to="/notifications" className="text-gray-600 hover:text-[#FF7043] transition-colors cursor-pointer">
                        <Bell size={20} />
                    </Link>
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
                                    <User size={18} className="mr-2" /> My Profile
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
                                    onClick={() => setShowProfileDropdown(false)}
                                >
                                    <LogOut size={18} className="mr-2" /> Log Out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Claims Content Area */}
            <div className="container mx-auto px-4 py-8 lg:px-24">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center gap-4">
                            <ShieldCheck size={36} className="text-[#FF7043]" /> My Claims
                        </h1>
                        <button
                            onClick={() => setShowNewClaimModal(true)}
                            className="bg-[#FF7043] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A35] transition-colors cursor-pointer shadow-md flex items-center transform hover:scale-105"
                        >
                            <PlusCircle size={20} className="mr-2" />
                            File a New Claim
                        </button>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-2">Track the status of your claims and file new ones quickly.</p>
                    <p className="text-xl font-semibold text-[#FF7043] flex items-center mb-10">
                        <Zap size={24} className="mr-2" />
                        At InsureLink, expect feedback on your claims in <span className="underline ml-1">literally hours</span>, not days!
                    </p>

                    {/* Search and Filter Section */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                        <div className="relative mb-6">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Claim ID, Policy Type, or Description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 text-base bg-white"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5 mt-5">
                            {['All Claims', 'Active Claims', 'Past Claims'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveFilter(tab)}
                                    className={`px-5 py-3 rounded-lg text-base font-semibold transition-all duration-300 cursor-pointer shadow-md transform hover:scale-105
                                        ${activeFilter === tab
                                            ? 'bg-[#FF7043] text-white hover:bg-[#E55A35]'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                   {/* Claims Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {filteredClaims.length === 0 ? (
                            <div className="text-center py-16 bg-gray-50">
                                <ShieldCheck size={64} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-xl text-gray-500 mb-2">No claims found matching your criteria.</p>
                                <p className="text-gray-400 mb-6">
                                    {activeFilter === 'All Claims' 
                                        ? "You haven't filed any claims yet." 
                                        : `No ${activeFilter.toLowerCase()} found.`}
                                </p>
                                <button
                                    onClick={() => setShowNewClaimModal(true)}
                                    className="bg-[#FF7043] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A35] transition-colors cursor-pointer shadow-md flex items-center mx-auto transform hover:scale-105"
                                >
                                    <PlusCircle size={20} className="mr-2" />
                                    File Your First Claim
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <CalendarDays size={16} className="text-gray-400" />
                                                    Date Filed
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={16} className="text-gray-400" />
                                                    Claim ID
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <ScrollText size={16} className="text-gray-400" />
                                                    Policy Type
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                <div className="flex items-center justify-end gap-2">
                                                    <DollarSign size={16} className="text-gray-400" />
                                                    Amount
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredClaims.map((claim, index) => (
                                            <tr
                                                key={claim.id}
                                                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer animate-fade-in"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                                onClick={() => {
                                                    // In a real app, this would navigate to claim details
                                                    console.log('View claim details:', claim.id);
                                                }}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    <div className="flex items-center">
                                                        <CalendarDays size={16} className="text-gray-400 mr-2" />
                                                        {new Date(claim.dateFiled).toLocaleDateString('en-US', { 
                                                            year: 'numeric', 
                                                            month: 'short', 
                                                            day: 'numeric' 
                                                        })}
                                                    </div>
                                                    {claim.incidentDate && (
                                                        <div className="text-xs text-gray-500 mt-1 ml-6">
                                                            Incident: {new Date(claim.incidentDate).toLocaleDateString('en-US', { 
                                                                month: 'short', 
                                                                day: 'numeric' 
                                                            })}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <div className="flex items-center">
                                                        {claim.icon || <FileText size={16} className="text-gray-400 mr-2" />}
                                                        <span className="ml-2">{claim.id}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <div className="flex items-center">
                                                        {claim.icon}
                                                        <span className="ml-2">{claim.policyType}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                                    <div className="line-clamp-2 leading-relaxed">
                                                        {claim.description}
                                                    </div>
                                                    {claim.incidentLocation && (
                                                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                                                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                                            {claim.incidentLocation}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClass(claim.status)} items-center`}>
                                                        {getStatusIcon(claim.status)}
                                                        {claim.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-base font-bold text-gray-900">
                                                    <div className="text-right">
                                                        {formatCurrency(claim.amount)}
                                                        {claim.status === 'Paid' && claim.amount && (
                                                            <div className="text-xs text-green-600 font-normal mt-1">
                                                                ✓ Paid
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Claims Summary Cards (Optional - shows when there are claims) */}
                    {filteredClaims.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-600 text-sm font-medium">Active Claims</p>
                                        <p className="text-2xl font-bold text-blue-900">
                                            {claims.filter(claim => activeClaimDisplayStatuses.includes(claim.status)).length}
                                        </p>
                                    </div>
                                    <Clock size={32} className="text-blue-500" />
                                </div>
                            </div>

                            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-600 text-sm font-medium">Paid Claims</p>
                                        <p className="text-2xl font-bold text-green-900">
                                            {claims.filter(claim => claim.status === 'Paid').length}
                                        </p>
                                    </div>
                                    <CheckCircle size={32} className="text-green-500" />
                                </div>
                            </div>

                            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-600 text-sm font-medium">Total Payouts</p>
                                        <p className="text-2xl font-bold text-orange-900">
                                            {formatCurrency(
                                                claims
                                                    .filter(claim => claim.amount)
                                                    .reduce((sum, claim) => sum + claim.amount, 0)
                                            )}
                                        </p>
                                    </div>
                                    <DollarSign size={32} className="text-orange-500" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Help Section */}
                    <div className="bg-gradient-to-r from-[#FF7043]/10 to-[#FF7043]/5 p-8 rounded-2xl border border-[#FF7043]/20 mt-12">
                        <div className="flex items-start gap-4">
                            <Zap size={32} className="text-[#FF7043] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Need Help with Your Claim?
                                </h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Our dedicated support team is here to assist you every step of the way. Whether you need help filing a claim, 
                                    checking its status, or understanding your coverage, we're committed to providing you with exceptional service.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        to="/contact-support"
                                        className="inline-flex items-center px-6 py-3 bg-[#FF7043] text-white font-semibold rounded-lg shadow-md hover:bg-[#E55A35] transition-colors transform hover:scale-[1.02]"
                                    >
                                        <Bell size={20} className="mr-2" />
                                        Contact Support
                                    </Link>
                                    <Link
                                        to="/faq"
                                        className="inline-flex items-center px-6 py-3 border border-[#FF7043] text-[#FF7043] font-semibold rounded-lg hover:bg-[#FF7043]/5 transition-colors transform hover:scale-[1.02]"
                                    >
                                        <FileText size={20} className="mr-2" />
                                        View FAQs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <NewClaimModal
                isOpen={showNewClaimModal}
                onClose={() => setShowNewClaimModal(false)}
                onAddClaim={handleAddClaim}
            />

            {showNewClaimMessage && (
                <CustomMessageBox
                    message="Claim submitted successfully! Expect feedback from us in literally hours, not days!"
                    onClose={() => setShowNewClaimMessage(false)}
                />
            )}

            {/* Required CSS for animations and styling */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes scale-in-up {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
                
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out forwards;
                }
                
                .animate-scale-in-up {
                    animation: scale-in-up 0.3s ease-out forwards;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #FF7043;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #E55A35;
                }
            `}</style>
        </div>
    );
};

export default Claims;