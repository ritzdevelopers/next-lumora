"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "lumora_hero_popup_dismissed";

const HeroIntroPopup = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    let dismissed = false;
    try {
      dismissed = !!sessionStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    if (dismissed) return;

    let fallbackTimer;
    const handleLoaderDone = () => {
      const t = setTimeout(() => setOpen(true), 200);
      fallbackTimer = t;
    };

    window.addEventListener("lumora:loader-done", handleLoaderDone, {
      once: true,
    });

    // Safety fallback: if the loader event never fires (e.g. loader not present),
    // open the popup after a safe delay so the user still sees it.
    const safety = setTimeout(() => {
      setOpen((prev) => prev || true);
    }, 4500);

    return () => {
      window.removeEventListener("lumora:loader-done", handleLoaderDone);
      clearTimeout(safety);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setShow(true));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleClose = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
    setShow(false);
    setTimeout(() => setOpen(false), 280);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 sm:p-6 transition-[opacity,backdrop-filter] duration-300 ease-out ${
        show ? "opacity-100 backdrop-blur-sm" : "opacity-0 backdrop-blur-0"
      }`}
      style={{
        zIndex: 2147483000,
        backgroundColor: show ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
        transition:
          "opacity 300ms ease-out, backdrop-filter 300ms ease-out, background-color 300ms ease-out",
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Lumora"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[78%] max-w-[300px] sm:w-full sm:max-w-[380px] md:max-w-[480px] lg:max-w-[860px] xl:max-w-[1040px] rounded-2xl overflow-hidden shadow-2xl border border-[#C89A6B]/40 bg-[#0e291a] transform transition-all duration-[450ms] ${
          show
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#C89A6B] hover:bg-[#b88757] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg"
          style={{ zIndex: 2 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="black"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative w-full overflow-hidden">
          <picture className="block w-full">
            <source
              media="(min-width: 1024px)"
              srcSet="/new/desktop%201920by920.jpg"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/new/tablate%20768by768%203.jpg"
            />
            <img
              src="/new/mobile%20458by810px%203.jpg"
              alt="AVACASA - Experience Luxury Living"
              className={`block w-full h-auto object-cover transform transition-transform duration-[900ms] ${
                show ? "scale-100" : "scale-[1.06]"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </picture>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default HeroIntroPopup;
