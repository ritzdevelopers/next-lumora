"use client";
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[85] hidden md:flex bg-greenTheme hover:bg-mainText text-white hover:text-greenTheme w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center group"
      aria-label="Inquiry"
    >
      <FaQuestionCircle className="text-2xl group-hover:scale-110 transition-transform duration-300" />
      
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-greenTheme text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-cinzel">
        Inquiry
      </span>
    </button>
  );
};

export default FloatingActionButton;
