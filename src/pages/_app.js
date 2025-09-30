// _app.js
import { EnquiryFormProvider } from "@/context/EnquiryFormContext";
import { BrochureFormProvider } from "@/context/BrochureFormContext";
import FloatingActionButton from "@/components/FloatingActionButton";
import BrochureFloatingButton from "@/components/BrochureFloatingButton";
import "@/styles/globals.css";
import Head from "next/head";
import { useContext } from "react";
import { EnquiryFormContext } from "@/context/EnquiryFormContext";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { BrochureFormContext } from "@/context/BrochureFormContext";

function FloatingButtonWithContext() {
  const { openPopup } = useContext(EnquiryFormContext);
  const { openBrochurePopup } = useContext(BrochureFormContext);
  return <FloatingActionButton onClick={openPopup} />;
}

function BrochureFloatingButtonWithContext(){
  const { openBrochurePopup } = useContext(BrochureFormContext);
  return <BrochureFloatingButton onClick={openBrochurePopup} />;
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lumora - Home</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <EnquiryFormProvider>
        <BrochureFormProvider>
          <Component {...pageProps} />
          <WhatsAppFloat />
          <FloatingButtonWithContext />
          {/* <BrochureFloatingButtonWithContext /> */}
        </BrochureFormProvider>
      </EnquiryFormProvider>
    </>
  );
}
