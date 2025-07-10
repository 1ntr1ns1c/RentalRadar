import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/rentalRadar.png" 
              alt="RentalRadar Logo" 
              className="h-8 w-auto" 
            />
            <span className="text-xl font-bold text-blue-600">RentalRadar</span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Properties
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Auth Links - Desktop */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <>
                {user.role === 'landlord' && (
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
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
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Properties
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            
            {user ? (
              <>
                {user.role === 'landlord' && (
                  <Link 
                    to="/dashboard" 
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 px-4 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;