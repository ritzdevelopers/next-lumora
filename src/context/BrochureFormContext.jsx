import React, { createContext, useState } from 'react';
import BrochurePopup from "@/components/BrochurePopup"

// Create Context
export const BrochureFormContext = createContext();

// Context Provider Component
export const BrochureFormProvider = ({ children }) => {
  const [isBrochurePopupOpen, setIsBrochurePopupOpen] = useState(false);

  const openBrochurePopup = () => setIsBrochurePopupOpen(true);
  const closeBrochurePopup = () => setIsBrochurePopupOpen(false);

  return (
    <BrochureFormContext.Provider value={{ isBrochurePopupOpen, openBrochurePopup, closeBrochurePopup }}>
      {children}
      <BrochurePopup isOpen={isBrochurePopupOpen} onClose={closeBrochurePopup} />
    </BrochureFormContext.Provider>
  );
};
