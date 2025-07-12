import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../lib/api';
import { AuthContext } from '../context/AuthContext';
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
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sendingInquiry, setSendingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

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

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim() || !user) return;

    setSendingInquiry(true);
    try {
      await api.sendInquiry({
        listing_id: property!.id,
        message: inquiryMessage
      }, user.token);
      setInquirySuccess(true);
      setInquiryMessage('');
      setTimeout(() => setInquirySuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send inquiry');
    } finally {
      setSendingInquiry(false);
    }
  };

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

          {/* Contact/Inquiry Section */}
          <div className="border-t pt-6">
            {user && user.role === 'tenant' ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Inquiry</h3>
                {inquirySuccess && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Inquiry sent successfully!
                  </div>
                )}
                <form onSubmit={handleSendInquiry} className="space-y-4">
                  <textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Write your message to the landlord..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows={4}
                    required
                  />
                  <button
                    type="submit"
                    disabled={sendingInquiry || !inquiryMessage.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
                  >
                    {sendingInquiry ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              </div>
            ) : user && user.role === 'landlord' ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">This is your property listing.</p>
                <button className="bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                  Your Property
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Please log in as a tenant to send inquiries.</p>
                <button className="bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                  Contact Landlord
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
