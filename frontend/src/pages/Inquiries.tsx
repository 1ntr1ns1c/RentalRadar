import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as api from '../lib/api';

interface Inquiry {
  id: number;
  listing_id: number;
  tenant_id: number;
  message: string;
  landlord_response?: string;
  status: string;
  created_at: string;
  property?: {
    id: number;
    title: string;
    city: string;
    neighbourhood: string;
  };
  tenant?: {
    id: number;
    name: string;
    email: string;
  };
}

const Inquiries: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [respondingTo, setRespondingTo] = useState<number | null>(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await api.getInquiries({}, user!.token);
      setInquiries(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (inquiryId: number) => {
    if (!responseText.trim()) return;
    
    try {
      await api.respondToInquiry(inquiryId, { response: responseText }, user!.token);
      setResponseText('');
      setRespondingTo(null);
      fetchInquiries(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send response');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'viewed': return 'text-blue-600 bg-blue-100';
      case 'responded': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return <div className="p-8">Please log in to view inquiries.</div>;
  }

  if (loading) {
    return <div className="p-8">Loading inquiries...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {user.role === 'landlord' ? 'Property Inquiries' : 'My Inquiries'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {inquiries.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {user.role === 'landlord' 
            ? 'No inquiries for your properties yet.'
            : 'You haven\'t sent any inquiries yet.'
          }
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {inquiry.property?.title || `Property #${inquiry.listing_id}`}
                  </h3>
                  <p className="text-gray-600">{inquiry.property?.city}, {inquiry.property?.neighbourhood}</p>
                  {user.role === 'landlord' && inquiry.tenant && (
                    <p className="text-sm text-gray-500">
                      From: {inquiry.tenant.name} ({inquiry.tenant.email})
                    </p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inquiry.status)}`}>
                  {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Inquiry Message:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">{inquiry.message}</p>
              </div>

              {inquiry.landlord_response && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Landlord Response:</h4>
                  <p className="text-gray-600 bg-blue-50 p-3 rounded">{inquiry.landlord_response}</p>
                </div>
              )}

              {user.role === 'landlord' && inquiry.status !== 'responded' && (
                <div className="mt-4">
                  {respondingTo === inquiry.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Type your response..."
                        className="w-full p-3 border rounded-lg resize-none"
                        rows={3}
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleRespond(inquiry.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Send Response
                        </button>
                        <button
                          onClick={() => {
                            setRespondingTo(null);
                            setResponseText('');
                          }}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRespondingTo(inquiry.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Respond
                    </button>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-500 mt-4">
                Sent on: {new Date(inquiry.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inquiries; 