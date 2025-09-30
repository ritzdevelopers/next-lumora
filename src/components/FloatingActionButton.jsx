"use client";
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-greenTheme hover:bg-mainText text-white hover:text-greenTheme w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
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
