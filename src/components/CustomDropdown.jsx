import React, { useEffect, useRef, useState } from "react";

const CustomDropdown = ({
  label,
  name,
  value,
  options,
  placeholder,
  required = false,
  error,
  isOpen,
  onToggle,
  onSelect,
}) => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState(null);

  const updateMenuPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const menuHeight = Math.min(options.length * 44 + 8, 208);
    const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;

    setMenuStyle({
      position: "fixed",
      left: rect.left,
      width: rect.width,
      zIndex: 110,
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setMenuStyle(null);
      return;
    }

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen, options.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        onToggle(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onToggle]);

  const borderClass = error ? "border-red-500" : "border-gray-300";

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => onToggle(!isOpen)}
        className={`mt-1 flex w-full items-center justify-between px-3 py-2.5 sm:py-3 border rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-mainText ${borderClass}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <svg
          className={`h-5 w-5 text-gray-500 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && menuStyle && (
        <ul
          role="listbox"
          style={menuStyle}
          className="max-h-52 overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {options.map((option) => {
            const isSelected = value === option;

            return (
              <li key={option} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => onSelect(option)}
                  className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-greenTheme text-white"
                      : "text-gray-700 hover:bg-mainText/10 hover:text-greenTheme"
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomDropdown;
