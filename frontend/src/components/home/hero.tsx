import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      className="relative bg-fixed bg-center bg-cover text-white"
      style={{
        backgroundImage: "url('/images/hero.jpg')" // replace with your actual image path
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Home</h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">Discover amazing rental properties in your area</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/properties" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Browse Properties
          </Link>
          <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
