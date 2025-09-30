import axios from 'axios';
import React, { useState } from 'react';

const EnquiryFormPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Reset form when popup closes
  const handleClose = () => {
    setFormData({
      name: '',
      mail: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus(null);
    setErrorMessage('');
    setIsLoading(false);
    onClose();
  };

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
    if (!formData.mail.trim()) {
      newErrors.mail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail.trim())) {
      newErrors.mail = 'Please provide a valid email address';
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
        mail: formData.mail.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim()
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 20000, // 10 second timeout
      },);

      // Axios considers 2xx status codes as successful
      console.log('Form submitted successfully:', response.status);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        mail: '',
        phone: '',
        message: ''
      });
      setErrors({});
      // Close popup after 3 seconds to show success message
      setTimeout(() => {
        handleClose();
      }, 3000);

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
                backendErrors[fieldName] = err.msg || err.message || 'Invalid input';
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
            // Server error
            setErrorMessage('Server error. Please try again later.');
            console.error('Server internal error (500)');
          } else if (status === 404) {
            // API endpoint not found
            setErrorMessage('Service unavailable. Please try again later.');
            console.error('API endpoint not found (404)');
          } else {
            // Other server errors
            setErrorMessage('Something went wrong. Please try again.');
            console.error(`Server error (${status}):`, data);
          }
        } else if (error.request) {
          // Network error - no response received
          setErrorMessage('Unable to connect to server. Please check your internet connection.');
          console.error('Network error - no response received:', error.code);
        } else if (error.code === 'ECONNABORTED') {
          // Timeout error
          setErrorMessage('Request timed out. Please try again.');
          console.error('Request timeout');
        } else {
          // Other errors
          setErrorMessage('An unexpected error occurred. Please try again.');
          console.error('Request setup error:', error.message);
        }
      } catch (errorHandlingError) {
        // If error handling itself fails, just log it and set a generic message
        setErrorMessage('An unexpected error occurred. Please try again.');
        console.error('Error while handling form submission error:', errorHandlingError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      ></div>

      {/* Popup Container */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Form Heading */}
          <h2 className="text-2xl font-bold text-greenTheme text-center mb-6">Enquiry Form</h2>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.mail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.mail && <p className="mt-1 text-sm text-red-600">{errors.mail}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border resize-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your message"
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you! Your inquiry has been submitted successfully.
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center ${
                isLoading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-greenTheme text-white hover:bg-mainText hover:text-black'
              }`}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EnquiryFormPopup;