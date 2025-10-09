import axios from "axios";
import React, { useState } from "react";

const EnquiryFormPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Message: "",
  });

  // https://docs.google.com/spreadsheets/d/1Z68hFktG2aK17Rs4O1M2rr5fg3BMeovo5chc8atQI3I/edit?gid=0#gid=0
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setFormData({
      Name: "",
      Email: "",
      Phone: "",
      Message: "",
    });
    setErrors({});
    setSubmitStatus(null);
    setErrorMessage("");
    setIsLoading(false);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: phoneValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage("");
    }
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.Name.trim()) {
  //     newErrors.Name = "Name is required";
  //   }

  //   if (!formData.Email.trim()) {
  //     newErrors.Email = "Email is required";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email.trim())) {
  //     newErrors.Email = "Please provide a valid email address";
  //   }

  //   if (!formData.Phone.trim()) {
  //     newErrors.Phone = "Phone number is required";
  //   } else if (!/^\d+$/.test(formData.Phone)) {
  //     newErrors.Phone = "Phone number must contain only digits";
  //   } else if (formData.Phone.length < 10) {
  //     newErrors.Phone = "Phone number must be at least 10 digits";
  //   } else if (formData.Phone.length > 15) {
  //     newErrors.Phone = "Phone number cannot exceed 15 digits";
  //   }

  //   if (!formData.Message.trim()) {
  //     newErrors.Message = "Message is required";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Function HIT");

    setIsLoading(true);
    setSubmitStatus(null);

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB"); // DD/MM/YYYY
    const formattedTime = date.toLocaleTimeString("en-GB"); // HH:MM:SS

    try {
      const params = new URLSearchParams();

      // ✅ Add required field for Google Apps Script
      params.append("sheetName", "Sheet1");

      // ✅ Append form fields
      params.append("Name", formData.Name);
      params.append("Email", formData.Email);
      params.append("Phone", formData.Phone);
      params.append("Message", formData.Message);
      params.append("Date", formattedDate);
      params.append("Time", formattedTime);

      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbysI4wm24n3cOarBEafAQ3XwRHLn4AAFg6lgWNdOB-jCxayWUhu4n-0vjHKXi45TQ4a1Q/exec",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 20000,
        }
      );

      console.log("Form submitted successfully:", response.data);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
      });
      setErrors({});
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
      setFormData({
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
      });
      if (error.code === "ECONNABORTED") {
        setErrorMessage("Request timed out. Please try again.");
      } else if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          setErrorMessage("Service unavailable. Please try again later.");
        } else if (status === 500) {
          setErrorMessage("Server error. Please try again later.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      } else {
        setErrorMessage("Unable to connect. Check your internet connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50  bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      ></div>

      {/* Popup Container */}
      <div
        style={{
          zIndex: 9999,
        }}
        className={`fixed inset-0 z-999 flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
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
          <h2 className="text-2xl font-bold text-greenTheme text-center mb-6">
            Enquiry Form
          </h2>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="Name"
                required
                value={formData.Name}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.Name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.Name && (
                <p className="mt-1 text-sm text-red-600">{errors.Name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="Email"
                required
                value={formData.Email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address (e.g. example@gmail.com)"
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.Email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.Email && (
                <p className="mt-1 text-sm text-red-600">{errors.Email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="Phone"
                required
                value={formData.Phone}
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.Phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.Phone && (
                <p className="mt-1 text-sm text-red-600">{errors.Phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                required
                rows="4"
                name="Message"
                value={formData.Message}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border resize-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
                  errors.Message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your message"
              ></textarea>
              {errors.Message && (
                <p className="mt-1 text-sm text-red-600">{errors.Message}</p>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Thank you! Your inquiry has been submitted successfully.
                </div>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {errorMessage || "Something went wrong. Please try again."}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center ${
                isLoading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-greenTheme text-white hover:bg-mainText hover:text-black"
              }`}
            >
              {isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EnquiryFormPopup;
