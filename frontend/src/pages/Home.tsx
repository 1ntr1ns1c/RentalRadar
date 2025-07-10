import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import ServiceCard from '../components/ServiceCard';

// Mocked data matching DB schema
const mockProperties = [
  {
    id: 1,
    title: 'Modern Apartment',
    city: 'Nairobi',
    neighbourhood: 'Westlands',
    price: 1200.00,
    bedrooms: 3,
    bathrooms: 2,
    property_type: 'apartment',
    images: ['/images/apt1.jpg'],
    is_available: true
  },
  {
    id: 2,
    title: 'Cozy House',
    city: 'Nairobi',
    neighbourhood: 'Kilimani',
    price: 1500.00,
    bedrooms: 4,
    bathrooms: 3,
    property_type: 'house',
    images: ['/images/house1.jpg'],
    is_available: true
  },
  {
    id: 3,
    title: 'Studio Unit',
    city: 'Nairobi',
    neighbourhood: 'Karen',
    price: 700.00,
    bedrooms: 1,
    bathrooms: 1,
    property_type: 'studio',
    images: ['/images/studio1.jpg'],
    is_available: false
  }
];

const services = [
  { id: 1, name: 'Centralized Listings', desc: 'Access all available rentals in one place', icon: '📋' },
  { id: 2, name: 'Advanced Filtering', desc: 'Filter by city, bedrooms, price, and property type', icon: '🔍' },
  { id: 3, name: 'Direct Inquiries', desc: 'Message caretakers instantly through the platform', icon: '💬' },
  { id: 4, name: 'Admin-Verified', desc: 'Listings vetted by admin for accuracy', icon: '✔️' }
];

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState<number | ''>('');

  const handleSearch = () => {
    // TODO: Navigate to properties page with filters
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (bedrooms) params.append('bedrooms', bedrooms.toString());
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Next Home</h1>
          <p className="text-xl mb-8 text-blue-100">Centralized, filtered, and vetted rental listings at your fingertips.</p>
          
          {/* Search Filters */}
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City (e.g., Nairobi)"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <select
                value={bedrooms || ''}
                onChange={e => setBedrooms(e.target.value ? Number(e.target.value) : '')}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              >
                <option value="">Any Bedrooms</option>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n} Bedroom{n > 1 ? 's' : ''}</option>
                ))}
              </select>
              <button 
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow px-6 py-12">
        {/* Featured Properties */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Properties</h2>
              <p className="text-gray-600">Discover the latest available rentals in your area</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProperties.filter(p => p.is_available).map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                to="/properties" 
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Properties
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Why Choose RentalRadar?</h2>
              <p className="text-gray-600">Everything you need to find your perfect rental home</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(s => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Find Your Home?</h2>
            <p className="text-gray-600 mb-8">Join thousands of tenants who have found their perfect rental through RentalRadar</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/properties" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Properties
              </Link>
              {!user && (
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">RentalRadar</h3>
            <p className="text-gray-400">Your all-in-one rental search platform.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              {user ? (
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              ) : (
                <>
                  <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                  <li><Link to="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>Email: support@rentalradar.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: Nairobi, Kenya</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400">
          &copy; 2025 RentalRadar. All rights reserved.
        </div>
      </footer>
    </div>
  );
}