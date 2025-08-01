import React, { useState, useRef, useEffect } from 'react'; // Added useRef, useEffect
import { Link, useLocation } from 'react-router-dom'; // Added Link, useLocation
import InsureLinkLogo from '../../InsureLink.jpg'; // Import the logo image
import {
    Bell,
    ChevronDown,
    MessageCircle,
    Phone,
    FileText,
    CreditCard,
    Shield,
    Search,
    Settings as SettingsIcon, // Renamed to avoid conflict with local 'Settings'
    LogOut,
    User,
    HelpCircle,
    Clock,
    Mail,
    ArrowRight,
    Star,
    Users,
    Award
} from 'lucide-react';
// Dummy user data for the consistent navbar
const currentUser = {
    name: "John Doe",
    profilePicture: null, // You can put a path to a profile picture here if available
};
const ContactSupport = () => {
    const location = useLocation(); // For consistent navbar link highlighting
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Changed from showProfileMenu
    const dropdownRef = useRef(null); // Ref for the dropdown menu
    const profileButtonRef = useRef(null); // Ref for the profile button
    // Helper function for consistent navbar link styling
    const getNavLinkClass = (path) =>
        location.pathname === path
            ? 'text-[#FF7043] border-b-2 border-[#FF7043] pb-1'
            : 'text-gray-600 hover:text-[#FF7043] transition-colors';
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
    const faqData = [
        {
            id: 1,
            question: "How do I file a claim?",
            answer: "To file a claim, navigate to the 'Claims' section in the app and follow the step-by-step instructions. You will need to provide details about the incident, upload any necessary documents, and submit the claim for review. Our team will process your claim within 24-48 hours."
        },
        {
            id: 2,
            question: "What is my policy coverage?",
            answer: "Your policy coverage depends on the specific plan you've selected. You can view detailed coverage information in the 'My Policies' section. This includes coverage limits, deductibles, and what events are covered under your plan. For micro-insurance plans, coverage typically ranges from ₦50,000 to ₦500,000."
        },
        {
            id: 3,
            question: "How can I update my payment information?",
            answer: "You can update your payment information by going to Settings > Payment Methods. We accept Opay cards, Moniepoint cards, and direct account transfers. Simply add your new payment method and set it as your default for future premium payments."
        },
        {
            id: 4,
            question: "What happens if I miss a premium payment?",
            answer: "If you miss a premium payment, you'll have a 30-day grace period to make the payment. During this time, your coverage remains active. After the grace period, your policy may be suspended until payment is received. We'll send you notifications via SMS and email before any suspension occurs."
        },
        {
            id: 5,
            question: "How do I cancel my policy?",
            answer: "To cancel your policy, please contact our support team through live chat or call us directly. We'll guide you through the cancellation process and inform you about any applicable fees or refunds. Note that some policies may have minimum commitment periods."
        },
        {
            id: 6,
            question: "What are your business hours?",
            answer: "Our support team is available 24/7 to assist you. Live chat and phone support are available around the clock, and we typically respond to emails within 2 hours during business days."
        },
        {
            id: 7,
            question: "How secure is my personal information?",
            answer: "We use bank-level encryption and security measures to protect your data. All personal and financial information is encrypted and stored securely. We comply with international data protection standards and never share your information with third parties without consent."
        },
        {
            id: 8,
            question: "Can I upgrade or downgrade my policy?",
            answer: "Yes, you can modify your policy at any time. Go to 'My Policies' and select 'Modify Coverage'. Changes typically take effect on your next billing cycle, and we'll notify you of any premium adjustments."
        }
    ];
    const supportResources = [
        {
            icon: FileText,
            title: "Policy Documents",
            description: "Access your policy documents, terms and conditions",
            link: "/policies"
        },
        {
            icon: CreditCard,
            title: "Payment Information",
            description: "Manage your payment methods and billing history",
            link: "/payments"
        },
        {
            icon: Shield,
            title: "Security FAQs",
            description: "Learn about our security measures and data protection",
            link: "/security"
        },
        {
            icon: HelpCircle,
            title: "Claims Guide",
            description: "Step-by-step guide to filing and tracking claims",
            link: "/claims-guide"
        },
        {
            icon: Mail,
            title: "Contact Forms",
            description: "Submit detailed inquiries and feedback",
            link: "/contact-forms"
        },
        {
            icon: Clock,
            title: "Service Status",
            description: "Check current system status and maintenance updates",
            link: "/status"
        }
    ];
    // Updated quickActions with correct links
    const quickActions = [
        { title: "Update Profile", icon: User, link: "/profile" },
        { title: "View Policies", icon: Shield, link: "/policies" },
        { title: "Make Payment", icon: CreditCard, link: "/payment-page" },
        { title: "File Claim", icon: FileText, link: "/claims" }
    ];
    const testimonials = [
        {
            name: "Adebayo Ogundimu",
            role: "Small Business Owner",
            rating: 5,
            comment: "InsureLink's support team resolved my claim in just 2 days. Excellent service and very professional staff."
        },
        {
            name: "Fatima Hassan",
            role: "Restaurant Owner",
            rating: 5,
            comment: "The 24/7 chat support is amazing. They helped me understand my policy coverage at 11 PM on a Sunday!"
        },
        {
            name: "Chinedu Okoro",
            role: "Tech Startup Founder",
            rating: 5,
            comment: "Best insurance experience I've had in Nigeria. Clear communication and fair pricing."
        }
    ];
    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const toggleFAQ = (id) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };
    const handleStartChat = () => {
        window.location.href = '/chatbot';
    };
    const handleNotificationClick = () => {
        console.log('Navigating to notifications...');
        // In a real app, you would navigate to a notifications page
        // For now, let's alert:
        alert('You have 3 new notifications!');
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {/* Consistent Navbar */}
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
            {/* Main Content */}
            <div className="relative">
                {/* Hero Section - Full Width */}
                <div className="bg-white text-gray-900 relative overflow-hidden border-b border-gray-200">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF7043]/5 to-[#E55A35]/5"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-[#FF7043]/30 rounded-full blur-xl"></div>
                        <div className="absolute top-32 right-20 w-32 h-32 bg-[#FF7043]/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-[#FF7043]/25 rounded-full blur-xl"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                                    Contact Support
                                </h1>
                                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                    Get in touch with our expert Support team for assistance with your policies, claims, or payments. We're here to help 24/7.
                                </p>

                                {/* Support Options */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <button
                                        onClick={handleStartChat}
                                        className="flex items-center justify-center space-x-2 bg-[#FF7043] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#E55A35] transition-all cursor-pointer shadow-lg transform hover:scale-105"
                                    >
                                        <MessageCircle size={20} />
                                        <span>Start a Chat</span>
                                    </button>
                                    <button className="flex items-center justify-center space-x-2 bg-transparent border-2 border-[#FF7043] text-[#FF7043] px-8 py-4 rounded-xl font-semibold hover:bg-[#FF7043] hover:text-white transition-all cursor-pointer transform hover:scale-105">
                                        <Phone size={20} />
                                        <span>Request a Call</span>
                                    </button>
                                </div>
                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-1 text-[#FF7043]">2 min</div>
                                        <div className="text-sm text-gray-600">Avg Response</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-1 text-[#FF7043]">24/7</div>
                                        <div className="text-sm text-gray-600">Support</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-1 text-[#FF7043]">98%</div>
                                        <div className="text-sm text-gray-600">Satisfaction</div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions Sidebar */}
                            <div className="lg:pl-8">
                                <h3 className="text-xl font-semibold mb-6 text-gray-900">Quick Actions</h3>
                                <div className="space-y-4">
                                    {quickActions.map((action, index) => {
                                        const IconComponent = action.icon;
                                        return (
                                            <Link
                                                key={index}
                                                to={action.link} // Use Link component with 'to' prop
                                                className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all cursor-pointer border border-gray-200"
                                            >
                                                <div className="p-2 bg-[#FF7043]/10 rounded-lg">
                                                    <IconComponent size={18} className="text-[#FF7043]" />
                                                </div>
                                                <span className="font-medium text-gray-900">{action.title}</span>
                                                <ArrowRight size={16} className="ml-auto text-gray-400" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* FAQ Section - Takes up 2 columns */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                                        Frequently Asked Questions
                                    </h2>

                                    {/* Search FAQ */}
                                    <div className="relative w-full sm:w-80">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search FAQs..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent bg-gray-50 cursor-text"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                    {filteredFAQs.map((faq) => (
                                        <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all">
                                            <button
                                                onClick={() => toggleFAQ(faq.id)}
                                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                                <ChevronDown
                                                    size={20}
                                                    className={`text-[#FF7043] transition-transform cursor-pointer ${
                                                        expandedFAQ === faq.id ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>
                                            {expandedFAQ === faq.id && (
                                                <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-white">
                                                    <p className="text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {filteredFAQs.length === 0 && (
                                    <div className="text-center py-12">
                                        <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
                                    </div>
                                )}
                            </div>
                            {/* Customer Testimonials Section - Added to fill space */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">What Our Customers Say</h3>
                                    <div className="flex items-center space-x-2 text-yellow-500">
                                        <Star size={20} fill="currentColor" />
                                        <span className="text-gray-900 font-semibold">4.9/5</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {testimonials.map((testimonial, index) => (
                                        <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                                </div>
                                                <div className="flex space-x-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star key={i} size={16} className="text-yellow-500" fill="currentColor" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-gradient-to-r from-[#FF7043]/10 to-[#E55A35]/10 rounded-xl border border-[#FF7043]/20">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-1">
                                            <Users size={18} className="text-[#FF7043]" />
                                            <span className="text-sm font-medium text-gray-900">10,000+ satisfied customers</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-300"></div>
                                        <div className="flex items-center space-x-1">
                                            <Award size={18} className="text-[#FF7043]" />
                                            <span className="text-sm font-medium text-gray-900">Best Insurance App 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Support Resources Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Support Resources</h3>
                                <div className="space-y-4">
                                    {supportResources.map((resource, index) => {
                                        const IconComponent = resource.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="group p-4 border border-gray-200 rounded-xl hover:border-[#FF7043] hover:bg-[#FF7043]/5 hover:shadow-lg transition-all cursor-pointer bg-gray-50"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className="p-2 bg-[#FF7043]/10 rounded-lg group-hover:bg-[#FF7043]/20 transition-colors">
                                                        <IconComponent size={18} className="text-[#FF7043]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                                                        <p className="text-gray-600 text-sm leading-relaxed">
                                                            {resource.description}
                                                        </p>
                                                    </div>
                                                    <ArrowRight size={16} className="text-gray-400 group-hover:text-[#FF7043] transition-colors" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Contact Information Card */}
                            <div className="bg-gradient-to-br from-[#FF7043] to-[#E55A35] rounded-2xl p-6 text-white shadow-xl border border-[#FF7043]/30">
                                <h3 className="text-xl font-bold mb-4">Need More Help?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                                        <div className="p-1 bg-white/20 rounded">
                                            <Mail size={16} className="text-white" />
                                        </div>
                                        <span className="text-sm">support@insurelink.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                                        <div className="p-1 bg-white/20 rounded">
                                            <Phone size={16} className="text-white" />
                                        </div>
                                        <span className="text-sm">+234 800 123 4567</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-1 bg-white/20 rounded">
                                            <Clock size={16} className="text-white" />
                                        </div>
                                        <span className="text-sm">24/7 Support Available</span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-white text-[#FF7043] hover:bg-gray-50 py-3 rounded-lg font-semibold transition-all cursor-pointer">
                                    Contact Us Directly
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Full-width Section */}
                <div className="bg-[#E2E8F0] border-t border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Still Have Questions?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Our dedicated support team is always ready to help. Get personalized assistance for your insurance needs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div
                                onClick={handleStartChat}
                                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-[#FF7043]/10 group-hover:bg-[#FF7043]/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                                    <MessageCircle className="text-[#FF7043]" size={24} />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Chat with AI Assistant</h3>
                                <p className="text-gray-600 text-sm">Get instant help from our intelligent chatbot</p>
                            </div>

                            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group">
                                <div className="w-12 h-12 bg-[#FF7043]/10 group-hover:bg-[#FF7043]/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                                    <Phone className="text-[#FF7043]" size={24} />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                                <p className="text-gray-600 text-sm">Speak directly with our experts</p>
                            </div>

                            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group">
                                <div className="w-12 h-12 bg-[#FF7043]/10 group-hover:bg-[#FF7043]/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                                    <Mail className="text-[#FF7043]" size={24} />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                                <p className="text-gray-600 text-sm">Send us detailed inquiries via email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #FF7043;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #E55A35;
                }
            `}</style>
        </div>
    );
};
export default ContactSupport;