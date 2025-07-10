import type { FC } from 'react';

interface Filters {
  city: string;
  bedrooms: string;
  priceMin: string;
  priceMax: string;
  propertyType: string;
}

interface Props {
  filters: Filters;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FilterSidebar: FC<Props> = ({ filters, onChange }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
      <input
        name="city"
        value={filters.city}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g. Nairobi"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
      <select
        name="propertyType"
        value={filters.propertyType}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Any Type</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="condo">Condo</option>
        <option value="studio">Studio</option>
        <option value="bedsitter">Bedsitter</option>
        <option value="single">Single Room</option>
      </select>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
      <select
        name="bedrooms"
        value={filters.bedrooms}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Any</option>
        {[1,2,3,4,5].map(n => (
          <option key={n} value={n}>{n} Bedroom{n > 1 ? 's' : ''}</option>
        ))}
      </select>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
      <div className="space-y-2">
        <input
          name="priceMin"
          value={filters.priceMin}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Min Price"
          type="number"
          min="0"
        />
        <input
          name="priceMax"
          value={filters.priceMax}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Max Price"
          type="number"
          min="0"
        />
      </div>
    </div>
    
    <div className="pt-4">
      <button 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        onClick={() => window.location.reload()}
      >
        Apply Filters
      </button>
    </div>
  </div>
);

export default FilterSidebar;