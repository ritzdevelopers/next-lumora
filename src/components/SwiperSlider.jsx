import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FreeMode, Navigation } from "swiper/modules";

export default function App() {
  const swiperRef = useRef(null);

  const slides = [
    { img: "/images/updated/yoga.jpg", title: "Yoga & Meditation Room" },
    { img: "/images/updated/Trellis-garden.jpg", title: "Hiking Trail" },
    { img: "/images/updated/Lake.jpg", title: "Natural Lake" },
    { img: "/images/updated/Club-Pool.jpg", title: "Infinity Pool" },
    { img: "/images/updated/Club-Terrace.jpg", title: "Sky Lounge" },
    { img: "/images/updated/Trellis-garden.jpg", title: "Wellness Garden" },
  ];

  return (
    <div className="w-full relative  h-[60vh] md:h-[120vh] xl:h-[109vh]">
       <Swiper
        spaceBetween={30}          // gap between slides (px)
        freeMode={true}
        loop={true}
        modules={[FreeMode, Navigation]}
        onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
        breakpoints={{
          0:    { slidesPerView: 1 }, // mobile
          768:  { slidesPerView: 2 }, // tablet
          1024: { slidesPerView: 3 }, // desktop
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
             {/* make slide content take full width so Swiper can size it */}
            <div className="sliderCard group relative w-full h-[300px] sm:h-[420px] md:h-[500px] lg:h-[692px] cursor-pointer overflow-hidden ">
              <img
                src={slide.img}
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
      <div className="absolute bottom-10 md:bottom-20 lg:bottom-0  z-[999] left-4 flex gap-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="lft md:h-[80px] w-[50px] h-[50px] md:w-[80px]"
        >
          {/* Left Arrow */}
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
          {/* Right Arrow */}
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
    </div>
  );
}
