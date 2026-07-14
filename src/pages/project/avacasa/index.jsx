import BrochureFloatingButton from "@/components/BrochureFloatingButton";
import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import Head from "next/head";
import Image from "next/image";
import { BrochureFormContext } from "@/context/BrochureFormContext";
import { EnquiryFormContext } from "@/context/EnquiryFormContext";
import { useContext, useEffect } from "react";
import NewProjectPage from "@/components/NewProjectPage";

const AVACASA_ENQUIRY_AUTO_KEY = "lumora_avacasa_enquiry_auto_shown";

const ProductPage = () => {
  const { openBrochurePopup } = useContext(BrochureFormContext);
  const { openBannerEnquiry } = useContext(EnquiryFormContext);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = !!sessionStorage.getItem(AVACASA_ENQUIRY_AUTO_KEY);
    } catch (e) {}

    if (alreadyShown) return;

    const timer = setTimeout(() => {
      openBannerEnquiry();
      try {
        sessionStorage.setItem(AVACASA_ENQUIRY_AUTO_KEY, "1");
      } catch (e) {}
    }, 3500);

    return () => clearTimeout(timer);
  }, [openBannerEnquiry]);

  return (
    <>
      <Head>
        <title>Lumora - Project Avacasa</title>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="preload"
          as="image"
          href="/avacasa-banners/Web-Banners_july-mobile.webp"
          media="(max-width: 767px)"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/avacasa-banners/Web-Banners_july-tablet.webp"
          media="(min-width: 768px) and (max-width: 1023px)"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/avacasa-banners/Web-Banners_july-desktop.webp"
          media="(min-width: 1024px)"
          type="image/webp"
        />
      </Head>

      <Header lgScreen="lg:w-full" bgHeader="bg-greenTheme" />

      <NewProjectPage />

      <Footer />
    </>
  );
};

export default ProductPage;
