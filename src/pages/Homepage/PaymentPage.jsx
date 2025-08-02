import React, { useState, useEffect, useRef } from "react";
import InsureLinkLogo from "../../assets/InsureLink.jpg";
import OpayLogo from "../../assets/opay.png";
import MoniepointLogo from "../../assets/moniepoint.png";
import {
  Shield, ArrowLeft, CreditCard, Smartphone, Building, Calendar,
  CheckCircle, Star, Lock, Zap, TrendingUp, Award, Users,
  Info, AlertCircle, Gift, Sparkles, Crown, Heart, Target,
  Phone, Mail, MessageCircle, FileText, Download, RefreshCw,
  ChevronRight, Plus, Minus, Eye, EyeOff, Copy, Check, Edit3,
  Trash2, Save
} from 'lucide-react';

// Import images - these will be handled properly in the component


const PaymentPage = () => {
  const [subscriptionStep, setSubscriptionStep] = useState('form'); // 'form', 'processing', 'success'
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 809 876 5432',
    businessName: 'Doe\'s Electronics Ltd'
  });
  const [formData, setFormData] = useState({
    amount: '500',
    frequency: 'Monthly',
    startDate: '',
    endDate: '',
    paymentMethod: 'opay', // Default to OPay, as per the first option
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveMethod: false, // Renamed from saveCard for generality
    bankAccount: '',
    accountName: '',
    bankName: '',
    ussdCode: '',
    editingAccount: false,
    currentEditingMethodId: null, // To track which saved method is being edited
    newMethodType: null, // To track which new method type form is active (card, transfer, ussd)
  });
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    {
      id: 'opay-1',
      type: 'opay',
      name: 'John Doe OPay',
      accountNumber: '****5673',
      isDefault: true,
      logo: OpayLogo
    },
    {
      id: 'moniepoint-1',
      type: 'moniepoint',
      name: 'Business Account',
      accountNumber: '****8942',
      isDefault: false,
      logo: MoniepointLogo
    }
  ]);
  const [showCvv, setShowCvv] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [downloadingPolicy, setDownloadingPolicy] = useState(false);

  // useRef to store the policy number so it doesn't regenerate
  const policyNumberRef = useRef(null);

  // Generate policy number only once
  if (!policyNumberRef.current) {
    policyNumberRef.current = `IL-2025-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }

  // Auto-populate dates
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    setFormData(prev => ({
      ...prev,
      startDate: formatDate(today),
      endDate: formatDate(nextMonth)
    }));
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Protection',
      price: '350',
      description: 'Essential coverage for small businesses',
      features: ['Fire & Theft Protection', 'Basic Health Coverage', 'WhatsApp Support', '24/7 Claims Processing'],
      color: 'from-blue-500 to-blue-600',
      popular: false,
      coverage: '₦2,500,000'
    },
    {
      id: 'professional',
      name: 'Professional Shield',
      price: '500',
      description: 'Comprehensive protection for growing SMEs',
      features: ['All Basic Features', 'Equipment Coverage', 'Business Interruption', 'Priority Support', 'AI Risk Analysis'],
      color: 'from-[#FF7043] to-orange-500',
      popular: true,
      coverage: '₦5,000,000'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Guard',
      price: '750',
      description: 'Complete protection suite for established businesses',
      features: ['All Professional Features', 'Cyber Security Insurance', 'Director\'s Liability', 'Dedicated Account Manager', 'Custom Policies'],
      color: 'from-purple-500 to-purple-600',
      popular: false,
      coverage: '₦10,000,000'
    }
  ];

  const benefits = [
    { icon: Shield, title: 'Instant Coverage', desc: 'Protection starts immediately after payment confirmation' },
    { icon: Zap, title: 'AI-Powered Claims', desc: 'Claims processed in under 24 hours via WhatsApp' },
    { icon: Award, title: 'Trusted by 50K+ SMEs', desc: 'Join Nigeria\'s leading business protection platform' },
    { icon: Users, title: 'Expert Support', desc: '24/7 multilingual customer support team' }
  ];

  const testimonials = [
    {
      name: 'Adebayo Ogundimu',
      business: 'Ogundimu Electronics',
      location: 'Lagos',
      rating: 5,
      text: 'InsureLink saved my business when fire damaged my shop. Claims were processed in 18 hours!',
      avatar: 'AO'
    },
    {
      name: 'Fatima Abdullahi',
      business: 'Fatima\'s Fashion House',
      location: 'Kano',
      rating: 5,
      text: 'The AI recommendations helped me save ₦200K annually while getting better coverage.',
      avatar: 'FA'
    }
  ];

  const getCurrentPlan = () => {
    return plans.find(p => p.id === selectedPlan) || plans[1];
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlanSelect = (planId) => {
    const plan = plans.find(p => p.id === planId);
    setSelectedPlan(planId);
    setFormData(prev => ({
      ...prev,
      amount: plan.price
    }));
  };

  const handleSaveNewPaymentMethod = () => {
    let newMethod = null;
    let methodType = formData.paymentMethod;

    if (formData.currentEditingMethodId) {
      // Update existing method
      setSavedPaymentMethods(prevMethods => prevMethods.map(method => {
        if (method.id === formData.currentEditingMethodId) {
          if (method.type === 'card') {
            return {
              ...method,
              name: formData.nameOnCard || 'Credit Card',
              accountNumber: `****${formData.cardNumber.slice(-4)}`,
            };
          } else if (method.type === 'bank' || method.type === 'opay' || method.type === 'moniepoint') {
            return {
              ...method,
              name: formData.accountName || method.name,
              accountNumber: `****${formData.bankAccount.slice(-4)}`,
              bankName: formData.bankName || method.bankName,
            };
          }
        }
        return method;
      }));
      setFormData(prev => ({ ...prev, currentEditingMethodId: null, newMethodType: null })); // Clear editing state
      return;
    }

    // Add new method
    if (methodType === 'card' && formData.cardNumber && formData.nameOnCard) {
      newMethod = {
        id: `card-${Date.now()}`,
        type: 'card',
        name: formData.nameOnCard,
        accountNumber: `****${formData.cardNumber.slice(-4)}`,
        isDefault: false,
        logo: null
      };
    } else if (methodType === 'transfer' && formData.bankAccount && formData.accountName && formData.bankName) {
      newMethod = {
        id: `bank-${Date.now()}`,
        type: 'bank',
        name: formData.accountName,
        accountNumber: `****${formData.bankAccount.slice(-4)}`,
        bankName: formData.bankName,
        isDefault: false,
        logo: null
      };
    } else if (methodType === 'opay' && formData.bankAccount && formData.accountName) {
      newMethod = {
        id: `opay-${Date.now()}`,
        type: 'opay',
        name: formData.accountName,
        accountNumber: `****${formData.bankAccount.slice(-4)}`,
        isDefault: false,
        logo: OpayLogo
      };
    } else if (methodType === 'moniepoint' && formData.bankAccount && formData.accountName) {
      newMethod = {
        id: `moniepoint-${Date.now()}`,
        type: 'moniepoint',
        name: formData.accountName,
        accountNumber: `****${formData.bankAccount.slice(-4)}`,
        isDefault: false,
        logo: MoniepointLogo
      };
    }

    if (newMethod) {
      setSavedPaymentMethods(prev => [...prev, newMethod]);
      setFormData(prev => ({
        ...prev,
        paymentMethod: newMethod.id, // Select the newly added method
        newMethodType: null, // Hide the new method form
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        bankAccount: '',
        accountName: '',
        bankName: '',
        ussdCode: '',
        saveMethod: false,
      }));
    }
  };


  const handleSubscribe = async () => {
    setSubscriptionStep('processing');
    setProcessing(true);
    // Simulate processing time with realistic steps
    setTimeout(() => {
      setProcessing(false);
      setSubscriptionStep('success');
    }, 4000);
  };

  const handleDownloadPolicy = () => {
    setDownloadingPolicy(true);
    // Simulate download process and create a dummy PDF
    setTimeout(() => {
      const dummyPdfContent = `
        Policy Document for ${userDetails.businessName}
        Policy Number: ${policyNumberRef.current}
        Plan: ${getCurrentPlan().name}
        Coverage: ${getCurrentPlan().coverage}
        Premium: ₦${formData.amount}/${formData.frequency}
        Start Date: ${formData.startDate}
        End Date: ${formData.endDate}

        This is a dummy policy document for demonstration purposes.
        Thank you for choosing InsureLink!
      `;
      const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `InsureLink_Policy_${policyNumberRef.current}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadingPolicy(false);
      console.log('Policy downloaded');
    }, 2000);
  };

  const PaymentMethodOption = ({ id, icon, title, subtitle, account, isSelected, onClick, onEdit, onDelete, canEdit = false }) => (
    <div
      className={`flex items-center justify-between p-5 border-2 rounded-xl transition-all cursor-pointer w-full ${
        isSelected
          ? 'border-[#FF7043] bg-orange-50 ring-2 ring-[#FF7043]/20'
          : 'border-slate-200 hover:border-slate-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isSelected ? 'bg-[#FF7043]/10' : 'bg-slate-100'
        }`}>
          {icon}
        </div>
        <div className="text-left">
          <p className="font-semibold text-slate-900 text-lg">{title}</p>
          <p className="text-slate-600 text-base">{subtitle}</p>
          {account && (
            <p className="text-slate-500 text-sm mt-1">{account}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isSelected && (
          <CheckCircle className="w-6 h-6 text-[#FF7043]" />
        )}
        {canEdit && (
          <div className="flex gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit();
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const handleEditSavedMethod = (method) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method.id, // Set the selected method to the one being edited
      currentEditingMethodId: method.id,
      newMethodType: method.type, // Show the relevant form
      cardNumber: method.type === 'card' ? method.accountNumber.replace('****', '') : '',
      expiryDate: method.type === 'card' ? 'MM/YY' : '', // Placeholder, as expiry isn't saved
      cvv: '', // CVV is never saved
      nameOnCard: method.type === 'card' ? method.name : '',
      bankAccount: (method.type === 'bank' || method.type === 'opay' || method.type === 'moniepoint') ? method.accountNumber.replace('****', '') : '',
      accountName: (method.type === 'bank' || method.type === 'opay' || method.type === 'moniepoint') ? method.name : '',
      bankName: method.type === 'bank' ? method.bankName : '',
      ussdCode: '',
      saveMethod: false, // Don't auto-check save when editing
      editingAccount: true, // Force edit mode for OPay/Moniepoint/Bank
    }));
  };

  const handleSelectNewPaymentMethodType = (type) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: type, // Select the new type for the radio
      newMethodType: type, // Show the form for this type
      currentEditingMethodId: null, // Clear any editing state
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
      bankAccount: '',
      accountName: '',
      bankName: '',
      ussdCode: '',
      saveMethod: false,
      editingAccount: false, // Reset editing account for new selection
    }));
  };


  if (subscriptionStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto flex items-center justify-center animate-pulse">
              <img
                src={InsureLinkLogo}
                alt="InsureLink"
                className="w-full h-full object-contain" // Significantly larger
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-20 h-20 bg-white rounded-full hidden items-center justify-center">
                <span className="text-[#FF7043] font-bold text-sm">IL</span>
              </div>
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-[#FF7043] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Securing Your Business</h2>
          <p className="text-slate-600 mb-6 text-lg">Processing your payment and activating your protection...</p>
          <p className="text-slate-500 mb-8 text-base">This usually takes 30-60 seconds. Please don't close this window.</p>
          <div className="space-y-4 text-left">
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-6 h-6 mr-3" />
              <span className="text-lg">Payment verified successfully</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-6 h-6 mr-3" />
              <span className="text-lg">Policy documents generated</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-6 h-6 mr-3" />
              <span className="text-lg">Risk assessment completed</span>
            </div>
            <div className="flex items-center text-orange-500 animate-pulse">
              <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
              <span className="text-lg">Activating your coverage...</span>
            </div>
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-800 text-base">
              <strong>Next:</strong> You'll receive a welcome email with your policy details and a WhatsApp message to join our support community.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (subscriptionStep === 'success') {
    const currentPlan = getCurrentPlan();
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <div className="w-28 h-28 mx-auto bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
              <div className="absolute inset-0 w-28 h-28 mx-auto bg-emerald-200 rounded-full animate-ping opacity-20"></div>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">  🎉  Welcome to InsureLink!</h1>
            <p className="text-2xl text-slate-600 mb-3">Hi {userDetails.name}, your business is now fully protected</p>
            <p className="text-slate-500 text-xl">Policy activated instantly • Coverage effective immediately</p>
            <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-medium">
              <Shield className="w-5 h-5" />
              Protection Status: ACTIVE
            </div>
          </div>
          {/* Success Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Policy Summary */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl"> {/* Removed orange background */}
                  <img
                    src={InsureLinkLogo}
                    alt="InsureLink"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-10 h-10 bg-white rounded-lg hidden items-center justify-center">
                    <span className="text-[#FF7043] font-bold text-xs">IL</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Policy Activated</h2>
                  <p className="text-slate-600 text-xl">Your {currentPlan.name} is now live and active</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Policy Holder Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600 text-sm">Name</p>
                    <p className="font-semibold text-slate-900">{userDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Business</p>
                    <p className="font-semibold text-slate-900">{userDetails.businessName}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Email</p>
                    <p className="font-semibold text-slate-900">{userDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Phone</p>
                    <p className="font-semibold text-slate-900">{userDetails.phone}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-slate-600 text-lg mb-2">Policy Number</p>
                  <p className="font-bold text-slate-900 text-xl">{policyNumberRef.current}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-slate-600 text-lg mb-2">Coverage Amount</p>
                  <p className="font-bold text-[#FF7043] text-xl">{currentPlan.coverage}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-slate-600 text-lg mb-2">Monthly Premium</p>
                  <p className="font-bold text-slate-900 text-xl">₦{formData.amount}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-slate-600 text-lg mb-2">Next Payment</p>
                  <p className="font-bold text-slate-900 text-xl">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={handleDownloadPolicy}
                disabled={downloadingPolicy}
                className="w-full bg-gradient-to-r from-[#FF7043] to-orange-500 text-white py-5 rounded-xl font-bold text-xl hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-3">
                  {downloadingPolicy ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Preparing Download...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Download Policy Documents
                    </>
                  )}
                </div>
              </button>
              <p className="text-center text-slate-500 text-base mt-3">
                Your policy certificate, terms, and coverage details will be downloaded as PDF
              </p>
            </div>
            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-5">Get Started</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-lg">Download App</p>
                        <p className="text-slate-600 text-base">Manage policies on-the-go</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-lg">Join WhatsApp</p>
                        <p className="text-slate-600 text-base">Instant support & updates</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-lg">Book Consultation</p>
                        <p className="text-slate-600 text-base">Free risk assessment</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Next Steps */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-xl">Check Your Email</h3>
                <p className="text-slate-600 text-lg">Policy documents and welcome guide sent to your inbox within 5 minutes</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-xl">Welcome Call</h3>
                <p className="text-slate-600 text-lg">Our team will call within 24 hours to onboard you and answer questions</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-xl">Risk Assessment</h3>
                <p className="text-slate-600 text-lg">Free business risk analysis scheduled within 7 days</p>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                Go to Dashboard
              </div>
            </button>
            <p className="text-slate-500 text-lg mt-4">
              Manage your policies, file claims, and track coverage from your dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20"> {/* Increased height */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-500 hover:text-[#FF7043] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                {/* Removed orange container, increased logo size */}
                <img
                  src={InsureLinkLogo}
                  alt="InsureLink"
                  className="w-16 h-16 object-contain" // Significantly larger
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-16 h-16 bg-white rounded-lg hidden items-center justify-center">
                  <span className="text-[#FF7043] font-bold text-xl">IL</span> {/* Adjusted text size for larger placeholder */}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">InsureLink</h1>
                  <p className="text-sm text-slate-500 -mt-1">Secure Payment</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-base text-slate-600">256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Choose Your <span className="text-[#FF7043]">Protection Plan</span>
          </h1>
          <p className="text-2xl text-slate-600 mb-3">Join 50,000+ Nigerian SMEs already protected by InsureLink</p>
          <p className="text-slate-500 text-xl">Trusted • Transparent • Instant Coverage</p>
        </div>

        {/* Plans Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                selectedPlan === plan.id
                  ? 'border-[#FF7043] ring-4 ring-[#FF7043]/20 transform scale-105'
                  : 'border-slate-200 hover:border-[#FF7043]/50'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#FF7043] to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4" /> Most Popular
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center mb-6">
                <div className={`w-18 h-18 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-lg mb-4">{plan.description}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-bold text-[#FF7043]">₦{plan.price}</span>
                  <span className="text-slate-500 text-xl">/month</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <button
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-[#FF7043] to-orange-500 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {selectedPlan === plan.id ?
                  'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="p-8 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Payment Details</h2>
                <p className="text-slate-600 text-xl">Secure checkout • No hidden fees • Cancel anytime</p>
              </div>

              <div className="p-8">
                {/* Subscription Details */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-6">Subscription Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-lg font-medium text-slate-700 mb-3">Premium Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-xl">₦</span>
                        <input
                          type="text"
                          value={formData.amount}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          className="w-full pl-12 pr-4 py-5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-xl cursor-pointer"
                          placeholder="500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-slate-700 mb-3">Payment Frequency</label>
                      <div className="flex bg-slate-100 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => handleInputChange('frequency', 'Weekly')}
                          className={`flex-1 py-4 px-4 rounded-lg text-lg font-medium transition-all cursor-pointer ${
                            formData.frequency === 'Weekly' ?
                              'bg-[#FF7043] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Weekly
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('frequency', 'Monthly')}
                          className={`flex-1 py-4 px-4 rounded-lg text-lg font-medium transition-all cursor-pointer ${
                            formData.frequency === 'Monthly' ?
                              'bg-[#FF7043] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium text-slate-700 mb-3">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="w-full px-4 py-5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-xl cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-slate-700 mb-3">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        className="w-full px-4 py-5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-xl cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-6">Payment Method</h3>
                  <p className="text-slate-600 text-lg mb-6">Choose your preferred payment method. Your details will be saved securely.</p>

                  {/* Saved Payment Methods */}
                  {savedPaymentMethods.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-slate-700 mb-4">Saved Payment Methods</h4>
                      <div className="space-y-3">
                        {savedPaymentMethods.map(method => (
                          <PaymentMethodOption
                            key={method.id}
                            id={method.id}
                            icon={
                              method.logo ? (
                                <img src={method.logo} alt={method.type} className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                              ) : (
                                <CreditCard className="w-8 h-8 text-slate-600" />
                              )
                            }
                            title={method.name}
                            subtitle={`${method.type.charAt(0).toUpperCase() + method.type.slice(1)} • ${method.accountNumber}`}
                            account={method.bankName && `${method.bankName}`}
                            isSelected={formData.paymentMethod === method.id}
                            onClick={() => {
                              handleInputChange('paymentMethod', method.id);
                              setFormData(prev => ({ ...prev, newMethodType: null, currentEditingMethodId: null })); // Hide new method form and clear editing
                            }}
                            canEdit={true}
                            onEdit={() => handleEditSavedMethod(method)}
                            onDelete={() => {
                              setSavedPaymentMethods(prev => prev.filter(m => m.id !== method.id));
                              // If deleted method was selected, reset selection
                              if (formData.paymentMethod === method.id) {
                                setFormData(prev => ({ ...prev, paymentMethod: 'opay' }));
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Payment Methods Selection */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-medium text-slate-700">Add New Payment Method</h4>
                    <PaymentMethodOption
                      id="opay"
                      icon={
                        <img src={OpayLogo} alt="OPay" className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      }
                      title="OPay Account"
                      subtitle="Connect your OPay account"
                      isSelected={formData.paymentMethod === 'opay' && formData.newMethodType === 'opay'}
                      onClick={() => handleSelectNewPaymentMethodType('opay')}
                    />
                    <PaymentMethodOption
                      id="moniepoint"
                      icon={
                        <img src={MoniepointLogo} alt="Moniepoint" className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      }
                      title="Moniepoint Account"
                      subtitle="Connect your Moniepoint account"
                      isSelected={formData.paymentMethod === 'moniepoint' && formData.newMethodType === 'moniepoint'}
                      onClick={() => handleSelectNewPaymentMethodType('moniepoint')}
                    />
                    <PaymentMethodOption
                      id="card"
                      icon={<CreditCard className="w-8 h-8 text-slate-600" />}
                      title="Credit/Debit Card"
                      subtitle="Visa, Mastercard, Verve"
                      isSelected={formData.paymentMethod === 'card' && formData.newMethodType === 'card'}
                      onClick={() => handleSelectNewPaymentMethodType('card')}
                    />
                    <PaymentMethodOption
                      id="transfer"
                      icon={<Building className="w-8 h-8 text-slate-600" />}
                      title="Bank Transfer"
                      subtitle="Direct bank payment"
                      isSelected={formData.paymentMethod === 'transfer' && formData.newMethodType === 'transfer'}
                      onClick={() => handleSelectNewPaymentMethodType('transfer')}
                    />
                    <PaymentMethodOption
                      id="ussd"
                      icon={<Phone className="w-8 h-8 text-slate-600" />}
                      title="USSD Payment"
                      subtitle="Pay using your phone's USSD code"
                      isSelected={formData.paymentMethod === 'ussd' && formData.newMethodType === 'ussd'}
                      onClick={() => handleSelectNewPaymentMethodType('ussd')}
                    />
                  </div>

                  {/* Payment Details based on newMethodType selection */}
                  {(formData.newMethodType === 'opay' || formData.newMethodType === 'moniepoint') && (
                    <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                      <h4 className="text-xl font-semibold text-slate-900 mb-4">
                        {formData.newMethodType === 'opay' ? 'OPay' : 'Moniepoint'} Account Details
                      </h4>
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">Phone Number / Account ID</label>
                        <input
                          type="text"
                          value={formData.bankAccount}
                          onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="e.g., 080XXXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">Account Name</label>
                        <input
                          type="text"
                          value={formData.accountName}
                          onChange={(e) => handleInputChange('accountName', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="e.g., John Doe"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="saveOpayMoniepoint"
                          checked={formData.saveMethod}
                          onChange={(e) => handleInputChange('saveMethod', e.target.checked)}
                          className="w-5 h-5 text-[#FF7043] rounded-md focus:ring-[#FF7043] cursor-pointer"
                        />
                        <label htmlFor="saveOpayMoniepoint" className="text-slate-700 text-base">Save this account for future payments</label>
                      </div>
                      {formData.saveMethod && (
                        <button
                          type="button"
                          onClick={handleSaveNewPaymentMethod}
                          className="w-full mt-4 bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Save className="w-5 h-5" /> Save Account
                        </button>
                      )}
                    </div>
                  )}

                  {formData.newMethodType === 'card' && (
                    <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="•••• •••• •••• ••••"
                          maxLength="19"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-lg font-medium text-slate-700 mb-2">Expiry Date (MM/YY)</label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                        </div>
                        <div className="relative">
                          <label className="block text-lg font-medium text-slate-700 mb-2">CVV</label>
                          <input
                            type={showCvv ?
                              'text' : 'password'}
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg pr-12"
                            placeholder="•••"
                            maxLength="4"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCvv(!showCvv)}
                            className="absolute right-4 top-1/2 mt-2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                          >
                            {showCvv ?
                              <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">Name on Card</label>
                        <input
                          type="text"
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="e.g., John Doe"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={formData.saveMethod}
                          onChange={(e) => handleInputChange('saveMethod', e.target.checked)}
                          className="w-5 h-5 text-[#FF7043] rounded-md focus:ring-[#FF7043] cursor-pointer"
                        />
                        <label htmlFor="saveCard" className="text-slate-700 text-base">Save this card for future payments</label>
                      </div>
                      {formData.saveMethod && (
                        <button
                          type="button"
                          onClick={handleSaveNewPaymentMethod}
                          className="w-full mt-4 bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Save className="w-5 h-5" /> Save Card
                        </button>
                      )}
                    </div>
                  )}

                  {formData.newMethodType === 'transfer' && (
                    <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">Bank Name</label>
                        <input
                          type="text"
                          value={formData.bankName}
                          onChange={(e) => handleInputChange('bankName', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="e.g., Zenith Bank"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">Account Number</label>
                        <input
                          type="text"
                          value={formData.bankAccount}
                          onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="e.g., 0123456789"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">Account Name</label>
                        <input
                          type="text"
                          value={formData.accountName}
                          onChange={(e) => handleInputChange('accountName', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="e.g., John Doe"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="saveBank"
                          checked={formData.saveMethod}
                          onChange={(e) => handleInputChange('saveMethod', e.target.checked)}
                          className="w-5 h-5 text-[#FF7043] rounded-md focus:ring-[#FF7043] cursor-pointer"
                        />
                        <label htmlFor="saveBank" className="text-slate-700 text-base">Save this bank account for future payments</label>
                      </div>
                      {formData.saveMethod && (
                        <button
                          type="button"
                          onClick={handleSaveNewPaymentMethod}
                          className="w-full mt-4 bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Save className="w-5 h-5" /> Save Account
                        </button>
                      )}
                    </div>
                  )}

                  {formData.newMethodType === 'ussd' && (
                    <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-slate-700 mb-2">USSD Code</label>
                        <input
                          type="text"
                          value={formData.ussdCode}
                          onChange={(e) => handleInputChange('ussdCode', e.target.value)}
                          className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-lg"
                          placeholder="e.g., *901# for Access Bank"
                        />
                      </div>
                      <p className="text-slate-600 text-base">
                        After clicking subscribe, a USSD prompt will appear on your phone to complete the payment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden sticky top-28">
              <div className="p-8 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Summary</h2>
                <p className="text-slate-600 text-xl">Review your plan and total amount</p>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-600 text-lg">Selected Plan</p>
                  <p className="font-semibold text-slate-900 text-lg">{getCurrentPlan().name}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-600 text-lg">Premium Amount</p>
                  <p className="font-semibold text-slate-900 text-lg">₦{formData.amount}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-600 text-lg">Frequency</p>
                  <p className="font-semibold text-slate-900 text-lg">{formData.frequency}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-600 text-lg">Coverage</p>
                  <p className="font-semibold text-slate-900 text-lg">{getCurrentPlan().coverage}</p>
                </div>
                <div className="flex items-center justify-between mb-6 border-t border-slate-200 pt-6 mt-6">
                  <p className="text-slate-800 text-2xl font-bold">Total Due Now</p>
                  <p className="text-orange-600 text-3xl font-bold">₦{formData.amount}</p>
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-[#FF7043] to-orange-500 text-white py-5 rounded-xl font-bold text-xl hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center justify-center gap-3">
                    {processing ? (
                      <>
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        Subscribe Now
                      </>
                    )}
                  </div>
                </button>
                <p className="text-center text-slate-500 text-base mt-3">
                  By subscribing, you agree to InsureLink's <a href="#" className="text-[#FF7043] hover:underline">Terms of Service</a> and <a href="#" className="text-[#FF7043] hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Why Choose InsureLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-lg">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#FF7043] to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-lg">{testimonial.name}</p>
                    <p className="text-slate-600 text-base">{testimonial.business}, {testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section (Placeholder for future expansion) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900 text-xl mb-2">How do I file a claim?</h3>
              <p className="text-slate-600 text-lg">Claims can be filed quickly through our WhatsApp support or via your dashboard. Our AI-powered system processes most claims within 24 hours.</p>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900 text-xl mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-slate-600 text-lg">Yes, you can easily upgrade or downgrade your plan anytime from your InsureLink dashboard. Changes will take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-xl mb-2">Is my payment information secure?</h3>
              <p className="text-slate-600 text-lg">Absolutely. We use 256-bit SSL encryption and comply with PCI DSS standards to ensure your payment details are fully secure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"> {/* Removed background colors and shadow */}
                <img src={InsureLinkLogo} alt="InsureLink" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="w-6 h-6 bg-white rounded-md hidden items-center justify-center">
                  <span className="text-[#FF7043] font-bold text-xs">IL</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold">InsureLink</h3>
            </div>
            <p className="text-slate-400 text-base mb-4">Your trusted partner in business protection.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-[#FF7043] transition-colors"><Mail className="w-6 h-6" /></a>
              <a href="#" className="text-slate-400 hover:text-[#FF7043] transition-colors"><Phone className="w-6 h-6" /></a>
              <a href="#" className="text-slate-400 hover:text-[#FF7043] transition-colors"><MessageCircle className="w-6 h-6" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">Plans</a></li>
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF7043] transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-slate-500 mt-8 border-t border-slate-700 pt-8">
          <p>&copy; {new Date().getFullYear()} InsureLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentPage;