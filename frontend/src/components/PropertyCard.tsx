import type { FC } from 'react';

export interface Property {
  id: number;
  title: string;
  city: string;
  neighbourhood: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  images: string[];
  is_available: boolean;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.city}, {property.neighbourhood}</p>
        <p className="text-sm text-gray-600 capitalize">{property.property_type}</p>
        <p className="mt-2 font-bold">${property.price.toFixed(2)}/month</p>
        <p className="text-sm text-gray-600">{property.bedrooms} bed • {property.bathrooms} bath</p>
      </div>
    </div>
  );
};

export default PropertyCard;