import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import LeftSection from "./components/LeftSection";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutYourself, setAboutYourself] = useState("");
  const [insureLinkReason, setInsureLinkReason] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Focus states for input fields
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [aboutYourselfFocused, setAboutYourselfFocused] = useState(false);
  const [insureLinkReasonFocused, setInsureLinkReasonFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialSignup = (provider) => {
    setErrorMessage(
      `${provider} signup is not yet implemented. Please use the email signup form.`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Basic form validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phoneNumber.trim()
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("You must agree to the terms and conditions.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create the user account
      const createUserResponse = await fetch(
        "https://Insurelink.onrender.com/auth/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phone: phoneNumber,
          }),
        }
      );

      if (!createUserResponse.ok) {
        // Handle errors for account creation
        const errorData = await createUserResponse.json();
        const errorMessageText =
          errorData.detail?.[0]?.msg ||
          errorData.detail ||
          `Signup failed with status: ${createUserResponse.status}. Please try again.`;
        setErrorMessage(errorMessageText);
        return;
      }

      // Step 2: If account creation is successful, send the confirmation email
      setSuccessMessage(
        "Account created successfully! Sending verification code..."
      );
      const sendOtpResponse = await fetch(
        "https://Insurelink.onrender.com/auth/confirm-email/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (sendOtpResponse.ok) {
        // Step 3: If OTP email is sent successfully, redirect to the verify code page
        setSuccessMessage(
          "Verification code sent successfully! Redirecting..."
        );
        setTimeout(() => {
          navigate("/verify-code", { state: { email: email } });
        }, 1500);
      } else {
        // Handle errors for sending the OTP email
        const errorData = await sendOtpResponse.json();
        const errorMessageText =
          errorData.detail?.[0]?.msg ||
          errorData.detail ||
          `Failed to send verification code with status: ${sendOtpResponse.status}. Please try again.`;
        setErrorMessage(errorMessageText);
        // Even if sending the OTP fails, the user account is created.
        // You might want to handle this case differently, like redirecting anyway
        // and showing an error on the verify page, or giving the user an option to resend.
      }
    } catch (error) {
      console.error("Network or unexpected error during signup:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Left Section */}

      <LeftSection />
      {/* Right Section - Signup Form */}
      <div className="flex items-center justify-end flex-1 px-6 py-4 mt-12 bg-white lg:px-12">
        <div className="w-full max-w-md">
          {/* Signup Header */}
          <div className="mb-6">
            <div className="relative">
              <button
                className="bg-[#FF7043] text-white rounded-full p-1 absolute hover:scale-105 transition-transform duration-200"
                onClick={() => navigate(-1)}
                aria-label="Go back to previous page"
                type="button"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="flex justify-center w-full mb-6 text-3xl font-bold text-gray-900">
                Sign up
              </h1>
            </div>
            <p className="text-sm text-gray-600">
              Let's get you all set up so you can access your personal account
            </p>
          </div>

          {/* Success/Error Message Display */}
          {successMessage && (
            <div
              className="relative px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div
              className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFirstNameFocused(true)}
                  onBlur={() => setFirstNameFocused(false)}
                  className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                    firstNameFocused
                      ? "border-[#FF7043]"
                      : "border-gray-200 focus:border-[#FF7043]"
                  } focus-orange`}
                  placeholder="Samuel"
                  required
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                  ${
                    firstNameFocused || firstName
                      ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                      : "top-1/2 -translate-y-1/2 text-gray-400"
                  }`}
                >
                  First Name
                </label>
              </div>
              {/* Last Name */}
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setLastNameFocused(true)}
                  onBlur={() => setLastNameFocused(false)}
                  className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                    lastNameFocused
                      ? "border-[#FF7043]"
                      : "border-gray-200 focus:border-[#FF7043]"
                  } focus-orange`}
                  placeholder="Akpan"
                  required
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                  ${
                    lastNameFocused || lastName
                      ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                      : "top-1/2 -translate-y-1/2 text-gray-400"
                  }`}
                >
                  Last Name
                </label>
              </div>
            </div>
            {/* Email */}
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  emailFocused
                    ? "border-[#FF7043]"
                    : "border-gray-200 focus:border-[#FF7043]"
                } focus-orange`}
                placeholder="akpansamuel@gmail.com"
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                ${
                  emailFocused || email
                    ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                }`}
              >
                Email
              </label>
            </div>
            {/* Phone Number */}
            <div className="relative">
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setPhoneNumberFocused(true)}
                onBlur={() => setPhoneNumberFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  phoneNumberFocused
                    ? "border-[#FF7043]"
                    : "border-gray-200 focus:border-[#FF7043]"
                } focus-orange`}
                placeholder="+234 810 234 5678"
                required
              />
              <label
                htmlFor="phoneNumber"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                ${
                  phoneNumberFocused || phoneNumber
                    ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                }`}
              >
                Phone Number
              </label>
            </div>
            {/* About Yourself (Dropdown) */}
            <div className="relative">
              <select
                id="aboutYourself"
                value={aboutYourself}
                onChange={(e) => setAboutYourself(e.target.value)}
                onFocus={() => setAboutYourselfFocused(true)}
                onBlur={() => setAboutYourselfFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none appearance-none transition-all duration-200 cursor-pointer ${
                  aboutYourselfFocused
                    ? "border-[#FF7043]"
                    : "border-gray-200 focus:border-[#FF7043]"
                } focus-orange ${
                  aboutYourself === "" ? "text-gray-400" : "text-gray-900"
                }`}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Young Professional">Young Professional</option>
                <option value="Family Person">Family Person</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Student">Student</option>
                <option value="Retiree">Retiree</option>
                <option value="First-time user">First-time user</option>
                <option value="Other">Other</option>
              </select>
              <label
                htmlFor="aboutYourself"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                ${
                  aboutYourselfFocused || aboutYourself
                    ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                }`}
              >
                About Yourself
              </label>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {/* Why InsureLink? (Dropdown) */}
            <div className="relative">
              <select
                id="insureLinkReason"
                value={insureLinkReason}
                onChange={(e) => setInsureLinkReason(e.target.value)}
                onFocus={() => setInsureLinkReasonFocused(true)}
                onBlur={() => setInsureLinkReasonFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg focus:outline-none appearance-none transition-all duration-200 cursor-pointer ${
                  insureLinkReasonFocused
                    ? "border-[#FF7043]"
                    : "border-gray-200 focus:border-[#FF7043]"
                } focus-orange ${
                  insureLinkReason === "" ? "text-gray-400" : "text-gray-900"
                }`}
                required
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="First time getting insurance">
                  First time getting insurance
                </option>
                <option value="Switching from another provider">
                  Switching from another provider
                </option>
                <option value="Expanding my coverage">
                  Expanding my coverage
                </option>
                <option value="Business insurance needs">
                  Business insurance needs
                </option>
                <option value="Researching options">Researching options</option>
                <option value="Other">Other</option>
              </select>
              <label
                htmlFor="insureLinkReason"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                ${
                  insureLinkReasonFocused || insureLinkReason
                    ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                }`}
              >
                Why InsureLink?
              </label>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 pr-12 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  passwordFocused
                    ? "border-[#FF7043]"
                    : "border-gray-200 focus:border-[#FF7043]"
                } focus-orange`}
                placeholder="••••••••••••"
                minLength="6"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                ${
                  passwordFocused || password
                    ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                className={`peer w-full px-4 pt-5 pb-2 pr-12 border-2 rounded-lg focus:outline-none transition-all duration-200 placeholder-transparent ${
                  confirmPasswordFocused
                    ? "border-[#FF7043]"
                    : "border-gray-200 focus:border-[#FF7043]"
                } focus-orange`}
                placeholder="••••••••••••"
                minLength="6"
                required
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 sm:left-4 px-1 bg-white transition-all duration-200 pointer-events-none
                ${
                  confirmPasswordFocused || confirmPassword
                    ? "top-0 -translate-y-1/2 text-xs text-gray-500"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                }`}
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute text-gray-400 -translate-y-1/2 right-4 top-1/2 hover:text-gray-600 focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start py-1">
              <input
                id="agreeTerms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 mt-0.5 text-[#FF7043] focus:ring-[#FF7043] border-gray-300 rounded cursor-pointer flex-shrink-0"
                required
              />
              <label
                htmlFor="agreeTerms"
                className="block ml-2 text-sm text-gray-900 cursor-pointer"
              >
                I agree to all the{" "}
                <a
                  href="#"
                  className="font-medium text-[#FF7043] hover:text-orange-600"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-[#FF7043] hover:text-orange-600"
                >
                  Privacy Policies
                </a>
              </label>
            </div>
            {/* Signup Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 px-4 rounded-lg font-medium cursor-pointer transition-colors ${
                isSubmitting
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#FF7043] text-white hover:bg-[#E55A35]"
              }`}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
          {/* Sign In Link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-[#FF7043] hover:text-[#E55A35] transition-colors cursor-pointer"
            >
              Sign in
            </a>
          </p>
          {/* Social Login Divider */}
          <div className="mt-4 mb-3">
            <p className="text-sm text-center text-gray-500">Or sign up with</p>
          </div>
          {/* Social Login Buttons */}
          <div className="flex gap-3">
            {/* Facebook Button */}
            <button
              type="button"
              onClick={() => handleSocialSignup("Facebook")}
              className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              aria-label="Sign up with Facebook"
            >
              <svg className="w-6 h-6 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleSocialSignup("Google")}
              className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              aria-label="Sign up with Google"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M20.64 12.25c0-.61-.05-1.22-.16-1.81H12v3.62h4.74c-.2 1.15-.84 2.16-1.79 2.83v2.34h3.01c1.76-1.62 2.77-4.01 2.77-6.98z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.27 0 6.01-1.08 8.01-2.91l-3.01-2.34c-1.04.7-2.38 1.12-3.99 1.12-3.09 0-5.7-2.07-6.64-4.85H2.36v2.44C4.36 20.5 7.93 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.36 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.36C1.6 8.55 1.19 10.22 1.19 12s.41 3.45 1.17 4.93l3.01-2.34z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.32.61 4.55 1.79l2.68-2.68C18.01 2.09 15.27 1 12 1 7.93 1 4.36 3.5 2.36 7.07l3.01 2.34C6.3 6.82 8.91 4.75 12 4.75z"
                />
              </svg>
            </button>
            {/* Apple Button */}
            <button
              type="button"
              onClick={() => handleSocialSignup("Apple")}
              className="flex-1 flex items-center justify-center py-2.5 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              aria-label="Sign up with Apple"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.82 14.5C17.06 15.68 16.3 16.89 15.01 16.92C13.72 16.95 13.31 16.03 12.02 16.03C10.73 16.03 10.32 16.89 9.03 16.94C7.74 16.99 6.75 15.62 5.99 14.41C4.23 11.23 2.92 6.68 4.68 3.62C5.55 2.1 7.11 1.14 8.8 1.11C10.08 1.09 11.3 1.98 12.09 1.98C12.87 1.98 14.35 0.91 15.9 1.07C16.55 1.1 18.37 1.33 19.54 3.05C19.45 3.11 17.37 4.33 17.35 6.86C17.32 9.88 19.94 10.89 19.97 10.9L19.97 10.9C19.94 10.97 19.55 12.34 18.59 13.73L17.82 14.5ZM13.0001 3.5C13.7301 2.67 14.9401 2.04 15.9401 2.0C16.0701 3.17 15.6001 4.35 14.9001 5.19C14.2101 6.04 13.0701 6.7 11.9501 6.61C11.8001 5.46 12.3601 4.26 13.0001 3.5Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;