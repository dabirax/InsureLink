import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InsureLinkLogo from "../../assets/InsureLink.jpg";
import {
    Bell, User, ChevronDown, Search, DollarSign, CalendarDays, Download, Settings as SettingsIcon, LogOut, ReceiptText, Wallet, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

// --- Dummy Transaction Data (Updated: ALL Successful) ---
const initialDummyTransactions = [
    // Recent Payments (All Successful)
    { id: 'TRN-2025-07-001', date: '2025-07-28', type: 'Payment', description: 'Monthly Premium - Auto Policy ABC123', amount: 15000.00, status: 'Successful', policyId: 'POL-AUTO-ABC123', claimId: null },
    { id: 'TRN-2025-07-002', date: '2025-07-27', type: 'Payment', description: 'Quarterly Premium - Home Policy XYZ456', amount: 45000.00, status: 'Successful', policyId: 'POL-HOME-XYZ456', claimId: null },
    { id: 'TRN-2025-07-003', date: '2025-07-26', type: 'Payment', description: 'Health Plan Top-up - Health Policy GHI789', amount: 10000.00, status: 'Successful', policyId: 'POL-HEALTH-GHI789', claimId: null },
    { id: 'TRN-2025-07-004', date: '2025-07-25', type: 'Payment', description: 'Annual Premium - Life Policy JKL101', amount: 120000.00, status: 'Successful', policyId: 'POL-LIFE-JKL101', claimId: null },
    { id: 'TRN-2025-07-005', date: '2025-07-24', type: 'Payment', description: 'Policy Renewal - Travel Policy MNO202', amount: 8000.00, status: 'Successful', policyId: 'POL-TRAVEL-MNO202', claimId: null },

    // Recent Payouts (All Successful)
    { id: 'TRN-2025-07-006', date: '2025-07-23', type: 'Payout', description: 'Claim Payout - Auto Accident CLM-2025-001', amount: 150000.00, status: 'Successful', policyId: 'POL-AUTO-ABC123', claimId: 'CLM-2025-001' },
    { id: 'TRN-2025-07-007', date: '2025-07-21', type: 'Payout', description: 'Medical Reimbursement - Health Claim CLM-2025-002', amount: 45000.00, status: 'Successful', policyId: 'POL-HEALTH-GHI789', claimId: 'CLM-2025-002' },
    { id: 'TRN-2025-07-008', date: '2025-07-19', type: 'Payout', description: 'Home Repair Advance - Home Claim CLM-2025-003', amount: 250000.00, status: 'Successful', policyId: 'POL-HOME-XYZ456', claimId: 'CLM-2025-003' },

    // Older Payments/Payouts (All Successful)
    { id: 'TRN-2025-06-009', date: '2025-06-15', type: 'Payment', description: 'Monthly Premium - Auto Policy DEF321', amount: 15000.00, status: 'Successful', policyId: 'POL-AUTO-DEF321', claimId: null },
    { id: 'TRN-2025-06-010', date: '2025-06-01', type: 'Payout', description: 'Life Insurance Beneficiary CLM-2025-004', amount: 5000000.00, status: 'Successful', policyId: 'POL-LIFE-JKL101', claimId: 'CLM-2025-004' },
    { id: 'TRN-2025-05-011', date: '2025-05-20', type: 'Payment', description: 'Annual Premium - Business Policy RST654', amount: 300000.00, status: 'Successful', policyId: 'POL-BUSINESS-RST654', claimId: null },
    { id: 'TRN-2025-05-012', date: '2025-05-10', type: 'Payout', description: 'Travel Compensation CLM-2025-005', amount: 75000.00, status: 'Successful', policyId: 'POL-TRAVEL-MNO202', claimId: 'CLM-2025-005' },
];

const currentUser = {
    name: "John Doe",
    profilePicture: null,
};

const Transactions = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All'); // 'All', 'Payment', 'Payout'
    const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Successful' (removed Pending/Failed)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [transactions, setTransactions] = useState(initialDummyTransactions);

    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);

    // Calculate Summary Statistics
    const totalPayments = transactions
        .filter(t => t.type === 'Payment' && t.status === 'Successful')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalPayouts = transactions
        .filter(t => t.type === 'Payout' && t.status === 'Successful')
        .reduce((sum, t) => sum + t.amount, 0);

    const numberOfTransactions = transactions.length;

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (transaction.policyId && transaction.policyId.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (transaction.claimId && transaction.claimId.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesType = filterType === 'All' || transaction.type === filterType;
        // Status filter now only checks for 'Successful' if filterStatus is 'Successful'
        const matchesStatus = filterStatus === 'All' || transaction.status === filterStatus;

        const transactionDate = new Date(transaction.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const matchesDateRange = (!start || transactionDate >= start) && (!end || transactionDate <= end);

        return matchesSearch && matchesType && matchesStatus && matchesDateRange;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

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

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return 'N/A';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const getStatusBadgeClass = (status) => {
        // Since we've removed 'Failed' and 'Pending' from data and filters,
        // all displayed transactions should be 'Successful'.
        switch (status) {
            case 'Successful': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700'; // Fallback, should ideally not be hit.
        }
    };

    // --- UPDATED handleDownloadStatement function ---
    const handleDownloadStatement = () => {
        if (filteredTransactions.length === 0) {
            alert('No transactions to download.');
            return;
        }

        // Define CSV headers
        const headers = [
            'Transaction ID', 'Date', 'Type', 'Description', 'Amount (NGN)',
            'Status', 'Related Policy ID', 'Related Claim ID'
        ].join(',');

        // Map transactions to CSV rows
        const csvRows = filteredTransactions.map(t => {
            const values = [
                `"${t.id}"`, // Enclose in quotes to handle commas if present in ID (good practice)
                `"${new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}"`,
                `"${t.type}"`,
                `"${t.description.replace(/"/g, '""')}"`, // Escape double quotes within description
                `${t.amount !== null ? t.amount.toFixed(2) : 'N/A'}`, // Ensure amount is number and formatted
                `"${t.status}"`,
                `"${t.policyId || 'N/A'}"`,
                `"${t.claimId || 'N/A'}"`
            ];
            return values.join(',');
        });

        // Combine headers and rows
        const csvContent = [headers, ...csvRows].join('\n');

        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger download
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'InsureLink_Transaction_Statement.csv'); // Suggested filename
        link.style.visibility = 'hidden'; // Hide the link

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);

        alert('Your transaction statement has been downloaded!');
    };

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
                    <Link to="/" className={`${getNavLinkClass('/')} font-medium`}>Dashboard</Link>
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

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-8 lg:px-24">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0 flex items-center">
                        <ReceiptText size={32} className="text-[#FF7043] mr-3" /> My Transactions
                    </h1>
                    <button
                        onClick={handleDownloadStatement}
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors cursor-pointer shadow-md flex items-center"
                    >
                        <Download size={20} className="mr-2" />
                        Download Statement
                    </button>
                </div>
                <p className="text-gray-600 text-lg mb-2">A clear and comprehensive overview of all your financial activities with InsureLink.</p>
                {/* Boasting Point */}
                <p className="text-xl font-semibold text-[#FF7043] flex items-center mb-10">
                    <Wallet size={24} className="mr-2" />
                    Experience secure, transparent, and effortlessly managed transactions, always.
                </p>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-[#E2E8F0] flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Payments</p>
                            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayments)}</h3>
                        </div>
                        <ArrowUpRight size={28} className="text-green-500" />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-[#E2E8F0] flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Payouts</p>
                            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayouts)}</h3>
                        </div>
                        <ArrowDownLeft size={28} className="text-blue-500" />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-[#E2E8F0] flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Transactions Count</p>
                            <h3 className="text-2xl font-bold text-gray-900">{numberOfTransactions}</h3>
                        </div>
                        <ReceiptText size={28} className="text-gray-500" />
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-[#E2E8F0] mb-8">
                    <div className="relative mb-6">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Transaction ID, Description, Policy/Claim ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 text-base"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 border-t border-gray-100 pt-5 mt-5">
                        {/* Filter by Type */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type:</label>
                            <div className="flex flex-wrap gap-2">
                                {['All', 'Payment', 'Payout'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer shadow-sm
                                            ${filterType === type
                                                ? 'bg-[#FF7043] text-white hover:bg-[#E55A35]'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter by Status (Now only 'All' and 'Successful') */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Status:</label>
                            <div className="flex flex-wrap gap-2">
                                {['All', 'Successful'].map((status) => ( // Removed 'Pending', 'Failed'
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer shadow-sm
                                            ${filterStatus === status
                                                ? 'bg-[#FF7043] text-white hover:bg-[#E55A35]'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Range Filter */}
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">From Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">To Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-all duration-200 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-[#E2E8F0] overflow-x-auto custom-scrollbar">
                    {filteredTransactions.length === 0 ? (
                        <p className="text-center text-gray-500 py-10 text-lg">No transactions found matching your criteria.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount (NGN)
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Related Policy
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Related Claim
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTransactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer animate-fade-in"
                                        onClick={() => alert(`Transaction Details:\nID: ${transaction.id}\nType: ${transaction.type}\nAmount: ${formatCurrency(transaction.amount)}\nStatus: ${transaction.status}\nDescription: ${transaction.description}`)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div className="flex items-center">
                                                <CalendarDays size={16} className="text-gray-400 mr-2" />
                                                {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {transaction.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded ${transaction.type === 'Payment' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-600 max-w-xs leading-relaxed">
                                            {transaction.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-base font-bold text-gray-900">
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {transaction.policyId || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {transaction.claimId || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;