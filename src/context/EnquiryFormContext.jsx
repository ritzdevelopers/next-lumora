import React, { createContext, useState } from "react";
import Popup from "@/components/Popup";
import { BannerEnquiryPopup } from "@/components/BannerEnquiryForm";

export const EnquiryFormContext = createContext();

export const EnquiryFormProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBannerEnquiryOpen, setIsBannerEnquiryOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openBannerEnquiry = () => setIsBannerEnquiryOpen(true);
  const closeBannerEnquiry = () => setIsBannerEnquiryOpen(false);

  return (
    <EnquiryFormContext.Provider
      value={{
        isPopupOpen,
        openPopup,
        closePopup,
        isBannerEnquiryOpen,
        openBannerEnquiry,
        closeBannerEnquiry,
      }}
    >
      {children}
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
      <BannerEnquiryPopup
        isOpen={isBannerEnquiryOpen}
        onClose={closeBannerEnquiry}
      />
    </EnquiryFormContext.Provider>
  );
};
