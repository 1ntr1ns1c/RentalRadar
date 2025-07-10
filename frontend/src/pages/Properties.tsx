import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar.tsx';
import PropertyCard from '../components/PropertyCard';

// Mock data, replace with API fetch
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
  },
  {
    id: 4,
    title: 'Luxury Condo',
    city: 'Mombasa',
    neighbourhood: 'Nyali',
    price: 2000.00,
    bedrooms: 2,
    bathrooms: 2,
    property_type: 'condo',
    images: ['/images/condo1.jpg'],
    is_available: true
  },
  {
    id: 5,
    title: 'Family Villa',
    city: 'Nairobi',
    neighbourhood: 'Lavington',
    price: 3000.00,
    bedrooms: 5,
    bathrooms: 4,
    property_type: 'house',
    images: ['/images/villa1.jpg'],
    is_available: true
  }
];

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({ 
    city: '', 
    bedrooms: '', 
    priceMin: '', 
    priceMax: '',
    propertyType: ''
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const city = searchParams.get('city') || '';
    const bedrooms = searchParams.get('bedrooms') || '';
    setFilters({ ...filters, city, bedrooms });
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.city) params.append('city', newFilters.city);
    if (newFilters.bedrooms) params.append('bedrooms', newFilters.bedrooms);
    if (newFilters.priceMin) params.append('priceMin', newFilters.priceMin);
    if (newFilters.priceMax) params.append('priceMax', newFilters.priceMax);
    if (newFilters.propertyType) params.append('propertyType', newFilters.propertyType);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ city: '', bedrooms: '', priceMin: '', priceMax: '', propertyType: '' });
    setSearchParams({});
  };

  // Enhanced filter logic
  const filtered = mockProperties.filter(p => {
    if (!p.is_available) return false;
    
    const cityMatch = !filters.city || p.city.toLowerCase().includes(filters.city.toLowerCase());
    const bedroomMatch = !filters.bedrooms || p.bedrooms === Number(filters.bedrooms);
    const priceMinMatch = !filters.priceMin || p.price >= Number(filters.priceMin);
    const priceMaxMatch = !filters.priceMax || p.price <= Number(filters.priceMax);
    const typeMatch = !filters.propertyType || p.property_type === filters.propertyType;
    
    return cityMatch && bedroomMatch && priceMinMatch && priceMaxMatch && typeMatch;
  });

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <p className="mt-2 text-gray-600">
                {filtered.length} property{filtered.length !== 1 ? 'ies' : 'y'} found
              </p>
            </div>
            
            {/* Mobile Filter Button */}
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showMobileFilters ? 'Hide' : 'Show'} Filters
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r p-6 hidden lg:block">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <FilterSidebar filters={filters} onChange={handleChange} />
        </aside>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="bg-white h-full w-80 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={handleChange} />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters 
                  ? "Try adjusting your filters to see more properties."
                  : "No properties are currently available."
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
