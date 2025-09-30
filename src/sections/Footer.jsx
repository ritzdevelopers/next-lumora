import { EnquiryFormContext } from "@/context/EnquiryFormContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Footer = () => {
    const { openPopup } = useContext(EnquiryFormContext);
  return (
    <footer className="relative bg-greenTheme pt-12 w-full px-8 ">
      
      <Image
        layout="fill"
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/Footer-Pattern.png"
        alt="footer-pattern"
      />
      <div className="relative">
      <div className="logo pb-4 sm:pl-8 w-[15%] min-w-[150px]">
      <Link href="/">
        <Image
          className="w-full h-auto"
          src="/logo.png"
          alt="footer-logo"
          width={325}
          height={90}
        />
      </Link>
      </div>
      <div className="w-full flex gap-[25px] flex-wrap sm:justify-around justify-between ">
        <p className=" sm:w-[33%] md:w-[28%] lg:text-[1.15vw] w-full text-white">
        At Lumora Estates, we craft havens where luxury flows gently with the land, and every space is shaped by stillness, sunlight, and intention.<br></br>
This is where sustainability whispers through design, and life finds rhythm beyond the noise.
        </p>
        
        <ul className="flex flex-col min-w-[150px] text-white gap-3">
        <li className="md:text-[2vw] 2xl:text-3xl sm:text-[3vw] 450:text-[5vw] text-[7vw]">Links</li>
          <li className="2xl:text-lg">
            <Link href="/about-us">Abouts us</Link>
          </li>
          <li className="cursor-pointer 2xl:text-lg">
            <Link href="/project/avacasa" className="block w-full h-full">
              Projects
            </Link>
          </li>
          <li className="2xl:text-lg">
            <Link href="/amenities">Amenities</Link>
          </li>
          <li className="2xl:text-lg">
            <Link href="/contact-us">Contact us</Link>
          </li>
          <li className="2xl:text-lg">
            <Link href="/gallery">Gallery</Link>
          </li>
          
        </ul>
        <div className=" sm:w-[33%] md:w-[28%] w-full text-white">
        <p className="font-cinzel sm:text-center 2xl:text-3xl md:text-[2vw] sm:text-[3vw] 450:text-[5vw] text-[7vw]">Address</p>
        <p className="sm:text-center text-start 2xl:text-lg">
        Lumora Estates Private Limited 8th Floor, <br /> KR Signature Tower, Sector 135, <br />Noida, Uttar Pradesh 201304
        </p>
        <p className="sm:text-center py-2 2xl:text-lg">
        Info@lumoraestates.com
        </p>
          
        </div>
        <ul className="flex flex-col gap-2 text-white">
          <li className="md:text-[2vw] sm:text-[3vw] 450:text-[5vw] 2xl:text-3xl text-[7vw]">Policies</li>
          <li className="2xl:text-lg">Privacy Policy</li>
          <li className="2xl:text-lg">Terms Of Use</li>
        </ul>
      </div>
      <div className="m-auto pt-4 w-[90%]">
      <hr className=" border-none h-[1px] bg-mainText" />
      <div className="flex sm:justify-between justify-center py-4 gap-4  flex-wrap-reverse items-center">
        <p className="text-mainText text-center">Lumora © Copyright 2025 All rights reserved</p>
        <ul className="flex items-center justify-center gap-3">
            <li>
              <a href="https://www.instagram.com/lumora_estates/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#cc9a64"
                  viewBox="0 0 448 512"
                >
                  <path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/people/Lumora-Estates/61571226150295/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#cc9a64"
                  viewBox="0 0 448 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@LumoraEstates/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#cc9a64"
                  viewBox="0 0 576 512"
                >
                  <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/105348363/admin/dashboard/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#cc9a64"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://x.com/lumoraofficial">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#cc9a64"
                  viewBox="0 0 448 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                </svg>
              </a>
            </li>
          </ul>
      </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
