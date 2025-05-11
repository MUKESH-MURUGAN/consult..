import React, { useState, useEffect } from "react";

import tea01 from "../assets/tea01.jpg";
import tea02 from "../assets/tea02.jpg";
import tea03 from "../assets/tea03.jpg";
import tea04 from "../assets/tea04.jpg";
import tea05 from "../assets/tea05.jpg";
import tea06 from "../assets/tea06.jpg";
import tea07 from "../assets/tea07.jpg";
import tea08 from "../assets/tea08.jpg";
import tea09 from "../assets/tea09.jpg";
import heroImage from "../assets/hero01.webp"; // Hero image too

const images = [tea01, tea02, tea03, tea04, tea05, tea06, tea07, tea08, tea09];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 bg-gray-300">
      {/* Hero Section */}
      <div className="w-full relative">
  {/* Hero Image */}
  <img
    src={heroImage}
    alt="Hero Banner"
    className="w-full h-[70vh] object-cover"
  />

  {/* Overlay Text */}
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-6xl md:text-8xl font-bold drop-shadow-lg">
      TASTE
      IT
    </h1>
  </div>
</div>


      {/* Slider Section */}
      <div className="w-full flex justify-center mt-10 ">
        <div className="w-150 h-100 relative overflow-hidden rounded-xl shadow-lg mb-10">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full mt-10 p-4"> 
        <h2 className="text-2xl font-bold text-center mb-4">REVIEWS</h2>
        <p className="text-center mb-6">WHAT OUR CUSTOMERS WRITE ABOUT US</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold">AKHIL KUMAR</h3>
            <div className="text-yellow-500">★★★</div>
            <p className="text-sm mt-2">Nice place to have a tea-break. Short eats are also available.</p>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold">INDHU</h3>
            <div className="text-yellow-500">★★★★★</div>
            <p className="text-sm mt-2">Wonderful tea! Literally the best I ever had! Ginger and Cardamom tea are the best! Might take some time to get the order because it'll be little crowded but the tea is worth it totally!</p>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold">GOWTHAM KING</h3>
            <div className="text-yellow-500">★★★★★</div>
            <p className="text-sm mt-2">Loved this tea recently and we can find more number of outlets in kongu belt area. I wonder more number of people visiting this shop</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;