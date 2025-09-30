import Header from '@/components/Header';
import Footer from '@/sections/Footer';
import Head from 'next/head';
import Image from 'next/image';

const Gallery = () => {
  const images = [
    "/galleryImages/gallery300X320_1.png",
    "/galleryImages/gallery300X380_5.png",
    "/galleryImages/gallery300X380_4.png",
    "/galleryImages/gallery300X320_2.png",
    "/galleryImages/gallery300X320_3.png",
    "/galleryImages/gallery300X380_2.jpg",
    "/galleryImages/gallery300X380_1.jpg",
    "/galleryImages/gallery300X320_4.jpg",
    
  ];
  return (
    <>
    <Head>
        <title>Lumora - Gallery</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    <Header lgScreen="lg:w-full" /> 
    <section className="bg-[#0e291a] pb-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl text-[#cc9a64] sm:text-5xl">
            Our Gallery
          </h2>
          <p className="mt-4 text-lg font-athena text-gray-300">
          Every frame tells a story of quiet luxury of homes shaped by wind, wood, and wonder.
          </p>
        </div>

        {/* Masonry Grid Gallery */}
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 break-inside-avoid"
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                width={400}
                height={600}
                className="w-full h-auto object-cover"
              />
              
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Gallery;