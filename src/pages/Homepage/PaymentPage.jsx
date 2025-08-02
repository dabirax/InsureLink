import React, { useState, useEffect } from "react";
import {
 Shield, ArrowLeft, Smartphone, Building, Calendar,
 CheckCircle, Star, Lock, Zap, TrendingUp, Award, Users,
 Info, AlertCircle, Gift, Sparkles, Crown, Heart, Target,
 Phone, Mail, MessageCircle, FileText, Download, RefreshCw,
 ChevronRight, Plus, Minus, Eye, EyeOff, Copy, Check, Edit3,
 Trash2, Save, Store, Truck, Factory, Laptop, Coffee, ShoppingBag,
 Home, Car, Wrench, Briefcase, Camera, Scissors, Book, Music
} from 'lucide-react';

// Import actual images
import InsureLinkLogo from '../../assets/InsureLink.jpg'; // Path to your logo
import OpayLogo from '../../assets/opay.png'; // Path to OPay logo in assets
import MoniepointLogo from '../../assets/moniepoint.png'; // Path to Moniepoint logo in assets

const PaymentPage = () => {
 const [selectedPackage, setSelectedPackage] = useState('retail-pro');
 const [processingPayment, setProcessingPayment] = useState(false);
 const [showSecurityLoader, setShowSecurityLoader] = useState(false);

 // User information
 const userName = "Etim Bassey";

 // Insurance packages tailored for Nigerian SMEs
 const insurancePackages = [
   {
     id: 'retail-basic',
     name: 'Retail Shield Basic',
     category: 'Retail & Trading',
     icon: Store,
     dailyPrice: 72,
     weeklyPrice: 500,
     monthlyPrice: 2200,
     yearlyPrice: 24000,
     coverage: '₦2,500,000',
     description: 'Perfect for small shops, kiosks, and market traders',
     features: [
       'Fire & Theft Protection',
       'Stock Coverage',
       'WhatsApp Claims Support',
       'Basic Liability Coverage',
       '24/7 Emergency Hotline'
     ],
     popular: false,
     color: 'from-blue-500 to-blue-600',
     businesses: ['Shops', 'Kiosks', 'Market Stalls', 'Mini-Markets']
   },
   {
     id: 'retail-pro',
     name: 'Retail Shield Pro',
     category: 'Retail & Trading',
     icon: ShoppingBag,
     dailyPrice: 103,
     weeklyPrice: 720,
     monthlyPrice: 3100,
     yearlyPrice: 34000,
     coverage: '₦5,000,000',
     description: 'Comprehensive protection for growing retail businesses',
     features: [
       'All Basic Features',
       'Equipment & Machinery Coverage',
       'Business Interruption Insurance',
       'Product Liability Protection',
       'Employee Accident Coverage',
       'Priority Claims Processing'
     ],
     popular: true,
     color: 'from-[#FF7043] to-orange-500',
     businesses: ['Supermarkets', 'Fashion Stores', 'Electronics Shops', 'Pharmacies']
   },
   {
     id: 'logistics-standard',
     name: 'Logistics Guardian',
     category: 'Transportation & Logistics',
     icon: Truck,
     dailyPrice: 89,
     weeklyPrice: 620,
     monthlyPrice: 2700,
     yearlyPrice: 29500,
     coverage: '₦4,000,000',
     description: 'Essential coverage for delivery and transport services',
     features: [
       'Vehicle Insurance Coverage',
       'Goods in Transit Protection',
       'Third Party Liability',
       'Driver Accident Coverage',
       'Theft & Hijacking Protection',
       'GPS Tracking Discount'
     ],
     popular: false,
     color: 'from-green-500 to-green-600',
     businesses: ['Delivery Services', 'Logistics Companies', 'Transport Operators', 'E-commerce Fulfillment']
   },
   {
     id: 'manufacturing-basic',
     name: 'Manufacturing Guard',
     category: 'Manufacturing & Production',
     icon: Factory,
     dailyPrice: 124,
     weeklyPrice: 870,
     monthlyPrice: 3800,
     yearlyPrice: 41500,
     coverage: '₦7,500,000',
     description: 'Robust protection for small to medium manufacturers',
     features: [
       'Factory & Equipment Coverage',
       'Raw Materials Protection',
       'Product Liability Insurance',
       'Workers Compensation',
       'Business Interruption',
       'Environmental Liability'
     ],
     popular: false,
     color: 'from-purple-500 to-purple-600',
     businesses: ['Food Processing', 'Textile Manufacturing', 'Furniture Making', 'Metal Fabrication']
   },
   {
     id: 'tech-startup',
     name: 'Tech Innovator Plan',
     category: 'Technology & Digital',
     icon: Laptop,
     dailyPrice: 96,
     weeklyPrice: 670,
     monthlyPrice: 2900,
     yearlyPrice: 32000,
     coverage: '₦6,000,000',
     description: 'Modern coverage for tech startups and digital businesses',
     features: [
       'Cyber Security Insurance',
       'Data Breach Protection',
       'Professional Indemnity',
       'Equipment & Software Coverage',
       'Business Interruption',
       'Client Data Protection'
     ],
     popular: false,
     color: 'from-indigo-500 to-indigo-600',
     businesses: ['Software Companies', 'Digital Agencies', 'E-commerce', 'Fintech Startups']
   },
   {
     id: 'hospitality-standard',
     name: 'Hospitality Haven',
     category: 'Food & Hospitality',
     icon: Coffee,
     dailyPrice: 82,
     weeklyPrice: 575,
     monthlyPrice: 2500,
     yearlyPrice: 27500,
     coverage: '₦3,500,000',
     description: 'Specialized protection for restaurants and hospitality',
     features: [
       'Food Safety Liability',
       'Kitchen Equipment Coverage',
       'Customer Injury Protection',
       'Liquor Liability (if applicable)',
       'Property Damage Coverage',
       'Staff Accident Insurance'
     ],
     popular: false,
     color: 'from-amber-500 to-amber-600',
     businesses: ['Restaurants', 'Cafes', 'Hotels', 'Catering Services']
   },
   {
     id: 'professional-services',
     name: 'Professional Shield',
     category: 'Professional Services',
     icon: Briefcase,
     dailyPrice: 68,
     weeklyPrice: 475,
     monthlyPrice: 2050,
     yearlyPrice: 22500,
     coverage: '₦4,500,000',
     description: 'Tailored coverage for service-based businesses',
     features: [
       'Professional Indemnity',
       'Public Liability Insurance',
       'Office Contents Coverage',
       'Cyber Liability Protection',
       'Client Data Security',
       'Legal Expense Coverage'
     ],
     popular: false,
     color: 'from-teal-500 to-teal-600',
     businesses: ['Consulting Firms', 'Accounting', 'Legal Services', 'Marketing Agencies']
   },
   {
     id: 'creative-business',
     name: 'Creative Enterprise',
     category: 'Creative & Media',
     icon: Camera,
     dailyPrice: 75,
     weeklyPrice: 525,
     monthlyPrice: 2300,
     yearlyPrice: 25000,
     coverage: '₦3,000,000',
     description: 'Comprehensive coverage for creative professionals',
     features: [
       'Equipment & Gear Protection',
       'Professional Indemnity',
       'Public Liability Coverage',
       'Copyright Infringement Protection',
       'Client Project Insurance',
       'Studio/Workshop Coverage'
     ],
     popular: false,
     color: 'from-pink-500 to-pink-600',
     businesses: ['Photography Studios', 'Design Agencies', 'Media Production', 'Art Studios']
   }
 ];

 const [selectedBilling, setSelectedBilling] = useState('monthly');
 
 const billingOptions = [
   { id: 'daily', label: 'Daily', suffix: '/day', popular: false },
   { id: 'weekly', label: 'Weekly', suffix: '/week', popular: false },
   { id: 'monthly', label: 'Monthly', suffix: '/month', popular: true },
   { id: 'yearly', label: 'Yearly', suffix: '/year', popular: false, discount: '15% OFF' }
 ];

 const getCurrentPrice = (pkg) => {
   switch(selectedBilling) {
     case 'daily': return pkg.dailyPrice;
     case 'weekly': return pkg.weeklyPrice;
     case 'monthly': return pkg.monthlyPrice;
     case 'yearly': return pkg.yearlyPrice;
     default: return pkg.monthlyPrice;
   }
 };

 const getSelectedPackage = () => {
   return insurancePackages.find(pkg => pkg.id === selectedPackage) || insurancePackages[1];
 };

 const handleProceedToCheckout = () => {
   setProcessingPayment(true);
   setShowSecurityLoader(true);
   
   // Simulate security processing with longer duration for user to read
   setTimeout(() => {
     setShowSecurityLoader(false);
     setProcessingPayment(false);
     // Redirect to Paystack
     window.open('https://paystack.shop/pay/insurelink', '_blank');
   }, 4000); // Increased to 8 seconds for better readability
 };

 // Enhanced Security Processing Modal with personalization
 const SecurityProcessingModal = () => {
   const selectedPkg = getSelectedPackage();
   const currentPrice = getCurrentPrice(selectedPkg);
   const billingLabel = billingOptions.find(b => b.id === selectedBilling)?.label || 'Monthly';
   
   return (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
       <div className="bg-white rounded-3xl p-6 max-w-lg w-full text-center shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
         {/* Animated Security Shield */}
         <div className="relative mb-6">
           <div className="relative w-20 h-20 mx-auto">
             <img
               src={InsureLinkLogo}
               alt="InsureLink"
               className="object-contain w-full h-full"
             />
             {/* Animated Security Ring */}
             <div className="absolute inset-0 border-4 border-[#FF7043] border-t-transparent rounded-full animate-spin"></div>
             <div className="absolute inset-2 border-2 border-[#FF7043]/30 border-b-transparent rounded-full animate-spin animation-delay-300"></div>
           </div>
           {/* Pulse Effect */}
           <div className="absolute inset-0 w-20 h-20 mx-auto bg-[#FF7043]/20 rounded-full animate-ping"></div>
         </div>

         <h3 className="mb-2 text-xl font-bold text-slate-900">Securing Your Transaction</h3>
         <p className="text-[#FF7043] font-semibold text-lg mb-1">Hello, {userName}!</p>
         <p className="mb-4 text-sm text-slate-600">Encrypting your data and preparing secure checkout...</p>
         
         {/* Personalized Insurance Summary */}
         <div className="p-4 mb-4 text-left bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
           <h4 className="mb-2 text-sm font-bold text-center text-slate-900">Your Selected Plan</h4>
           <div className="space-y-1.5 text-sm">
             <div className="flex items-center justify-between">
               <span className="font-medium text-slate-600">Plan:</span>
               <span className="font-bold text-[#FF7043]">{selectedPkg.name}</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="font-medium text-slate-600">Coverage:</span>
               <span className="font-bold text-green-600">{selectedPkg.coverage}</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="font-medium text-slate-600">Billing:</span>
               <span className="font-bold text-slate-900">{billingLabel}</span>
             </div>
             <div className="flex items-center justify-between pt-2 mt-2 border-t">
               <span className="font-medium text-slate-600">Total Amount:</span>
               <span className="font-bold text-lg text-[#FF7043]">₦{currentPrice.toLocaleString()}</span>
             </div>
           </div>
         </div>
         
         <div className="mb-4 space-y-2 text-sm text-left">
           <div className="flex items-center text-green-600">
             <CheckCircle className="w-4 h-4 mr-3" />
             <span>SSL encryption activated</span>
           </div>
           <div className="flex items-center text-green-600">
             <CheckCircle className="w-4 h-4 mr-3" />
             <span>Payment gateway secured</span>
           </div>
           <div className="flex items-center text-green-600">
             <CheckCircle className="w-4 h-4 mr-3" />
             <span>Policy details verified</span>
           </div>
           <div className="flex items-center text-[#FF7043] animate-pulse">
             <RefreshCw className="w-4 h-4 mr-3 animate-spin" />
             <span>Redirecting to secure checkout...</span>
           </div>
         </div>

         <div className="p-3 bg-orange-50 rounded-xl">
           <div className="flex items-center justify-center gap-2 text-[#FF7043]">
             <Lock className="w-4 h-4" />
             <span className="text-sm font-semibold">Bank-grade Security</span>
           </div>
           <p className="mt-1 text-xs text-slate-600">
             You will be redirected to Paystack in a few seconds...
           </p>
         </div>
       </div>
     </div>
   );
 };

 return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
     {/* Navigation */}
     <nav className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-xl border-slate-200/60">
       <div className="px-6 mx-auto max-w-7xl lg:px-8">
         <div className="flex items-center justify-between h-20">
           <div className="flex items-center space-x-4">
             <button className="p-2 text-slate-500 hover:text-[#FF7043] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
               <ArrowLeft className="w-6 h-6" />
             </button>
             <div className="flex items-center space-x-3">
               <img src={InsureLinkLogo} alt="InsureLink" className="object-contain w-12 h-12" />
               <div>
                 <h1 className="text-2xl font-bold text-slate-900">InsureLink</h1>
                 <p className="-mt-1 text-sm text-slate-500">SME Insurance Protection</p>
               </div>
             </div>
           </div>
           <div className="flex items-center space-x-3">
             <div className="flex items-center px-4 py-2 space-x-2 text-green-700 rounded-full bg-green-50">
               <Lock className="w-4 h-4" />
               <span className="text-sm font-medium">Secure Checkout</span>
             </div>
           </div>
         </div>
       </div>
     </nav>

     <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8">
       {/* Header */}
       <div className="mb-12 text-center">
         <h1 className="mb-4 text-5xl font-bold text-slate-900">
           You've Built Something <span className="text-[#FF7043]">Worth Protecting</span>
         </h1>
         <p className="mb-6 text-xl text-slate-600">
           And we understand exactly what that means to you. Find your perfect fit
         </p>
         <div className="flex items-center justify-center gap-6 text-slate-500">
           <div className="flex items-center gap-2">
             <Shield className="w-5 h-5 text-[#FF7043]" />
             <span>Instant Coverage</span>
           </div>
           <div className="flex items-center gap-2">
             <Award className="w-5 h-5 text-[#FF7043]" />
             <span>50K+ SMEs Protected</span>
           </div>
           <div className="flex items-center gap-2">
             <Zap className="w-5 h-5 text-[#FF7043]" />
             <span>24hr Claims Processing</span>
           </div>
         </div>
       </div>

       {/* Billing Toggle */}
       <div className="flex justify-center mb-12">
         <div className="p-2 bg-white border shadow-lg rounded-2xl border-slate-200">
           <div className="grid grid-cols-4 gap-1">
             {billingOptions.map((option) => (
               <button
                 key={option.id}
                 onClick={() => setSelectedBilling(option.id)}
                 className={`px-6 py-3 rounded-xl font-semibold text-base transition-all relative cursor-pointer ${
                   selectedBilling === option.id
                     ? 'bg-[#FF7043] text-white shadow-md'
                     : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                 }`}
               >
                 {option.label}
                 {option.discount && (
                   <span className="absolute px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full -top-2 -right-2">
                     {option.discount}
                   </span>
                 )}
                 {option.popular && selectedBilling !== option.id && (
                   <span className="absolute -top-2 -right-2 bg-[#FF7043] text-white text-xs px-2 py-1 rounded-full font-bold">
                     Popular
                   </span>
                 )}
               </button>
             ))}
           </div>
         </div>
       </div>

       {/* Insurance Packages Grid */}
       <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
         {insurancePackages.map((pkg) => {
           const Icon = pkg.icon;
           const isSelected = selectedPackage === pkg.id;
           const currentPrice = getCurrentPrice(pkg);
           const billingLabel = billingOptions.find(b => b.id === selectedBilling)?.suffix || '/month';
           
           return (
             <div
               key={pkg.id}
               className={`relative bg-white rounded-2xl border-2 p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                 isSelected
                   ? 'border-[#FF7043] ring-4 ring-[#FF7043]/20 transform scale-105'
                   : 'border-slate-200 hover:border-[#FF7043]/50'
               }`}
               onClick={() => setSelectedPackage(pkg.id)}
             >
               {pkg.popular && (
                 <div className="absolute transform -translate-x-1/2 -top-3 left-1/2">
                   <div className="bg-gradient-to-r from-[#FF7043] to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                     <div className="flex items-center gap-1">
                       <Crown className="w-3 h-3" /> Popular
                     </div>
                   </div>
                 </div>
               )}

               <div className="mb-4 text-center">
                 <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${pkg.color} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                   <Icon className="w-8 h-8 text-white" />
                 </div>
                 <h3 className="mb-2 text-xl font-bold text-slate-900">{pkg.name}</h3>
                 <p className="mb-3 text-sm text-slate-600">{pkg.description}</p>
                 
                 <div className="flex items-center justify-center gap-1 mb-2">
                   <span className="text-3xl font-bold text-[#FF7043]">₦{currentPrice.toLocaleString()}</span>
                   <span className="text-slate-500">{billingLabel}</span>
                 </div>
                 <p className="text-sm text-slate-500">Coverage up to {pkg.coverage}</p>
               </div>

               <div className="mb-4 space-y-2">
                 {pkg.features.slice(0, 3).map((feature, index) => (
                   <div key={index} className="flex items-center gap-2 text-sm">
                     <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                     <span className="text-slate-600">{feature}</span>
                   </div>
                 ))}
                 {pkg.features.length > 3 && (
                   <p className="text-sm text-[#FF7043] font-medium">+{pkg.features.length - 3} more features</p>
                 )}
               </div>

               <div className="mb-4 text-xs text-slate-500">
                 <p className="mb-1 font-medium">Perfect for:</p>
                 <p>{pkg.businesses.join(', ')}</p>
               </div>

               {isSelected && (
                 <div className="absolute top-4 right-4">
                   <CheckCircle className="w-6 h-6 text-[#FF7043]" />
                 </div>
               )}
             </div>
           );
         })}
       </div>

       {/* Selected Package Details & Payment Section */}
       <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
         {/* Package Details */}
         <div className="lg:col-span-2">
           <div className="overflow-hidden bg-white border shadow-lg rounded-2xl border-slate-200">
             <div className="p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
               <h2 className="mb-2 text-2xl font-bold text-slate-900">Selected Package Details</h2>
               <p className="text-slate-600">Review your chosen insurance coverage</p>
             </div>

             <div className="p-6">
               {(() => {
                 const pkg = getSelectedPackage();
                 const Icon = pkg.icon;
                 const currentPrice = getCurrentPrice(pkg);
                 const billingLabel = billingOptions.find(b => b.id === selectedBilling)?.suffix || '/month';
                 
                 return (
                   <div>
                     <div className="flex items-start gap-4 mb-6">
                       <div className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-2xl flex items-center justify-center shadow-md`}>
                         <Icon className="w-8 h-8 text-white" />
                       </div>
                       <div className="flex-1">
                         <h3 className="mb-1 text-2xl font-bold text-slate-900">{pkg.name}</h3>
                         <p className="mb-2 text-slate-600">{pkg.description}</p>
                         <div className="flex items-center gap-4">
                           <span className="text-2xl font-bold text-[#FF7043]">₦{currentPrice.toLocaleString()}{billingLabel}</span>
                           <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                             Coverage: {pkg.coverage}
                           </span>
                         </div>
                       </div>
                     </div>

                     <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                       <div>
                         <h4 className="mb-3 font-semibold text-slate-900">What's Covered</h4>
                         <div className="space-y-2">
                           {pkg.features.map((feature, index) => (
                             <div key={index} className="flex items-center gap-2">
                               <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                               <span className="text-slate-700">{feature}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                       <div>
                         <h4 className="mb-3 font-semibold text-slate-900">Perfect For</h4>
                         <div className="space-y-2">
                           {pkg.businesses.map((business, index) => (
                             <div key={index} className="flex items-center gap-2">
                               <Target className="w-4 h-4 text-[#FF7043] flex-shrink-0" />
                               <span className="text-slate-700">{business}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>

                     {/* Demo Payment Methods */}
                     <div className="p-6 bg-slate-50 rounded-xl">
                       <h4 className="mb-4 font-semibold text-slate-900">Preferred Payment Methods</h4>
                       <p className="mb-4 text-sm text-slate-600">Select your preferred payment method for instant checkout</p>
                       
                       <div className="space-y-3">
                         <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-[#FF7043]/50 transition-colors">
                           <div className="flex items-center gap-3">
                             <img src={OpayLogo} alt="OPay" className="object-contain rounded-lg"style={{ width: '48px', height: '48px' }}/>
                             <div>
                               <p className="font-medium text-slate-900">{userName} OPay</p>
                               <p className="text-sm text-slate-600">****5673 • Primary Account</p>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">Default</span>
                             <CheckCircle className="w-5 h-5 text-[#FF7043]" />
                           </div>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 opacity-75 cursor-pointer hover:opacity-100 hover:border-[#FF7043]/50 transition-all">
                           <div className="flex items-center gap-3">
                             <img src={MoniepointLogo} alt="Moniepoint" className="object-contain rounded-lg"style={{ width: '80px', height: '50px' }} />
                             <div>
                               <p className="font-medium text-slate-900">Business Account</p>
                               <p className="text-sm text-slate-600">****8942 • Backup</p>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 );
               })()}
             </div>
           </div>
         </div>

         {/* Checkout Summary */}
         <div>
           <div className="sticky overflow-hidden bg-white border shadow-lg rounded-2xl border-slate-200 top-28">
             <div className="bg-gradient-to-r from-[#FF7043] to-orange-500 p-6 text-white">
               <h2 className="mb-2 text-2xl font-bold">Checkout Summary</h2>
               <p className="text-orange-100">Secure payment powered by Paystack</p>
             </div>

             <div className="p-6">
               {(() => {
                 const pkg = getSelectedPackage();
                 const currentPrice = getCurrentPrice(pkg);
                 const billingLabel = billingOptions.find(b => b.id === selectedBilling)?.label || 'Monthly';
                 
                 return (
                   <div>
                     <div className="mb-6 space-y-4">
                       <div className="flex items-center justify-between">
                         <span className="text-slate-600">Package</span>
                         <span className="font-semibold text-slate-900">{pkg.name}</span>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-slate-600">Billing</span>
                         <span className="font-semibold text-slate-900">{billingLabel}</span>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-slate-600">Coverage</span>
                         <span className="font-semibold text-slate-900">{pkg.coverage}</span>
                       </div>
                       <div className="pt-4 border-t border-slate-200">
                         <div className="flex items-center justify-between">
                           <span className="text-lg font-bold text-slate-900">Total Amount</span>
                           <span className="text-2xl font-bold text-[#FF7043]">₦{currentPrice.toLocaleString()}</span>
                         </div>
                       </div>
                     </div>

                     <button
                       onClick={handleProceedToCheckout}
                       disabled={processingPayment}
                       className="w-full bg-gradient-to-r from-[#FF7043] to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                     >
                       {processingPayment ? (
                        <div className="flex items-center justify-center gap-3">
                           <RefreshCw className="w-5 h-5 animate-spin" />
                           Processing...
                         </div>
                       ) : (
                         <div className="flex items-center justify-center gap-3">
                           <Shield className="w-5 h-5" />
                           Proceed to Secure Checkout
                         </div>
                       )}
                     </button>

                     <div className="mt-4 text-center">
                       <div className="flex items-center justify-center gap-2 mb-2 text-sm text-slate-500">
                         <Lock className="w-4 h-4" />
                         <span>Secured by 256-bit SSL encryption</span>
                       </div>
                       <p className="text-xs text-slate-500">
                         You'll be redirected to Paystack for secure payment processing
                       </p>
                     </div>

                     {/* Trust Indicators */}
                     <div className="pt-6 mt-6 border-t border-slate-200">
                       <div className="grid grid-cols-3 gap-4 text-center">
                         <div>
                           <Shield className="w-6 h-6 mx-auto mb-1 text-green-500" />
                           <p className="text-xs text-slate-600">Instant Coverage</p>
                         </div>
                         <div>
                           <Award className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                           <p className="text-xs text-slate-600">Licensed Insurer</p>
                         </div>
                         <div>
                           <Users className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                           <p className="text-xs text-slate-600">50K+ Protected</p>
                         </div>
                       </div>
                     </div>
                   </div>
                 );
               })()}
             </div>
           </div>

           {/* Why Choose Us */}
           <div className="p-6 mt-8 bg-white border shadow-lg rounded-2xl border-slate-200">
             <h3 className="mb-4 text-xl font-bold text-slate-900">Why Nigerian SMEs Choose Us</h3>
             <div className="space-y-4">
               <div className="flex items-start gap-3">
                 <Zap className="w-5 h-5 text-[#FF7043] mt-0.5" />
                 <div>
                   <p className="font-semibold text-slate-900">Lightning Fast Claims</p>
                   <p className="text-sm text-slate-600">Process claims via WhatsApp in under 24 hours</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Smartphone className="w-5 h-5 text-[#FF7043] mt-0.5" />
                 <div>
                   <p className="font-semibold text-slate-900">Mobile-First Experience</p>
                   <p className="text-sm text-slate-600">Manage everything from your smartphone</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <TrendingUp className="w-5 h-5 text-[#FF7043] mt-0.5" />
                 <div>
                   <p className="font-semibold text-slate-900">Affordable Premiums</p>
                   <p className="text-sm text-slate-600">Plans starting from just ₦72/day</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Customer Reviews */}
       <div className="p-8 mt-16 border border-orange-200 shadow-lg bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
         <h2 className="mb-8 text-3xl font-bold text-center text-slate-900">Trusted by Nigerian SMEs</h2>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
           {[
             {
               name: 'Adebayo Ogundimu',
               business: 'Electronics Shop, Lagos',
               rating: 5,
               text: 'InsureLink saved my business when fire damaged my shop. Claims processed in 18 hours via WhatsApp!',
               avatar: 'AO'
             },
             {
               name: 'Fatima Abdullahi',
               business: 'Fashion Store, Kano',
               rating: 5,
               text: 'The coverage is comprehensive and affordable. Perfect for small businesses like mine.',
               avatar: 'FA'
             },
             {
               name: 'Chinedu Okafor',
               business: 'Transport Service, Onitsha',
               rating: 5,
               text: 'Amazing support team and instant policy activation. Highly recommend for logistics businesses.',
               avatar: 'CO'
             }
           ].map((review, index) => (
             <div key={index} className="p-6 bg-white shadow-md rounded-xl">
               <div className="flex items-center mb-4">
                 <div className="w-12 h-12 bg-gradient-to-r from-[#FF7043] to-orange-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                   {review.avatar}
                 </div>
                 <div>
                   <p className="font-semibold text-slate-900">{review.name}</p>
                   <p className="text-sm text-slate-600">{review.business}</p>
                 </div>
               </div>
               <div className="flex items-center mb-3">
                 {[...Array(review.rating)].map((_, i) => (
                   <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                 ))}
               </div>
               <p className="text-sm leading-relaxed text-slate-700">"{review.text}"</p>
             </div>
           ))}
         </div>
       </div>

       {/* FAQ Section */}
       <div className="p-8 mt-16 bg-white border shadow-lg rounded-2xl border-slate-200">
         <h2 className="mb-8 text-3xl font-bold text-center text-slate-900">Frequently Asked Questions</h2>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
           <div className="space-y-6">
             <div>
               <h3 className="mb-2 text-lg font-semibold text-slate-900">How quickly can I get coverage?</h3>
               <p className="text-slate-600">Coverage begins immediately after payment confirmation. You'll receive your policy documents within 5 minutes.</p>
             </div>
             <div>
               <h3 className="mb-2 text-lg font-semibold text-slate-900">Can I file claims via WhatsApp?</h3>
               <p className="text-slate-600">Yes! Our AI-powered WhatsApp system processes most claims within 24 hours. Simply send us your claim details and supporting documents.</p>
             </div>
             <div>
               <h3 className="mb-2 text-lg font-semibold text-slate-900">What payment methods do you accept?</h3>
               <p className="text-slate-600">We accept all major payment methods including OPay, Moniepoint, bank transfers, and all major debit/credit cards through Paystack.</p>
             </div>
           </div>
           <div className="space-y-6">
             <div>
               <h3 className="mb-2 text-lg font-semibold text-slate-900">Can I change my plan later?</h3>
               <p className="text-slate-600">Absolutely! You can upgrade or downgrade your plan anytime from your dashboard. Changes take effect on your next billing cycle.</p>
             </div>
             <div>
               <h3 className="mb-2 text-lg font-semibold text-slate-900">Is there a minimum contract period?</h3>
               <p className="text-slate-600">No minimum contract! You can cancel anytime. However, we recommend at least 3 months to fully experience our comprehensive protection.</p>
             </div>
             <div>
               <h3 className="mb-2 text-lg font-semibold text-slate-900">Do you cover businesses in all Nigerian states?</h3>
               <p className="text-slate-600">Yes, we provide coverage for SMEs across all 36 states and the FCT. Our support team speaks English, Hausa, Yoruba, and Igbo.</p>
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* Footer */}
     <footer className="py-12 mt-16 text-white bg-slate-900">
       <div className="px-6 mx-auto max-w-7xl lg:px-8">
         <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
           <div className="md:col-span-2">
             <div className="flex items-center mb-4 space-x-3">
               <img src={InsureLinkLogo} alt="InsureLink" className="w-10 h-10" />
               <h3 className="text-2xl font-bold">InsureLink</h3>
             </div>
             <p className="mb-6 text-lg text-slate-400">
               Nigeria's leading insurance platform for small and medium enterprises. 
               Protecting your business with modern, affordable, and accessible insurance solutions.
             </p>
             <div className="flex space-x-4">
               <a href="#" className="text-slate-400 hover:text-[#FF7043] transition-colors cursor-pointer">
                 <MessageCircle className="w-6 h-6" />
               </a>
               <a href="#" className="text-slate-400 hover:text-[#FF7043] transition-colors cursor-pointer">
                 <Phone className="w-6 h-6" />
               </a>
               <a href="#" className="text-slate-400 hover:text-[#FF7043] transition-colors cursor-pointer">
                 <Mail className="w-6 h-6" />
               </a>
             </div>
           </div>
           <div>
             <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
             <ul className="space-y-2 text-slate-400">
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">All Insurance Plans</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">Claims Portal</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">Customer Support</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">About InsureLink</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">Contact Us</a></li>
             </ul>
           </div>
           <div>
             <h3 className="mb-4 text-xl font-bold">Legal & Support</h3>
             <ul className="space-y-2 text-slate-400">
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">Terms of Service</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">Insurance License</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">Help Center</a></li>
               <li><a href="#" className="hover:text-[#FF7043] transition-colors cursor-pointer">File a Complaint</a></li>
             </ul>
           </div>
         </div>
         <div className="pt-8 mt-8 text-center border-t border-slate-700">
           <div className="flex flex-col items-center justify-between md:flex-row">
             <p className="mb-4 text-slate-500 md:mb-0">
               &copy; {new Date().getFullYear()} InsureLink Nigeria. All rights reserved. Licensed by NAICOM.
             </p>
             <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2 text-green-400">
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                 <span className="text-sm">All Systems Operational</span>
               </div>
             </div>
           </div>
         </div>
       </div>
     </footer>

     {/* Security Processing Modal */}
     {showSecurityLoader && <SecurityProcessingModal />}
   </div>
 );
};

export default PaymentPage;