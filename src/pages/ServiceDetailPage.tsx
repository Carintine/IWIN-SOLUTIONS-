import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Shield, ChevronLeft, Calendar, Phone, MessageCircle } from 'lucide-react';
import { Service } from '../types';
import { serviceCategories } from '../data/mockData';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState(0);

  useEffect(() => {
    // Find service by ID
    const foundService = serviceCategories
      .flatMap(category => category.services)
      .find(s => s.id === id);
    
    if (foundService) {
      setService(foundService);
    }
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">Service not found</div>
          <Link to="/services" className="text-primary-600 hover:text-primary-700">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: { min: number; max: number; currency: string; type: string }) => {
    if (price.type === 'quote') {
      return 'Get Quote';
    }
    if (price.min === price.max) {
      return `${price.min.toLocaleString()} ${price.currency}`;
    }
    return `${price.min.toLocaleString()} - ${price.max.toLocaleString()} ${price.currency}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    return `${hours}h ${remainingMinutes}m`;
  };

  // Mock providers data
  const mockProviders = [
    {
      id: '1',
      name: 'Marie Kouam',
      rating: 4.9,
      reviews: 156,
      completedJobs: 234,
      experience: '3 years',
      avatar: '/api/placeholder/100/100?text=MK',
      verified: true,
      location: 'Douala, Akwa'
    },
    {
      id: '2',
      name: 'Jean Baptiste',
      rating: 4.8,
      reviews: 98,
      completedJobs: 145,
      experience: '2 years',
      avatar: '/api/placeholder/100/100?text=JB',
      verified: true,
      location: 'Douala, Bonanjo'
    },
    {
      id: '3',
      name: 'Fatima Ngozi',
      rating: 4.7,
      reviews: 87,
      completedJobs: 123,
      experience: '4 years',
      avatar: '/api/placeholder/100/100?text=FN',
      verified: true,
      location: 'Douala, Bepanda'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/services" className="flex items-center text-gray-600 hover:text-primary-600 mr-4">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Services
            </Link>
            <div className="text-gray-400">|</div>
            <span className="ml-4 text-gray-600">{service.category.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                          <rect width="300" height="200" fill="#f3f4f6"/>
                          <text x="150" y="100" text-anchor="middle" dy="0.35em" fill="#6b7280" font-family="Arial, sans-serif" font-size="14">
                            ${service.name}
                          </text>
                        </svg>
                      `)}`;
                    }}
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                    <span className="text-xs bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                      {service.category.name}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>Duration: {formatDuration(service.duration)}</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 mr-2" />
                      <span className="text-gray-600">4.8 (234 reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-600">
                      {formatPrice(service.price)}
                    </div>
                    <Link
                      to={`/book/${service.id}`}
                      className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What's Included:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Professional service delivery</li>
                    <li>All necessary tools and equipment</li>
                    <li>Quality guarantee</li>
                    <li>Clean-up after service</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Clear access to service area</li>
                    <li>Basic utilities (water, electricity if needed)</li>
                    <li>Presence of customer or authorized person</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Available Providers */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Providers</h2>
              <div className="space-y-4">
                {mockProviders.map((provider, index) => (
                  <div
                    key={provider.id}
                    className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      selectedProvider === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProvider(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={provider.avatar}
                          alt={provider.name}
                          className="w-12 h-12 rounded-full mr-4"
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                                <rect width="48" height="48" fill="#e5e7eb" rx="24"/>
                                <text x="24" y="24" text-anchor="middle" dy="0.35em" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">
                                  ${provider.name.split(' ').map(n => n[0]).join('')}
                                </text>
                              </svg>
                            `)}`;
                          }}
                        />
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                            {provider.verified && (
                              <Shield className="h-4 w-4 text-green-500 ml-2" />
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{provider.rating} ({provider.reviews} reviews)</span>
                            <span className="mx-2">•</span>
                            <span>{provider.completedJobs} jobs</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{provider.experience}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{provider.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/book/${service.id}`}
                  className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Service
                </Link>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Provider
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Service Guarantee */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">BOLODEY Guarantee</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-600">Verified providers</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-600">Secure payments</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-600">Quality guarantee</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-600">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;