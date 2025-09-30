import axios from 'axios';
import React, { useState } from 'react';

const BrochureFormPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    phone: ''
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
      phone: ''
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

    // Phone validation - optional but if provided, must be valid (at least 10 digits)
    if (formData.phone.trim()) {
      if (!/^\d+$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must contain only digits';
      } else if (formData.phone.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      } else if (formData.phone.length > 15) {
        newErrors.phone = 'Phone number cannot exceed 15 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to trigger PDF download
  const downloadPDF = () => {
    const pdfUrl = 'https://drive.google.com/file/d/19BRbafCTXVTj1TRTXCtVWoYsK07LXy6G/view?usp=drive_link';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Lumora_Brochure.pdf'; // Specify filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);
    setErrorMessage('');
    setErrors({});

    // Prepare form data
    const data = {
      name: formData.name.trim(),
      mail: formData.mail.trim(),
      phone: formData.phone.trim() || '',
      message: 'Brochure request', //
    };

    try {
      // Send request to server using axios
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enquiry`, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 20000,
      });

      console.log('Request successful:', response.status);
      console.log('Server response:', response.data);

      // Check if the response indicates success
      if (response.data && response.data.success) {
        // Trigger PDF download after successful server response
        downloadPDF();

        // Set success status and reset UI
        setSubmitStatus('success');
        setFormData({ name: '', mail: '', phone: '' });
        setErrors({});
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        // Handle case where server responds but indicates failure
        setSubmitStatus('error');
        setErrorMessage('Failed to process your request. Please try again.');
      }
  } catch (error) {
    setSubmitStatus('error');
    console.error('Submission error:', error);

    try {
      if (error.response) {
        const { status, data } = error.response;

        if ((status === 400 || status === 422) && data?.errors && Array.isArray(data.errors)) {
          const backendErrors = {};
          data.errors.forEach(err => {
            if (err && (err.path || err.param)) {
              const fieldName = err.path || err.param;
              backendErrors[fieldName] = err.msg || err.message || 'Invalid input';
            }
          });

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
          setErrorMessage(`Request failed with status ${status}. Please try again.`);
        }
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        setErrorMessage('Request timed out. Please check your connection and try again.');
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } catch (errorHandlingError) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Error while handling submission error:', errorHandlingError);
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
          <h2 className="text-2xl font-bold text-greenTheme text-center mb-6">Download Brochure</h2>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
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
              <label className="block text-sm font-medium text-gray-700">Email *</label>
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
                placeholder="Enter your phone number (optional)"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-greenTheme text-white hover:bg-mainText hover:text-greenTheme'
              }`}
            >
              {isLoading ? 'Sending...' : 'Download Brochure'}
            </button>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                <p className="text-sm">✓ Request submitted successfully! Your brochure download should start automatically.</p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && errorMessage && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default BrochureFormPopup;
