import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import Head from "next/head";
import NewProjectPage from "@/components/NewProjectPage";

const ProductPage = () => {
  return (
    <>
      <Head>
        <title>Lumora - Project Avacasa</title>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="preload"
          as="image"
          href="/avacasa-banners/Web-Banners_green.webp"
          media="(max-width: 767px)"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/avacasa-banners/Web-Banners_green-2.webp"
          media="(min-width: 768px) and (max-width: 1023px)"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/avacasa-banners/Web-Banners_green-4.webp"
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
