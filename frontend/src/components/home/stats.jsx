import { FaUsers, FaHome, FaStar } from "react-icons/fa";

export default function Stats() {
  return (
    <section
      className="relative bg-fixed bg-center bg-cover bg-no-repeat py-2 text-white"
      style={{
        backgroundImage: "url('/images/hero.jpg')", // Replace with your own image path
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
        {/* <h2 className="text-3xl font-bold text-white mb-10" data-aos="fade-up">
          Trusted by Many
        </h2> */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex flex-col items-center">
            <FaUsers className="text-5xl mb-3" />
            <p className="text-5xl font-bold">+100</p>
            <p className="mt-2 text-gray-200">Registered Users</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHome className="text-5xl mb-3" />
            <p className="text-5xl font-bold">+20</p>
            <p className="mt-2 text-gray-200">Properties Listed</p>
          </div>
          <div className="flex flex-col items-center">
            <FaStar className="text-5xl mb-3 text-yellow-400" />
            <p className="text-5xl font-bold">4.5</p>
            <p className="mt-2 text-gray-200">Average User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
