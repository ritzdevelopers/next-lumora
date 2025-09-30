import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {ViewContainer} from "./Homepage";
import gsap from "gsap";



const RedifineLuxury = () => {
  // const paraContent = [
  //   "Nature Retreat",
  //   "Future-Ready Development",
  //   "Wellness Living",
  //   "Quality and Innovation",
  // ];
  const Content=[
    {
      image: "/Nature-Retreat.jpg",
      alt: "Nature Retreat_img",
      title: "Nature Retreat",
      // icon: "/Nature-icon.png",

    },
    {
      image: "/Ready-Development.jpg",
      alt: "Future-Ready Development_img",
      title: "Future-Ready Development",
      // icon: "/Nature-icon.png",

    },
    {
      image: "/Wellness-Living.jpg",
      alt: "Wellness Living_img",
      title: "Wellness Living",
      // icon: "/Nature-icon.png",

    },
    {
      image: "/Crafted-Excellence.jpg",
      alt: "Quality and Innovation_img",
      title: "Quality and Innovation",
      // icon: "/Nature-icon.png",
    }
  ]
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.to(logoRef.current, {
      rotation: 360, // Rotate 360 degrees
      duration: 165,  // Duration of one full rotation (seconds)
      repeat: -1,    // Infinite rotation
      ease: "linear" // Smooth continuous rotation
    });
  }, []);
  return (
    <section className="">
      <div className="w-full flex flex-col items-center ">
        <h1 className="lg:text-4xl sm:text-3xl text-2xl text-center text-themeText 450:pt-[3rem] pt-[2rem] pb-[1.5rem] font-medium">
          Can luxury feel like coming home?
        </h1>
        <p className="text-center 450:w-[70%] w-[90%] pb-[0.75rem] sm:text-lg text-sm">
          Wake up by forest foothills, sip slow mornings in open greens, and gather under starlit skies. This is what coming home should feel like.
        </p>
      </div>
      <div className="w-full relative pt-4">
        <div className="absolute z-10 left-[50%] top-[15%] translate-x-[-10%] w-[20%]">
        <Image
          ref={logoRef} 
          width={334} height={334} layout="responsive"
          className="w-full "
          src="/Logo-circle.png"
          alt="redefine-logo"
        />
        </div>

        <Image
          width={1920} height={1108} layout="responsive"
          src="/are_you_ready.png"
          alt="luxury-img"
          className="w-full object-cover relative z-20"
        />

        <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none"></div>
      </div>
      <div className="flex flex-wrap w-full bg-creamBg justify-evenly">
        {/* {paraContent.map((content, index) => (
          <div
            className="flex flex-col px-6 md:py-8 py-4 md:gap-4 gap-2 items-center jusitify-center sm:w-[20%] w-[50%]"
            key={index}
          >
            <h1 className="lg:text-5xl text-3xl font-semibold text-themeText">
              {index + 1}
            </h1>
            <h2 className="450:w-[60%] w-full md:text-lg font-athena text-sm text-center font-semibold text-themeText">
              {content}
            </h2>
          </div>
        ))} */}
        <ViewContainer items={Content}/>
      </div>
    </section>
  );
};

export default RedifineLuxury;
