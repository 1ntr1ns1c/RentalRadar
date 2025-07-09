import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/rentalRadar.png" alt="RentalRadar Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-blue-600">RentalRadar</span>
          </Link>

          {/* Desktop Links - Center */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-blue-600 font-medium">
              Properties
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact Us
            </Link>
          </div>

          {/* Auth Links - Right */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link to="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/properties" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Properties
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
                <Link to="/register" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}