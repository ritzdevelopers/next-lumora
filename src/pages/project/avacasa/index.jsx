import BrochureFloatingButton from "@/components/BrochureFloatingButton";
import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import Head from "next/head";
import Image from "next/image";
import { BrochureFormContext } from "@/context/BrochureFormContext";
import { useContext } from "react";
import NewProjectPage from "@/components/NewProjectPage";

const ProductPage = () => {
  const { openBrochurePopup } = useContext(BrochureFormContext);
  const bannerImages = [
    "/product1.jpg",
    "/product2.jpg",
    "/product3.jpg",
    "/product8.jpg",
    "/product5.jpg",
    "/product10.jpg",
    "/product21.jpg",
    "/product7.jpg",
    "/product4.jpg",
    "/product9.jpg",
    "/product6.jpg",
    "/product11.jpg",
    "/product12.jpg",
    "/product13.jpg",
    "/product15.jpg",
    "/product14.jpg",
    "/product16.jpg",
    "/product17.jpg",
    "/product19.jpg",
    "/product18.jpg",
    "/product20.jpg",
  ];

  return (
    <>
      <Head>
        <title>Lumora - Project Avacasa</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header lgScreen="lg:w-full" bgHeader="bg-greenTheme" />

      <NewProjectPage />

      <Footer />
    </>
  );
};

export default ProductPage;
