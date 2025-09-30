import Header from "@/components/Header";
import { EnquiryFormContext } from "@/context/EnquiryFormContext";
import Footer from "@/sections/Footer";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";

const AboutUs = () => {
  const { openPopup } = useContext(EnquiryFormContext);
  return (
    <>
    <Head>
        <title>Lumora - About Us</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header lgScreen="lg:w-full" bgHeader="bg-greenTheme"/>
      <div className="relative">
        {/* Image */}
        <div className="450:hidden overflow-hidden h-[500px]">
          <Image
            src="/aboutBannerMob.png"
            alt="aboutBanner"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Image for large screens (above 450px) */}
        <div className="hidden overflow-hidden h-[500px] 450:block">
          <Image
            src="/aboutBanner.png"
            alt="aboutBanner"
            layout="fill"
            objectFit="cover"
          />
        </div>

      
      </div>
      <section className="bg-mainText pt-12 pb-6 sm:px-6 lg:px-8 px-3">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl text-greenTheme sm:text-5xl">About Us</h2>
            <p className="mt-4 text-lg font-athena text-black">
              At Lumora Estates, we create sanctuaries that one can call their second home. Here, green isn't just an aesthetic but it's a lifestyle and a modern luxury. It's about finding exquisite comfort in the very heart of nature. 
            </p>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <picture>
                {/* Image for small screens (up to 450px) */}
                <source
                  media="(max-width: 450px)"
                  srcSet="/aboutMob.png"
                />
                {/* Image for large screens (above 450px) */}
                <source
                  media="(min-width: 451px)"
                  srcSet="/aboutDesktop.png"
                />
                {/* Fallback image */}
                <Image
                  src="/aboutDesktop.png"
                  alt="About Us"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl animate-scale-infinite"
                />
              </picture>
            </div>

            {/* Text Section */}
            <div className="space-y-6">
              <h3 className="text-3xl text-greenTheme">Who We Are</h3>
              <p className="text-lg text-black">
                Founded in 2024 and headquartered in Noida, Lumora Estates is devoted to crafting bespoke second homes for those who seek more than just luxury – for those who truly desire peace and tranquility..
              </p>
              <p className="text-lg text-black">
                Backed by visionary leadership and a passionate team, we bring intricate designs to our core commitment to sustainability.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={openPopup}
                  className="px-6 py-3 bg-white text-greenTheme font-poppins rounded-md transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {/* First Row: Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-greenTheme">
              Our Mission
            </h2>
            <p className="text-gray-700">
              To reimagine second-home living as a profound experience
where elegance is intuitive, sustainability at core, and every
detail is shaped with a motive. We are committed to creating
sanctuaries that elevate lifestyles while thinking about the land
they stand on.  

            </p>
          </div>

          {/* Vision */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-greenTheme">
              Our Vision
            </h2>
            <p className="text-gray-700">
              To become a name synonymous with thoughtful luxury, recognized not only for our beautiful architecture but for the emotional resonance of our spaces. We envision landscapes where our homes aren't just built; they belong, seamlessly integrating with the existing environment. For us, sustainability is at the very core of every property we build.
            </p>
          </div>
        </div>

        {/* Second Row: Core Values and Expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Core Values */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-greenTheme">
              Our Core Values
            </h2>
            <ul className="space-y-4 text-gray-700 font-poppins">
              <li className="font-poppins">
                <strong>Customer-Centric Approach:</strong> We design every experience around what matters most to our customers.
              </li>
              <li className="font-poppins">
                <strong>Innovative Thinking:</strong> We challenge convention and embrace creativity to deliver future-forward living.
              </li>
              <li className="font-poppins">
                <strong>Integrity at the Core:</strong>Transparency, honesty, and trust guide every decision we make.
              </li>
              <li className="font-poppins">
                <strong>Commitment to Sustainability:</strong>We build with care for the land, for the future, and for generations to come.
              </li>
              <li className="font-poppins">
                <strong>Collaborative Spirit:</strong> We believe great ideas grow stronger together. Teamwork fuels our success.
              </li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-greenTheme">
              What Makes Us Unique
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="font-poppins">
                <strong>Seamless Access, Serene Surroundings: </strong>Our projects strike the perfect balance well-connected to major cities yet peacefully nestled in nature.
              </li>
              <li className="font-poppins">
                <strong>Holistic Living Experiences: </strong>Every home is built with wellness at its heart: from biophilic architecture and clean-air systems to tranquil yoga and meditation zones.
              </li>
              <li className="font-poppins">
                <strong>Future-Forward Communities: </strong>We create smart, sustainable neighborhoods with IoT-ready infrastructure and eco-conscious design.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-greenTheme">
              Our Team
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="font-poppins">
                Our team is a dynamic blend of real estate veterans and creative visionaries united by passion, precision, and purpose. Together, we transform Lumora’s vision into soulful sanctuaries that endure             </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-greenTheme">
              Why Choose Us
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="font-poppins">
                You seek a home that fosters calm as much as comfort.
              </li>
              <li className="font-poppins">
                You value direct yet gentle connections with nature.
              </li>
              <li className="font-poppins">
              You believe in sustainable luxury and thoughtful design.
              </li>
              <li className="font-poppins">
              You expect quality, transparency, and trust every step of the way.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
