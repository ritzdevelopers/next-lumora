import React, { createContext, useState } from 'react';
import Popup from "@/components/Popup"
// Create Context
export const EnquiryFormContext = createContext();

// Context Provider Component
export const EnquiryFormProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <EnquiryFormContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
      {children}
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </EnquiryFormContext.Provider>
  );
};