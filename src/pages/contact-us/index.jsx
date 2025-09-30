import Header from '@/components/Header';
import Footer from '@/sections/Footer';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number - only allow digits
    if (name === 'phone') {
      const phoneValue = value.replace(/\D/g, ''); // Remove non-digits
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit status and error message when user starts editing
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation - required
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    // Phone validation - required, at least 10 digits, only digits allowed
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain only digits';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    } else if (formData.phone.length > 15) {
      newErrors.phone = 'Phone number cannot exceed 15 digits';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enquiry`, {
        name: formData.name.trim(),
        mail: formData.email.trim(), // Note: API expects 'mail' not 'email'
        phone: formData.phone.trim(),
        message: formData.message.trim()
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 20000, // 20 second timeout
      });

      // Axios considers 2xx status codes as successful
      console.log('Form submitted successfully:', response.status);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});

    } catch (error) {
      // Always set error status first to prevent unhandled errors
      setSubmitStatus('error');

      // Log the full error for debugging
      console.error('Form submission error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });

      // Handle different types of errors safely
      try {
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;

          // Handle validation errors (400 or 422)
          if ((status === 400 || status === 422) && data?.errors && Array.isArray(data.errors)) {
            const backendErrors = {};
            data.errors.forEach(err => {
              if (err && (err.path || err.param)) {
                const fieldName = err.path || err.param;
                // Map 'mail' field from backend to 'email' field in frontend
                const frontendFieldName = fieldName === 'mail' ? 'email' : fieldName;
                backendErrors[frontendFieldName] = err.msg || err.message || 'Invalid input';
              }
            });

            // Only set errors if we found any valid ones
            if (Object.keys(backendErrors).length > 0) {
              setErrors(backendErrors);
              setErrorMessage('Please fix the errors above and try again.');
            } else {
              setErrorMessage('Please check your input and try again.');
            }
          } else if (status === 500) {
            setErrorMessage('Server error. Please try again later.');
          } else if (status === 429) {
            setErrorMessage('Too many requests. Please wait a moment and try again.');
          } else {
            setErrorMessage(data?.message || 'An error occurred. Please try again.');
          }
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          setErrorMessage('Request timed out. Please check your connection and try again.');
        } else if (error.code === 'ERR_NETWORK') {
          setErrorMessage('Network error. Please check your connection and try again.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      } catch (errorHandlingError) {
        console.error('Error while handling submission error:', errorHandlingError);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
  <Head>
    <title>Lumora - Contact Us</title>
    <link rel="icon" href="/favicon.png" />
  </Head>
  <Header lgScreen="lg:w-full" />
  <section className="min-h-screen bg-[#0e291a] pb-12 pt-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-4xl text-[#cc9a64] sm:text-5xl">Contact Us</h2>
        <p className="mt-4 text-lg font-athena text-greenTheme">
          We’re here to help you find your dream home. Reach out to us for any inquiries or assistance.
        </p>
      </div>

      {/* Grid Layout for Form and About Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Contacting Section */}
        <div className="bg-creamBg p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-[#cc9a64]">Why Contact Us?</h3>
          <p className="mt-4 text-greenTheme">
            This isn’t just about finding a home.
It’s about embracing slower mornings, greener surroundings, and spaces that feel naturally in rhythm. A journey begins here toward something quieter, something lasting.

          </p>
          <div className="mt-6">
            {/* Email Section */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-[#cc9a64]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-greenTheme">Email Us</p>
                <p className="text-greenTheme">Info@lumoraestates.com</p>
              </div>
            </div>

            {/* Phone Section */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-[#cc9a64]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-greenTheme">Call Us</p>
                <p className="text-greenTheme">+91 92117 30033</p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-[#cc9a64]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-greenTheme">Visit Us</p>
                <p className="text-greenTheme">
                  Lumora Estates Private Limited 8th Floor, <br /> KR Signature Tower, Sector 135, <br /> Noida, Uttar Pradesh 201304
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-creamBg p-8 rounded-lg shadow-lg">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <p className="font-medium">Message sent successfully!</p>
              <p className="text-sm">Thank you for contacting us. We'll get back to you soon.</p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p className="font-medium">Error</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Full Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-greenTheme">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 bg-[#0e291a] border rounded-md text-white placeholder-gray-400 focus:ring-[#cc9a64] focus:border-[#cc9a64] hover:border-[#cc9a64] transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-greenTheme">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 bg-[#0e291a] border rounded-md text-white placeholder-gray-400 focus:ring-[#cc9a64] focus:border-[#cc9a64] hover:border-[#cc9a64] transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone Number Input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-greenTheme">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 bg-[#0e291a] border rounded-md text-white placeholder-gray-400 focus:ring-[#cc9a64] focus:border-[#cc9a64] hover:border-[#cc9a64] transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-greenTheme">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 bg-[#0e291a] border rounded-md text-white placeholder-gray-400 focus:ring-[#cc9a64] focus:border-[#cc9a64] hover:border-[#cc9a64] transition-colors ${
                    errors.message ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Message.."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-4 py-2 font-semibold rounded-md transition-colors ${
                    isLoading
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-[#cc9a64] text-[#0e291a] hover:bg-[#b88653]'
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</>

  );
};

export default ContactUs;