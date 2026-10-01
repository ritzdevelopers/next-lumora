import Amenities from "@/sections/Amenities";
import Footer from "@/sections/Footer";
import Homepage from "@/sections/Homepage";
import LuxuryAbout from "@/sections/LuxuryAbout";
import Proximities from "@/sections/Proximities";
import RedifineLuxury from "@/sections/RedifineLuxury";
import FloatingActionButton from "@/components/FloatingActionButton";
import BrochureFloatingButton from "@/components/BrochureFloatingButton";
import { useContext } from "react";
import { EnquiryFormContext } from "@/context/EnquiryFormContext";
import { BrochureFormContext } from "@/context/BrochureFormContext";

export default function Home() {
  const { openPopup } = useContext(EnquiryFormContext);
  const { openBrochurePopup } = useContext(BrochureFormContext);

  return (
    <>
    <Homepage/>
    <RedifineLuxury/>
    <LuxuryAbout />
    < Amenities/>
    < Proximities/>
    <Footer />
    {/* <FloatingActionButton onClick={openPopup} /> */}
    </>
  );
}
