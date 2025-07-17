import { FaUsers, FaHome, FaStar } from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Stats() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="relative bg-fixed bg-center bg-cover bg-no-repeat py-12 text-white"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white"
        >
          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <FaUsers className="text-5xl mb-3 animate-bounce" />
            <p className="text-5xl font-bold">+100</p>
            <p className="mt-2 text-gray-200">Registered Users</p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaHome className="text-5xl mb-3 animate-bounce" />
            <p className="text-5xl font-bold">+20</p>
            <p className="mt-2 text-gray-200">Properties Listed</p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <FaStar className="text-5xl mb-3 text-yellow-400 animate-bounce" />
            <p className="text-5xl font-bold">4.5</p>
            <p className="mt-2 text-gray-200">Average User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
