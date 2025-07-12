import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageGallery from './ImageGallery';

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
  const navigate = useNavigate();

  // Debug: Log the property data
  // console.log('PropertyCard received property:', property);
  // console.log('PropertyCard images:', property.images);

  const handleClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div 
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <ImageGallery 
        images={property.images || []} 
        alt={property.title}
      />
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.city}, {property.neighbourhood}</p>
        <p className="text-sm text-gray-600 capitalize">{property.property_type}</p>
        <p className="mt-2 font-bold">Ksh {Number(property.price).toFixed(2)}/month</p>
        <p className="text-sm text-gray-600">{property.bedrooms} bed • {property.bathrooms} bath</p>
      </div>
    </div>
  );
};

export default PropertyCard;