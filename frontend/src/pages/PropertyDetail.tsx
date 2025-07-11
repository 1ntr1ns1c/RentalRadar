import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../lib/api';
import ImageGallery from '../components/ImageGallery';

interface Property {
  id: number;
  title: string;
  description: string;
  city: string;
  neighbourhood: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  images: string[];
  is_available: boolean;
  created_at: string;
}

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    api.getProperty(parseInt(id))
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load property details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error || 'Property not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Property Images */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <ImageGallery 
            images={property.images || []} 
            alt={property.title}
            className="h-96"
          />
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-lg text-gray-600">{property.city}, {property.neighbourhood}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">Ksh {Number(property.price).toFixed(2)}</p>
              <p className="text-gray-600">per month</p>
            </div>
          </div>

          {/* Property Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
              <p className="text-gray-600">Bedrooms</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
              <p className="text-gray-600">Bathrooms</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 capitalize">{property.property_type}</p>
              <p className="text-gray-600">Type</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                property.is_available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {property.is_available ? 'Available' : 'Rented'}
              </span>
              <p className="text-gray-600 mt-1">Status</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Contact Button */}
          <div className="border-t pt-6">
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Contact Landlord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
