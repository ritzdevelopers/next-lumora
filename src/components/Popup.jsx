import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { sendLeadEmailNotification } from "@/lib/notifyLead";
import CustomDropdown from "@/components/CustomDropdown";

const INVESTMENT_BUDGET_OPTIONS = [
  "₹3.75–4.5 Cr",
  "₹4.5–6 Cr",
  "Above ₹6 Cr",
];

const BUYING_PURPOSE_OPTIONS = [
  "Investment",
  "End Use",
  "Holiday Home",
  "Second Home",
];

const PURCHASE_TIMELINE_OPTIONS = [
  "Within 30 Days",
  "Within 3 Months",
  "Within 6 Months",
  "Just Exploring",
];

const emptyFormData = {
  Name: "",
  Email: "",
  Phone: "",
  InvestmentBudget: "",
  BuyingPurpose: "",
  PurchaseTimeline: "",
  City: "",
  Message: "",
};

const fieldClass = (hasError) =>
  `mt-1 block w-full px-3 py-2.5 sm:py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainText ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;

const EnquiryFormPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(emptyFormData);

  // https://docs.google.com/spreadsheets/d/1Z68hFktG2aK17Rs4O1M2rr5fg3BMeovo5chc8atQI3I/edit?gid=0#gid=0
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleClose = () => {
    setFormData(emptyFormData);
    setErrors({});
    setSubmitStatus(null);
    setErrorMessage("");
    setIsLoading(false);
    setOpenDropdown(null);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Phone") {
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
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

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setOpenDropdown(null);

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
      params.append("InvestmentBudget", formData.InvestmentBudget);
      params.append("BuyingPurpose", formData.BuyingPurpose);
      params.append("PurchaseTimeline", formData.PurchaseTimeline);
      params.append("City", formData.City);
      params.append("Message", formData.Message);
      params.append("Remark", "");
      params.append("Date", formattedDate);
      params.append("Time", formattedTime);

      await fetch(
        "https://script.google.com/macros/s/AKfycbw-KSPyBd05jD7EOrLWWPGBXKu5EGRmmqiEqL9uNZiTvHyxwbClUT1fy6d4iWS59aISNg/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: params,
        }
      );

      sendLeadEmailNotification({
        source: "enquiry-popup",
        Name: formData.Name,
        Email: formData.Email,
        Phone: formData.Phone,
        InvestmentBudget: formData.InvestmentBudget,
        BuyingPurpose: formData.BuyingPurpose,
        PurchaseTimeline: formData.PurchaseTimeline,
        City: formData.City,
        Message: formData.Message,
        Remark: "",
        Date: formattedDate,
        Time: formattedTime,
      });

      console.log("Form submitted successfully");
      setSubmitStatus("success");

      // Reset form
      setFormData(emptyFormData);
      setErrors({});
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
      setFormData(emptyFormData);
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

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      ></div>

      {/* Popup Container */}
      <div
        className={`fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-4 sm:mx-6 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className={fieldClass(errors.Name)}
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
                className={fieldClass(errors.Email)}
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
                className={fieldClass(errors.Phone)}
                placeholder="Enter your phone number"
              />
              {errors.Phone && (
                <p className="mt-1 text-sm text-red-600">{errors.Phone}</p>
              )}
            </div>
            <div>
              <CustomDropdown
                label="Investment Budget *"
                name="InvestmentBudget"
                value={formData.InvestmentBudget}
                options={INVESTMENT_BUDGET_OPTIONS}
                placeholder="Select investment budget"
                required
                error={errors.InvestmentBudget}
                isOpen={openDropdown === "InvestmentBudget"}
                onToggle={(open) =>
                  setOpenDropdown(open ? "InvestmentBudget" : null)
                }
                onSelect={(value) =>
                  handleSelectChange("InvestmentBudget", value)
                }
              />
            </div>
            <div>
              <CustomDropdown
                label="Buying Purpose *"
                name="BuyingPurpose"
                value={formData.BuyingPurpose}
                options={BUYING_PURPOSE_OPTIONS}
                placeholder="Select buying purpose"
                required
                error={errors.BuyingPurpose}
                isOpen={openDropdown === "BuyingPurpose"}
                onToggle={(open) =>
                  setOpenDropdown(open ? "BuyingPurpose" : null)
                }
                onSelect={(value) => handleSelectChange("BuyingPurpose", value)}
              />
            </div>
            <div>
              <CustomDropdown
                label="Purchase Timeline *"
                name="PurchaseTimeline"
                value={formData.PurchaseTimeline}
                options={PURCHASE_TIMELINE_OPTIONS}
                placeholder="Select purchase timeline"
                required
                error={errors.PurchaseTimeline}
                isOpen={openDropdown === "PurchaseTimeline"}
                onToggle={(open) =>
                  setOpenDropdown(open ? "PurchaseTimeline" : null)
                }
                onSelect={(value) =>
                  handleSelectChange("PurchaseTimeline", value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                type="text"
                name="City"
                required
                value={formData.City}
                onChange={handleInputChange}
                className={fieldClass(errors.City)}
                placeholder="Enter your city"
              />
              {errors.City && (
                <p className="mt-1 text-sm text-red-600">{errors.City}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                required
                rows="4"
                name="Message"
                value={formData.Message}
                onChange={handleInputChange}
                className={`${fieldClass(errors.Message)} resize-none`}
                placeholder="Enter your message"
              ></textarea>
              {errors.Message && (
                <p className="mt-1 text-sm text-red-600">{errors.Message}</p>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="md:col-span-2 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
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
              <div className="md:col-span-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
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
              className={`md:col-span-2 w-full py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center ${
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
    </>,
    document.body
  );
};

export default EnquiryFormPopup;
