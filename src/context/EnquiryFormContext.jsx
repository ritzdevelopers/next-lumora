import React, { createContext, useState, useEffect } from "react";
import Popup from "@/components/Popup";
import { BannerEnquiryPopup } from "@/components/BannerEnquiryForm";

export const EnquiryFormContext = createContext();

const MOBILE_TABLET_MQ = "(max-width: 1023px)";
const AUTO_OPEN_STORAGE_KEY = "lumora_banner_enquiry_auto_shown";
const AUTO_OPEN_DELAY_MS = 2500;

export const EnquiryFormProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBannerEnquiryOpen, setIsBannerEnquiryOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openBannerEnquiry = () => setIsBannerEnquiryOpen(true);
  const closeBannerEnquiry = () => setIsBannerEnquiryOpen(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia(MOBILE_TABLET_MQ).matches) return;

    try {
      if (sessionStorage.getItem(AUTO_OPEN_STORAGE_KEY)) return;
    } catch (e) {}

    const timer = setTimeout(() => {
      if (!window.matchMedia(MOBILE_TABLET_MQ).matches) return;
      try {
        sessionStorage.setItem(AUTO_OPEN_STORAGE_KEY, "1");
      } catch (e) {}
      setIsBannerEnquiryOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

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
