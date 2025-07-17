import { Link } from "react-router-dom";

export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <footer
      className="relative bg-fixed bg-center bg-cover text-white"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-blue-950 bg-opacity-95 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="flex items-end space-x-2 mb-4">
              <img
                src="/rentalRadarBg.png"
                alt="RentalRadar Logo"
                className="h-20 w-auto pr-2 border-r border-white"
              />
              <img
                src="/arcitecClean.png"
                alt="Arcitec Logo"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400">
              Simplifying the way you find your next rental home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white">Browse Properties</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <p className="text-sm">
              Email: <a href="mailto:support@rentalradar.com" className="hover:text-white">support@rentalradar.com</a>
            </p>
            <p className="text-sm mt-1">
              Phone: <a href="tel:+254712345678" className="hover:text-white">+254 712 345 678</a>
            </p>
            <p className="text-sm mt-4">
              Developed and managed by <br />
              <a href="https://arcitec.co.ke/" className="hover:text-blue-400 underline ">Arcitec IT company</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {year} arcitec. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
