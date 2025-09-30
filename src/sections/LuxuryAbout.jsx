import { EnquiryFormContext } from "@/context/EnquiryFormContext";
import Image from "next/image";
import React, { useContext } from "react";

const LuxuryAbout = () => {
  const { openPopup } = useContext(EnquiryFormContext);
  return (
    <>
      <section className="md:py-16 py-8">
        <div className="flex flex-wrap gap-24 justify-center  items-center">
          <div className="img xl:w-[510px] sm:w-[480px] relative sm:h-[480px] 450:w-[300px] w-[260px] h-[280px] xl:h-[510px] after:content-[''] after:absolute after:bg-[#0e291a] after:-bottom-[20px] sm:after:left-[122px] 450:after:left-[80px] after:right-[27.5%] after:w-[80%] after:h-[80%] after:z-[-1]">
            <Image
              fill
              layout="fill"
              className="w-full h-full object-cover"
              src="/Luxury-retreat.jpg"
              alt="luxury-about"
            />
          </div>
          <div className="content xl:w-[510px] w-[475px] -translate-y-8 sm:px-0 px-4">
            <h1 className="lg:text-4xl text-3xl text-start text-themeText">Lumora Estates</h1>
            <h1 className="lg:text-4xl text-3xl text-start text-themeText">The evergreen luxury </h1>
            <p className="py-8 leading-normal">
              Founded in 2024 and headquartered in Noida, Lumora Estates is devoted to crafting bespoke second homes for those who seek more than just luxury – for those who truly desire peace and tranquility.
Backed by visionary leadership and a passionate team, we bring intricate designs to our core commitment to sustainability
            </p>
          </div>
        </div>
      </section>
      <div className="schedule-visit w-full relative h-[250px] md:py-6 py-4 flex flex-col justify-center gap-6 items-center">
        <div className="absolute w-full h-full -z-[10]">
          <Image layout="fill" className="w-full h-full" src="/Golden-pattern.png" alt="Golden Pattern" />
        </div>
        <h2 className="lg:text-4xl text-3xl text-white font-normal">Schedule a visit</h2>
        <p className="lg:w-[50%] sm:w-[70%] w-[95%] text-center text-white leading-normal">
          Getting started on your home-buying journey can be overwhelming & can
          deter you from taking the first step
        </p>
        <button onClick={openPopup} className="py-2 px-5 bg-white font-cinzel sm:text-xl">
          Take the first step
        </button>
      </div>
    </>
  );
};

export default LuxuryAbout;
