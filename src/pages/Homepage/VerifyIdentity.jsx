// src/pages/Settings/VerifyIdentity.jsx

import React, { useState } from 'react';
import { ShieldCheck, Mail, Trash2 } from 'lucide-react'; // Re-importing necessary icons

// You might need to import your Navbar component separately if this is a standalone page
// For the purpose of this component alone, I'll assume it will either be rendered
// within a layout that already includes a Navbar, or you will integrate it yourself.
// If you want a full page with Navbar, let me know, and I can wrap it.

const VerifyIdentity = () => {
    const [nin, setNin] = useState('');
    const [bvn, setBvn] = useState('');
    const [utilityBill, setUtilityBill] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleFileChange = (e, setFile) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMessage(''); // Clear previous messages
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        // Basic validation
        if (!nin || !bvn || !utilityBill || !profilePicture) {
            setMessage('Please fill in all required fields and upload all documents.');
            setMessageType('error');
            setLoading(false);
            return;
        }

        // Dummy API call to simulate submission
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate success or failure (70% chance of success)
            const success = Math.random() > 0.3;

            if (success) {
                setMessage('Identity verification documents submitted successfully! We will review them shortly.');
                setMessageType('success');
                // Clear form fields on success
                setNin('');
                setBvn('');
                setUtilityBill(null);
                setProfilePicture(null);
                // Note: Clearing file input values visually can be tricky with direct DOM manipulation,
                // often better handled by resetting the form or using a ref for the input.
                // For this example, setting the state to null conceptually clears it.
            } else {
                setMessage('Submission failed. Please try again or contact support.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('An unexpected error occurred. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    // Helper component for file upload input fields
    const FileUploadInput = ({ label, id, file, setFile }) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-[#FF7043] transition-colors">
                <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor={id}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#FF7043] hover:text-[#E65C2B] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#FF7043]"
                        >
                            <span>Upload a file</span>
                            <input id={id} name={id} type="file" className="sr-only" onChange={(e) => handleFileChange(e, setFile)} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                        {file ? file.name : 'PNG, JPG, PDF up to 10MB'}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFBF9] font-poppins text-gray-800 flex items-center justify-center py-12">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-2xl w-full mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <ShieldCheck size={28} className="text-[#FF7043] mr-3" /> Verify Your Identity
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                    To ensure the security of your account and access to all features, please provide the following information.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">National Identification Number (NIN)</label>
                        <input
                            type="text"
                            id="nin"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF7043] focus:border-[#FF7043] transition-colors"
                            placeholder="e.g., 12345678901"
                            value={nin}
                            onChange={(e) => setNin(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="bvn" className="block text-sm font-medium text-gray-700 mb-1">Bank Verification Number (BVN)</label>
                        <input
                            type="text"
                            id="bvn"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF7043] focus:border-[#FF7043] transition-colors"
                            placeholder="e.g., 1234567890"
                            value={bvn}
                            onChange={(e) => setBvn(e.target.value)}
                            required
                        />
                    </div>

                    <FileUploadInput
                        label="Upload Utility Bill for Address Verification (PNG, JPG, PDF)"
                        id="utility-bill"
                        file={utilityBill}
                        setFile={setUtilityBill}
                    />

                    <FileUploadInput
                        label="Upload Clear Profile Picture (PNG, JPG)"
                        id="profile-picture"
                        file={profilePicture}
                        setFile={setProfilePicture}
                    />

                    {message && (
                        <div className={`p-3 rounded-lg text-sm ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Your information is securely encrypted and will not be shared with third parties.
                    </p>

                    <div className="pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            className="w-full bg-[#FF7043] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF7043]/90 transition-colors shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <ShieldCheck size={18} className="mr-2" />
                            )}
                            {loading ? 'Submitting...' : 'Verify'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyIdentity;