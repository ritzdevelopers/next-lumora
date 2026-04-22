import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

import { Navigation, Keyboard, Zoom } from "swiper/modules";

const Gallery = () => {
  const images = [
    "/galleryImages/gallery300X320_1.png",
    "/galleryImages/gallery300X380_5.png",
    "/galleryImages/gallery300X380_4.png",
    "/galleryImages/gallery300X320_2.png",
    "/galleryImages/gallery300X320_3.png",
    "/galleryImages/gallery300X380_2.jpg",
    "/galleryImages/gallery300X380_1.jpg",
    "/galleryImages/gallery300X320_4.jpg",
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const lightboxSwiperRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  useEffect(() => {
    if (lightboxOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  const Lightbox = (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      style={{ zIndex: 2147483000 }}
      onClick={closeLightbox}
      role="dialog"
      aria-modal="true"
    >
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeLightbox();
        }}
        aria-label="Close gallery"
        style={{ zIndex: 2147483001 }}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center shadow-lg"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6L18 18M6 18L18 6"
            stroke="black"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Counter */}
      <div
        className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 rounded-full bg-black/60 text-white text-sm md:text-base"
        style={{ zIndex: 2147483001 }}
      >
        {activeIndex + 1} / {images.length}
      </div>

      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Navigation, Keyboard, Zoom]}
          initialSlide={activeIndex}
          loop={true}
          keyboard={{ enabled: true }}
          zoom={true}
          navigation={{
            prevEl: ".gallery-lightbox-prev",
            nextEl: ".gallery-lightbox-next",
          }}
          onSwiper={(swiper) => {
            lightboxSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex items-center justify-center px-4 md:px-20 py-16">
                <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev */}
        <button
          className="gallery-lightbox-prev absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center"
          aria-label="Previous image"
          style={{ zIndex: 2147483001 }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28.1 39.3a.94.94 0 000 1.3l8.7 8.8a1 1 0 001.4-1.4l-6.1-6.1h20.2a1 1 0 100-2H32l6.1-6.1a1 1 0 10-1.4-1.4l-8.7 8.7z"
              fill="black"
            />
          </svg>
        </button>

        {/* Next */}
        <button
          className="gallery-lightbox-next absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center"
          aria-label="Next image"
          style={{ zIndex: 2147483001 }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M51.9 40.7a.94.94 0 000-1.3l-8.7-8.8a1 1 0 10-1.4 1.4l6.1 6.1H27.7a1 1 0 100 2h20.2l-6.1 6.1a1 1 0 101.4 1.4l8.7-8.7z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Lumora - Gallery</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header lgScreen="lg:w-full" />
      <section className="bg-[#0e291a] pb-12 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-4xl text-[#cc9a64] sm:text-5xl">Our Gallery</h2>
            <p className="mt-4 text-lg font-athena text-gray-300">
              Every frame tells a story of quiet luxury of homes shaped by wind,
              wood, and wonder.
            </p>
            <h3 className="mt-10 cnzl text-[#C89A6B] text-[26px] sm:text-[22px] md:text-[25px] lg:text-[30px]">
              Ground Floor
            </h3>
          </div>

          {/* Masonry Grid Gallery */}
          <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((src, index) => (
              <button
                type="button"
                key={index}
                onClick={() => openLightbox(index)}
                className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 break-inside-avoid block w-full cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>

          <div className="text-center">
            <h3 className="mt-16 cnzl text-[#C89A6B] text-[26px] sm:text-[22px] md:text-[25px] lg:text-[30px]">
              First Floor
            </h3>
          </div>
        </div>
      </section>
      <Footer />

      {mounted && lightboxOpen
        ? createPortal(Lightbox, document.body)
        : null}
    </>
  );
};

export default Gallery;
