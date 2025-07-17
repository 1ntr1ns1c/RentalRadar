import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section
      className="relative bg-fixed bg-center bg-cover text-white text-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')" // ✅ replace with your actual image
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your New Home?</h2>
        <p className="text-xl mb-8 text-blue-100">Join thousands of satisfied tenants who found their perfect rental</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/properties"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Searching
          </Link>
          <Link
            to="/register"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </section>
  );
}
