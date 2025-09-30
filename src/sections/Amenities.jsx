import Image from "next/image";
import Link from "next/link";

// Each grid array should contain 12 objects with unique data
const sections1 = [
  {
    theme: "bg-greenTheme text-white",
    image: "/Scenic-View.jpg",
    alt: "amenities_img",
  },
  {
    theme: "bg-greenTheme font-semibold text-white",
    image: "",
    text: "Scenic Views",
  },
  {
    theme: "bg-creamBg font-semibold",
    image: "",
    text: "Hiking",
  },
  {
    theme: "bg-greenTheme text-white",
    image: "/Hiking.jpg",
    alt: "amenities_img",
  },
  {
    theme: "bg-greenTheme text-white",
    image: "/Organic-Kitchen-Garden.jpg",
    alt: "amenities_img",
  },
  {
    theme: "bg-greenTheme font-semibold text-white",
    image: "",
    text: "Organic Kitchen Garden",
  },
];

const sections2 = [
  {
    theme: "bg-greenTheme text-white",
    image: "/Basket-Ball.jpg",
    alt: "amenitiesImg",
  },
  {
    theme: "bg-greenTheme font-semibold text-white",
    image: "",
    text: "Basketball Court",
  },
  {
    theme: "bg-creamBg font-semibold",
    image: "",
    text: "Gym",
  },
  {
    theme: "bg-greenTheme text-white",
    image: "/Gym.jpg",
    alt: "amenitiesImg",
  },
  {
    theme: "bg-greenTheme text-white",
    image: "/Lazy_river.png",
    alt: "amenitiesImg",
  },
  {
    theme: "bg-greenTheme font-semibold text-white",
    image: "",
    text: "Lazy River",
  },
];

const sections3 = [
  {
    theme: "bg-greenTheme text-white",
    image: "/Infinity-Swimming-Pool.jpg",
    alt: "amenitiesImg",
  },
  {
    theme: "bg-greenTheme font-semibold text-white",
    image: "",
    text: "Infinity Swimming Pool",
  },
  {
    theme: "bg-creamBg font-semibold",
    image: "",
    text: "Yoga And Meditation",
  },
  {
    theme: "bg-greenTheme text-white",
    image: "/Yoga-&-Meditation-Zones.jpg",
    alt: "amenitiesImg",
  },
  {
    theme: "bg-greenTheme text-white",
    image: "/Spa-&-Sauna.jpg",
    alt: "amenitiesImg",
  },
  {
    theme: "bg-greenTheme font-semibold text-white",
    image: "",
    text: "Spa & Sauna",
  },
];

const GridSection = ({ sections }) => {
  return (
    <div className="lg:w-1/3 md:w-1/2 sm:w-full w-full flex flex-wrap">
      {sections.map((section, index) => (
        <div key={index} className="w-[50%] aspect-[4/3]">
          {index % 4 === 0 || index % 4 === 3 ? (
            <div className="w-full h-full">
              <Image
                width={150}
                height={160}
                src={section.image}
                alt={section.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-full h-full ${section.theme} flex items-center justify-center`}
            >
              <p className="w-[45%] text-center">{section.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Amenities = () => {
  return (
    <section className="pt-12">
      <h1 className="text-4xl text-themeText text-center pb-6">Amenities</h1>
      

      <div className="w-full flex flex-wrap justify-center">
        {/* For large screens (lg and above): 3 parent sections */}
        <div className="lg:flex hidden">
          <GridSection sections={sections1} />
          <GridSection sections={sections2} />
          <GridSection sections={sections3} />
        </div>

        {/* For medium screens (above sm but below lg): 2 parent sections */}
        <div className="sm:flex lg:hidden hidden">
          <GridSection sections={sections1} />
          <GridSection sections={sections2} />
        </div>

        {/* For small screens (sm and below): 1 parent section */}
        <div className="450:flex sm:hidden">
          <GridSection sections={sections1} />
        </div>
      </div>
      <h2 className="text-center pt-8">
        <Link
          href="/amenities"
          className="px-4 py-2 text-white bg-greenTheme text-lg hover:bg-mainText transition-all duration-300 hover:text-black"
        >
          View More
        </Link>
      </h2>
    </section>
  );
};

export default Amenities;
