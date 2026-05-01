import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/zoom";

import { FreeMode, Navigation, Keyboard, Zoom } from "swiper/modules";

export default function App() {
  const swiperRef = useRef(null);
  const lightboxSwiperRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Order: yoga, garden, lake, pool, skylounge
  const slides = [
    {
      title: "Yoga & Meditation Room",
      thumb: "/galleryImages/yoga452-561.jpg",
      desktop: "/galleryImages/yoga1920-900.jpg",
      mobile: "/galleryImages/yoga452-561.jpg",
    },
    {
      title: "Trellis Garden",
      thumb: "/galleryImages/garden-452-561.jpg",
      desktop: "/galleryImages/garden1920-900.jpg",
      mobile: "/galleryImages/garden-452-561.jpg",
    },
    {
      title: "Natural Lake",
      thumb: "/galleryImages/lake-452-561.jpg",
      desktop: "/galleryImages/lake1900-900.jpg",
      mobile: "/galleryImages/lake-452-561.jpg",
    },
    {
      title: "Infinity Pool",
      thumb: "/galleryImages/pool-452-561.jpg",
      desktop: "/galleryImages/pool-1920-900.jpg",
      mobile: "/galleryImages/pool-452-561.jpg",
    },
    {
      title: "Sky Lounge",
      thumb: "/galleryImages/skylounge1920-900.jpg",
      desktop: "/galleryImages/skylounge1920-900.jpg",
      mobile: "/galleryImages/skylounge1920-900.jpg",
    },
  ];

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
      {/* Close button */}
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
        {activeIndex + 1} / {slides.length}
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
            prevEl: ".lightbox-prev",
            nextEl: ".lightbox-next",
          }}
          onSwiper={(swiper) => {
            lightboxSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-20 py-16">
                <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={slide.desktop}
                    />
                    <img
                      src={slide.mobile}
                      alt={slide.title}
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                  </picture>
                </div>
                <p
                  style={{ fontFamily: "PlaRegular" }}
                  className="mt-4 text-white text-center text-[16px] md:text-[20px]"
                >
                  {slide.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev */}
        <button
          className="lightbox-prev absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center"
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
          className="lightbox-next absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center"
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
    <div className="w-full relative pb-24 md:pb-32">
       <Swiper
        spaceBetween={30}
        freeMode={true}
        loop={true}
        modules={[FreeMode, Navigation]}
        onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
        breakpoints={{
          0:    { slidesPerView: 1 },
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => openLightbox(index)}
              className="sliderCard group relative mx-auto aspect-[452/561] w-[78%] max-h-[55vh] sm:w-full sm:max-h-[60vh] lg:max-h-[70vh] cursor-pointer overflow-hidden"
            >
              <img
                src={slide.thumb}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className="hvDiv absolute bottom-0 left-0 w-full flex justify-center items-end h-full pb-4
                  translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{
                  backgroundImage: "url(/images/s4/slider/sliderOverlay.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <p style={{ fontFamily: "PlaRegular" }} className="font-[400] text-[16px] sm:text-[20px] text-white text-center">
                  {slide.title}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>



      {/* Buttons */}
      <div className="absolute bottom-4 md:bottom-8 z-[999] left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 flex gap-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="lft md:h-[80px] w-[50px] h-[50px] md:w-[80px]"
        >
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="40" fill="#C89A6B" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28.1 39.3a.94.94 0 000 1.3l8.7 8.8a1 1 0 001.4-1.4l-6.1-6.1h20.2a1 1 0 100-2H32l6.1-6.1a1 1 0 10-1.4-1.4l-8.7 8.7z"
              fill="black"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="rght md:h-[80px] w-[50px] h-[50px] md:w-[80px]"
        >
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="40" fill="#C89A6B" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M51.9 40.7a.94.94 0 000-1.3l-8.7-8.8a1 1 0 10-1.4 1.4l6.1 6.1H27.7a1 1 0 100 2h20.2l-6.1 6.1a1 1 0 101.4 1.4l8.7-8.7z"
              fill="black"
            />
          </svg>
        </button>
      </div>

      {mounted && lightboxOpen
        ? createPortal(Lightbox, document.body)
        : null}
    </div>
  );
}
