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

const img = (src, title) => ({
  src,
  modalSrc: src,
  mobileModalSrc: src,
  title,
});

const Gallery = () => {
  const villaImages = [
    img("/gallery-new/villa-entrance.jpg", "Villa Entrance"),
    img(
      "/gallery-new/living-room-double-height.jpg",
      "Living Room with Double Height Ceiling"
    ),
    img(
      "/gallery-new/kitchen-breakfast-counter.jpg",
      "Kitchen with Extended Breakfast Counter"
    ),
    img("/gallery-new/dining-area.jpg", "Dining Area"),
    img("/gallery-new/bedroom-1.jpg", "Bedroom 1"),
    img("/gallery-new/washroom-1.jpg", "Washroom 1"),
    img("/gallery-new/stairs-and-elevator.jpg", "Stairs and Elevator"),
    img("/gallery-new/first-floor-lobby.jpg", "First Floor Lobby"),
    img("/gallery-new/bedroom-2.jpg", "Bedroom 2"),
    img("/gallery-new/washroom-2.jpg", "Washroom 2"),
    img("/gallery-new/bedroom-3.jpg", "Bedroom 3"),
    img("/gallery-new/washroom-3.jpg", "Washroom 3"),
    img("/gallery-new/balcony.jpg", "Balcony"),
    img("/gallery-new/villa-backyard.jpg", "Villa Backyard"),
    img("/gallery-new/private-cabana.jpg", "Private Cabana"),
    img("/gallery-new/private-pool.jpg", "Private Pool"),
  ];

  const officeImages = [
    img("/gallery-new/av-room.jpg", "AV Room"),
    img("/gallery-new/guest-lounge.jpg", "Guest Lounge"),
    img("/gallery-new/meeting-lounge.jpg", "Meeting Lounge"),
    img("/gallery-new/lounge-area.jpg", "Lounge Area"),
  ];

  const landscapingImages = [
    img("/gallery-new/garden-lawn.jpg", "Garden Lawn"),
    img("/gallery-new/guest-shuttle.jpg", "Guest Shuttle"),
    img("/gallery-new/palm-lawn.jpg", "Palm Lawn"),
    img("/gallery-new/landscaped-walkway.jpg", "Landscaped Walkway"),
  ];

  const constructionImages = [
    img("/gallery-new/entrance-gate.jpg", "Entrance Gate"),
    img(
      "/gallery-new/entrance-plaza-stone-setting.jpg",
      "Entrance Plaza Stone Setting"
    ),
    img("/gallery-new/site-progress-2.jpg", "Site Progress"),
    img("/gallery-new/foundation-work.jpg", "Foundation Work"),
  ];

  const sections = [
    { title: "The Villa", images: villaImages },
    { title: "Office Space", images: officeImages },
    { title: "Internal Green Landscaping", images: landscapingImages },
    { title: "Construction Update", images: constructionImages },
  ];

  const images = sections.flatMap((section) => section.images);

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
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-20 py-16">
                <div className="swiper-zoom-container w-full flex-1 flex items-center justify-center">
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={encodeURI(item.modalSrc || item.src)}
                    />
                    <img
                      src={encodeURI(
                        item.mobileModalSrc || item.modalSrc || item.src
                      )}
                      alt={item.title || `Gallery Image ${index + 1}`}
                      className="max-w-full h-auto max-h-[calc(75vh+60px)] object-contain -translate-y-0"
                    />
                  </picture>
                </div>
                {item.title && (
                  <h3 className="mt-4 cnzl text-[#C89A6B] text-[20px] md:text-[26px] text-center">
                    {item.title}
                  </h3>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

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

  let runningIndex = 0;

  return (
    <>
      <Head>
        <title>Lumora - Gallery</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header lgScreen="lg:w-full" />
      <section className="bg-[#0e291a] pb-12 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl text-[#cc9a64] sm:text-5xl">Our Gallery</h2>
            <p className="mt-4 text-lg font-athena text-gray-300">
              Every frame tells a story of quiet luxury of homes shaped by wind,
              wood, and wonder.
            </p>
          </div>

          {sections.map((section) => {
            const sectionStart = runningIndex;
            runningIndex += section.images.length;

            return (
              <div key={section.title}>
                <div className="text-center">
                  <h3
                    className={`${
                      sectionStart === 0 ? "mt-10" : "mt-16"
                    } cnzl text-[#C89A6B] text-[26px] sm:text-[22px] md:text-[25px] lg:text-[30px]`}
                  >
                    {section.title}
                  </h3>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {section.images.map((item, index) => {
                    const absoluteIndex = sectionStart + index;
                    return (
                      <button
                        type="button"
                        key={`${section.title}-${index}`}
                        onClick={() => openLightbox(absoluteIndex)}
                        className="group flex w-full flex-col text-center cursor-pointer"
                      >
                        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={item.src}
                            alt={item.title || `Gallery Image ${absoluteIndex + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover object-center"
                          />
                        </div>
                        {item.title && (
                          <h4
                            className={`mt-3 cnzl text-[#C89A6B] leading-tight min-h-[2.5em] flex items-start justify-center ${
                              item.title.length > 22
                                ? "text-[12px] md:text-[13px] lg:text-[14px]"
                                : "text-[16px] md:text-[18px]"                            }`}
                          >
                            {item.title}
                          </h4>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
