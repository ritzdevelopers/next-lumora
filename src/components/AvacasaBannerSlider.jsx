import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const bannerSlides = [
  {
    mobile: "/458x810/458%20x%20810-10.jpg",
    tablet: "/1000x1230/1000%20x%201230-07.jpg",
    desktop: "/1920x920/1920%20x%20920-01.jpg",
    alt: "AVACASA luxury villas - slide 1",
  },
  {
    mobile: "/458x810/458%20x%20810-11.jpg",
    tablet: "/1000x1230/1000%20x%201230-08.jpg",
    desktop: "/1920x920/1920%20x%20920-02.jpg",
    alt: "AVACASA luxury villas - slide 2",
  },
  {
    mobile: "/458x810/458%20x%20810-12.jpg",
    tablet: "/1000x1230/1000%20x%201230-09.jpg",
    desktop: "/1920x920/1920%20x%20920-03.jpg",
    alt: "AVACASA luxury villas - slide 3",
  },
];

const AvacasaBannerSlider = () => {
  return (
    <div className="relative w-full aspect-[458/810] md:aspect-[1000/1230] lg:aspect-[1920/920] bg-[#0e291a]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={900}
        className="h-full w-full [&_.swiper-wrapper]:h-full [&_.swiper-slide]:h-full"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.desktop} className="h-full w-full">
            <picture className="flex h-full w-full items-start justify-center">
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              <source media="(min-width: 768px)" srcSet={slide.tablet} />
              <img
                src={slide.mobile}
                alt={slide.alt}
                className="block w-full h-full object-contain object-top"
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AvacasaBannerSlider;
