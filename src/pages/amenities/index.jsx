import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Amenities = () => {
  const [selectedAmenityIndex, setSelectedAmenityIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const closeLightbox = () => setIsLightboxOpen(false);

  const amenities = [
    {
      title: "Walks & Trails",
      image:
        "/amenities-new/villa-backyard.jpg",
      popupImage:
        "/amenities-new/villa-backyard-big.jpg",
    },
    {
      title: "Infinity Pool",
      image:
        "/amenities-new/club-pool.jpg",
      popupImage:
        "/amenities-new/club-pool-big.jpg",
    },
    {
      title: "Club Terrace",
      image:
        "/amenities-new/club-terrace.jpg",
      popupImage:
        "/amenities-new/club-terrace-big.jpg",
    },
    {
      title: "Lawn",
      image:
        "/amenities-new/club-with-lawn.jpg",
      popupImage:
        "/amenities-new/club-with-lawn-big.jpg",
    },
    {
      title: "Lake Edge",
      image:
        "/amenities-new/lake.jpg",
      popupImage:
        "/amenities-new/lake-big.jpg",
    },
    {
      title: "F&B Area",
      image:
        "/amenities-new/outdoor-cafe.jpg",
      popupImage:
        "/amenities-new/outdoor-cafe-big.jpg",
    },
    {
      title: "Sports Arena",
      image:
        "/amenities-new/sports-Arena.jpg",
      popupImage:
        "/amenities-new/sports-arena-big.jpg",
    },
    {
      title: "Trellis Garden",
      image:
        "/amenities-new/trellis-garden.jpg",
      popupImage:
        "/amenities-new/trellis-garden-big.jpg",
    },
    {
      title: "Yoga Pavilion",
      image:
        "/amenities-new/yoga-new.jpg",
      popupImage:
        "/amenities-new/yoga-big.jpg",
    },
    {
      title: "Gymnasium",
      image:
        "/amenities-new/gym-new.jpg",
      popupImage:
        "/amenities-new/gym-new-big.jpg",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
    <Head>
        <title>Lumora - Amenities</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header lgScreen="lg:w-full" />
      <section className="bg-[#0e291a] pb-12 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#cc9a64] sm:text-5xl">
              Luxury Amenities
            </h2>
            <p className="mt-4 text-lg font-athena text-gray-300">
              Experience a lifestyle of comfort and convenience with our
              world-class amenities.
            </p>
          </div>

          {/* Masonry Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => {
                  setSelectedAmenityIndex(index);
                  setIsLightboxOpen(true);
                }}
              >
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                />
                {/* Modern Overlay */}
                <div className="absolute inset-0 bg-black/20 " />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-normal text-white">
                    {amenity.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isMounted && isLightboxOpen && selectedAmenityIndex !== null
        ? createPortal(
            <div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              style={{ zIndex: 2147483000 }}
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`${amenities[selectedAmenityIndex].title} image preview`}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  closeLightbox();
                }}
                aria-label="Close image preview"
                style={{ zIndex: 2147483001 }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center shadow-lg"
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
                className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 rounded-full bg-black/60 text-white text-sm sm:text-base"
                style={{ zIndex: 2147483001 }}
              >
                {selectedAmenityIndex + 1} / {amenities.length}
              </div>

              <button
                onClick={(event) => event.stopPropagation()}
                className="amenities-lightbox-prev absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center"
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
                onClick={(event) => event.stopPropagation()}
                className="amenities-lightbox-next absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#C89A6B] hover:bg-[#b88757] transition-colors flex items-center justify-center"
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

              <div
                className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <Swiper
                  modules={[Navigation, Keyboard]}
                  initialSlide={selectedAmenityIndex}
                  loop={true}
                  keyboard={{ enabled: true }}
                  navigation={{
                    prevEl: ".amenities-lightbox-prev",
                    nextEl: ".amenities-lightbox-next",
                  }}
                  onSlideChange={(swiper) => {
                    if (isLightboxOpen) {
                      setSelectedAmenityIndex(swiper.realIndex);
                    }
                  }}
                  className="w-full h-full"
                >
                  {amenities.map((amenity, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-20 py-16">
                        <img
                          src={amenity.popupImage || amenity.image}
                          alt={amenity.title}
                          className="max-w-full max-h-[80vh] object-contain"
                        />
                        <p
                          style={{ fontFamily: "PlaRegular" }}
                          className="mt-4 text-white text-center text-[16px] md:text-[20px]"
                        >
                          {amenity.title}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>,
            document.body
          )
        : null}
      <Footer />
    </>
  );
};

export default Amenities;
