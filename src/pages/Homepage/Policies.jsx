// src/pages/Policies/Policies.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InsureLinkLogo from '../../InsureLink.jpg'; // Ensure this path is correct

import {
    Home as HomeIcon, Car, Briefcase, Heart, FileText, Calendar, Wallet, CheckCircle, Clock,
    ChevronDown, User, LogOut, Settings as SettingsIcon, Bell,
    List, Info, FilePlus, PlusCircle, Lightbulb, HelpCircle, File, Gavel, Handshake, ChevronRight, ChevronUp // Added ChevronRight and ChevronUp for expand/collapse
} from 'lucide-react';

const Policies = () => {
    const location = useLocation();

    // Dummy data for active policies
    const [policies, setPolicies] = useState([
        {
            id: 'POL001',
            type: 'Auto Insurance',
            icon: <Car size={24} className="text-orange-500" />,
            provider: 'InsureLink Auto',
            status: 'Active',
            coverage: 'Comprehensive (Collision, Theft, Third-Party)',
            premium: '₦25,000 / month',
            nextPayment: 'August 10, 2025',
            expiryDate: 'August 10, 2026',
            keyBenefits: [
                'Full coverage for accidental damages.',
                'Theft protection for your vehicle.',
                'Liability for damages to third-party property.',
                'Roadside assistance included.'
            ],
            documents: ['Policy Wording.pdf', 'Schedule.pdf'],
            claimProcessSummary: 'File claim online, upload photos, get payout in 24-48hrs for approved claims.'
        },
        {
            id: 'POL002',
            type: 'Daily Micro-Insurance (SME)',
            icon: <Briefcase size={24} className="text-purple-500" />,
            provider: 'InsureLink Business',
            status: 'Active',
            coverage: 'Business Interruption, Fire & Theft',
            premium: '₦500 / day',
            nextPayment: 'July 30, 2025',
            expiryDate: 'Daily Renewal',
            keyBenefits: [
                'Daily protection for business premises.',
                'Covers damages from accidental fire.',
                'Protection against theft of business goods.',
                'Seamless daily renewal for continuous cover.'
            ],
            documents: ['Micro-Policy.pdf'],
            claimProcessSummary: 'Simple claim form, immediate verification for valid incidents, payout within minutes.'
        },
        {
            id: 'POL003',
            type: 'Health Insurance',
            icon: <Heart size={24} className="text-red-500" />,
            provider: 'InsureLink Health',
            status: 'Active',
            coverage: 'Primary Care, Hospitalization, Select Specialists',
            premium: '₦12,000 / month',
            nextPayment: 'August 5, 2025',
            expiryDate: 'August 5, 2026',
            keyBenefits: [
                'Access to a wide network of partner hospitals and clinics.',
                'Covers routine medical check-ups and consultations.',
                'Emergency hospitalization coverage.',
                'Prescription medication benefits.'
            ],
            documents: ['Health Plan Summary.pdf', 'Clinic List.pdf'],
            claimProcessSummary: 'Present your InsureLink health card at partner hospitals for cashless service or submit receipts for reimbursement.'
        },
        {
            id: 'POL004',
            type: 'Home Insurance',
            icon: <HomeIcon size={24} className="text-blue-500" />,
            provider: 'InsureLink Home',
            status: 'Pending Activation', // Example of a pending policy
            coverage: 'Building Structure & Contents',
            premium: '₦30,000 / quarter',
            nextPayment: 'September 1, 2025',
            expiryDate: 'September 1, 2026',
            keyBenefits: [
                'Protection against structural damage to your home.',
                'Covers household contents against theft and accidental damage.',
                'Liability coverage for incidents on your property.'
            ],
            documents: ['Home Insurance Proposal.pdf'],
            claimProcessSummary: 'Submit claim with incident report and photos. Our team verifies quickly for payout.'
        },
    ]);

    // State to manage which policy is expanded
    const [expandedPolicyId, setExpandedPolicyId] = useState(null);
    const togglePolicyExpansion = (id) => {
        setExpandedPolicyId(expandedPolicyId === id ? null : id);
    };

    // State to manage which FAQ is expanded
    const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
    const toggleFaqExpansion = (index) => {
        setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
    };


    // Dummy user data for Navbar dropdown (should come from shared context in a real app)
    const currentUserData = {
        name: "John Doe",
        profilePicture: null,
        unreadNotifications: 2,
    };
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);

    // Close profile dropdown when clicking outside
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
    }, []);

    const getNavLinkClass = (path) =>
        location.pathname === path
            ? 'text-[#FF7043] border-b-2 border-[#FF7043] pb-1'
            : 'text-gray-600 hover:text-[#FF7043] transition-colors';

    const getStatusClass = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Pending Activation':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Expired':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const faqs = [
        {
            question: "What is micro-insurance?",
            answer: "Micro-insurance provides affordable insurance products designed for low-income individuals and small businesses, often with flexible payment options (daily, weekly, monthly) and simplified processes, making insurance accessible to everyone."
        },
        {
            question: "How do I file a claim with InsureLink?",
            answer: "Our claim process is simple and fast. For active policies, click 'File a Claim' directly on your policy card. Provide incident details, upload necessary documents/photos, and our ML/AI system will expedite verification for quick payout, sometimes in minutes."
        },
        {
            question: "Can I cancel or modify my policy?",
            answer: "Policy cancellation and modification terms vary by product. Please refer to your specific policy documents (accessible by expanding your policy details) or contact our dedicated support team for personalized assistance."
        },
        {
            question: "How transparent is InsureLink's process?",
            answer: "Transparency is our promise. We provide clear policy wordings, no hidden fees, and a straightforward, digital-first claims process. Our goal is to debunk the notion that insurance is complex or untrustworthy, building genuine confidence."
        },
        {
            question: "What if I need help or have more questions?",
            answer: "Our support team is always ready to assist you. You can visit our Support page, use the in-app chat, or call our helpline. We are committed to providing dedicated assistance every step of the way."
        }
    ];

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
                    </Link>
                    {/* Profile Dropdown Trigger */}
                    <div className="relative">
                        <button
                            type="button"
                            ref={profileButtonRef}
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="flex items-center space-x-2 cursor-pointer focus:outline-none"
                        >
                            {currentUserData.profilePicture ? (
                                <img src={currentUserData.profilePicture} alt="Profile" className="h-9 w-9 rounded-full object-cover border-2 border-[#FF7043]" />
                            ) : (
                                <div className="h-9 w-9 rounded-full bg-[#FF7043] flex items-center justify-center text-white text-base font-semibold">
                                    {currentUserData.name.split(' ').map(n => n[0]).join('')}
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

            {/* Main Policies Content Area */}
            <div className="container mx-auto px-4 py-8 lg:px-24">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                        <FileText size={36} className="text-[#FF7043]" /> My Active Policies
                    </h1>

                    {/* Trust & Transparency Section */}
                    <div className="bg-[#FFF8F0] p-6 rounded-xl border border-[#FF7043]/30 shadow-sm mb-12 flex items-start gap-4">
                        <Handshake size={36} className="text-[#FF7043] mt-1" />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Commitment: Transparent & Trustworthy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                At InsureLink, we believe insurance should be simple, accessible, and trustworthy. We're here to protect the backbone of Nigeria's economy – small businesses and individuals – by providing clear, affordable policies and a claims process so straightforward, you'll wonder why it was ever complicated. No hidden fees, no confusing jargon, just peace of mind.
                            </p>
                        </div>
                    </div>

                    {policies.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-2xl text-gray-600 mb-4">You currently have no active policies with us.</p>
                            <Link to="/micro-insurance" className="inline-flex items-center px-6 py-3 bg-[#FF7043] text-white font-semibold rounded-lg shadow-md hover:bg-[#FF7043]/90 transition-colors transform hover:scale-105">
                                <PlusCircle size={20} className="mr-2" /> Explore Our Plans
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4 mb-12">
                            {policies.map((policy) => (
                                <div
                                    key={policy.id}
                                    className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    {/* Policy Header (Clickable) */}
                                    <button
                                        onClick={() => togglePolicyExpansion(policy.id)}
                                        className="w-full text-left p-6 flex items-center justify-between cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                                    >
                                        <div className="flex items-center">
                                            {policy.icon}
                                            <div className="ml-4">
                                                <h3 className="text-xl font-semibold text-gray-900">{policy.type} <span className="text-gray-500 font-normal text-base">(Policy No: {policy.id})</span></h3>
                                                <div className={`inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium border ${getStatusClass(policy.status)}`}>
                                                    {policy.status === 'Active' && <CheckCircle size={14} className="mr-1" />}
                                                    {policy.status === 'Pending Activation' && <Clock size={14} className="mr-1" />}
                                                    {policy.status}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="text-lg font-bold text-[#FF7043]">{policy.premium}</p>
                                            {expandedPolicyId === policy.id ? (
                                                <ChevronUp size={24} className="text-gray-500 transition-transform duration-200" />
                                            ) : (
                                                <ChevronRight size={24} className="text-gray-500 transition-transform duration-200" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Policy Details (Expandable Content) */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            expandedPolicyId === policy.id ? 'max-h-screen opacity-100 p-6' : 'max-h-0 opacity-0 px-6'
                                        }`}
                                        style={{ transitionProperty: 'max-height, opacity, padding' }}
                                    >
                                        <div className="border-t border-gray-100 pt-6">
                                            <p className="text-gray-700 mb-4">
                                                <span className="font-medium text-gray-800">Provider:</span> {policy.provider}
                                                <br/>
                                                <span className="font-medium text-gray-800">Coverage:</span> {policy.coverage}
                                            </p>

                                            {policy.status === 'Active' && (
                                                <div className="mb-4 text-sm text-gray-700 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={16} className="text-gray-500" />
                                                        <span className="font-medium text-gray-800">Next Payment Due:</span> {policy.nextPayment}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={16} className="text-gray-500" />
                                                        <span className="font-medium text-gray-800">Policy Expires:</span> {policy.expiryDate}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mb-4 p-3 bg-white rounded-lg border border-gray-100 shadow-xs">
                                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                                    <List size={18} className="text-green-600" /> Key Benefits:
                                                </h4>
                                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
                                                    {policy.keyBenefits.map((benefit, idx) => (
                                                        <li key={idx}>{benefit}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="mb-4 p-3 bg-white rounded-lg border border-gray-100 shadow-xs">
                                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                                    <Gavel size={18} className="text-orange-600" /> Claim Process Summary:
                                                </h4>
                                                <p className="text-sm text-gray-700">{policy.claimProcessSummary}</p>
                                            </div>

                                            <div className="mb-6 p-3 bg-white rounded-lg border border-gray-100 shadow-xs">
                                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                                    <File size={18} className="text-blue-600" /> Important Documents:
                                                </h4>
                                                <ul className="text-sm text-blue-600 underline space-y-1">
                                                    {policy.documents.map((doc, idx) => (
                                                        <li key={idx}>
                                                            <a href={`/documents/${doc}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                                                                {doc}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                                <Link
                                                    to={`/policies/${policy.id}`} // Link to a hypothetical policy details page
                                                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-[#FF7043] text-white font-semibold rounded-lg shadow-md hover:bg-[#FF7043]/90 transition-colors transform hover:scale-[1.01]"
                                                >
                                                    <Info size={18} className="mr-2" /> More Policy Info
                                                </Link>
                                                {policy.status === 'Active' && (
                                                    <Link
                                                        to={`/claims/file?policyId=${policy.id}`} // Link to file claim for this policy
                                                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-[#FF7043] text-[#FF7043] font-semibold rounded-lg hover:bg-[#FF7043]/10 transition-colors transform hover:scale-[1.01]"
                                                    >
                                                        <FilePlus size={18} className="mr-2" /> File a Claim
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Understanding Micro-Insurance / FAQs Section */}
                    <div className="bg-[#F8FDF6] p-8 rounded-2xl border border-green-200 shadow-lg mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Lightbulb size={30} className="text-green-600" /> Understanding Micro-Insurance
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            New to micro-insurance? We've got you covered. Here are some common questions to help you understand how InsureLink works to protect your future.
                        </p>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => toggleFaqExpansion(index)}
                                        className="w-full text-left p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <HelpCircle size={20} className="text-[#FF7043]" /> {faq.question}
                                        </h3>
                                        {expandedFaqIndex === index ? (
                                            <ChevronUp size={20} className="text-gray-500 transition-transform duration-200" />
                                        ) : (
                                            <ChevronRight size={20} className="text-gray-500 transition-transform duration-200" />
                                        )}
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            expandedFaqIndex === index ? 'max-h-screen opacity-100 px-5 pb-5' : 'max-h-0 opacity-0 px-5'
                                        }`}
                                        style={{ transitionProperty: 'max-height, opacity, padding' }}
                                    >
                                        <p className="text-gray-700 leading-relaxed pt-2 border-t border-gray-100">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Link to="/contact-support" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors">
                                <HelpCircle size={20} className="mr-2" /> View All FAQs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Policies;