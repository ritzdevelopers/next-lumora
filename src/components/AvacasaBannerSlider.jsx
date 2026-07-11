const AvacasaBannerSlider = () => {
  return (
    <div className="relative w-full aspect-[458/810] md:aspect-[1000/1230] lg:aspect-[1920/920] bg-[#0e291a]">
      <picture className="flex h-full w-full items-start justify-center">
        <source
          media="(min-width: 1024px)"
          srcSet="/avacasa-banners/Web-Banners_july-desktop.webp"
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/avacasa-banners/Web-Banners_july-tablet.webp"
          type="image/webp"
        />
        <img
          src="/avacasa-banners/Web-Banners_july-mobile.webp"
          alt="AVACASA - A luxury investment with long-term growth"
          width={458}
          height={810}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block w-full h-full object-contain object-top"
        />
      </picture>
    </div>
  );
};

export default AvacasaBannerSlider;
