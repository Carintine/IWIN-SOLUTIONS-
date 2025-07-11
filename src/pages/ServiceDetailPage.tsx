import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Shield, ChevronLeft, Calendar, Phone, MessageCircle, Heart, Share2, Camera, Verified, Award, Users } from 'lucide-react';
import { Service } from '../types';
import { serviceCategories } from '../data/mockData';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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

  // Mock images for gallery
  const serviceImages = [
    service.image,
    '/api/placeholder/400/300?text=Before',
    '/api/placeholder/400/300?text=Process',
    '/api/placeholder/400/300?text=After',
    '/api/placeholder/400/300?text=Tools'
  ];

  // Mock providers data with enhanced details
  const mockProviders = [
    {
      id: '1',
      name: 'Marie Kouam',
      title: 'Professional House Cleaner',
      rating: 4.9,
      reviews: 156,
      completedJobs: 234,
      experience: '3 years',
      avatar: '/api/placeholder/100/100?text=MK',
      verified: true,
      location: 'Douala, Akwa',
      about: 'Experienced professional with attention to detail. Specialized in eco-friendly cleaning methods.',
      languages: ['French', 'English'],
      responseTime: '30 minutes',
      tags: ['Eco-friendly', 'Reliable', 'Detail-oriented']
    },
    {
      id: '2',
      name: 'Jean Baptiste',
      title: 'Expert Service Technician',
      rating: 4.8,
      reviews: 98,
      completedJobs: 145,
      experience: '2 years',
      avatar: '/api/placeholder/100/100?text=JB',
      verified: true,
      location: 'Douala, Bonanjo',
      about: 'Dedicated professional committed to customer satisfaction and quality work.',
      languages: ['French'],
      responseTime: '1 hour',
      tags: ['Fast', 'Professional', 'Experienced']
    },
    {
      id: '3',
      name: 'Fatima Ngozi',
      title: 'Certified Service Provider',
      rating: 4.7,
      reviews: 87,
      completedJobs: 123,
      experience: '4 years',
      avatar: '/api/placeholder/100/100?text=FN',
      verified: true,
      location: 'Douala, Bepanda',
      about: 'Passionate about delivering exceptional service with years of industry experience.',
      languages: ['French', 'English'],
      responseTime: '45 minutes',
      tags: ['Experienced', 'Trusted', 'Quality-focused']
    }
  ];

  const selectedProviderData = mockProviders[selectedProvider];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/services" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">All services</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
                <span className="font-medium">Save</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="h-5 w-5 mr-2" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
              {service.category.name}
            </span>
            <div className="flex items-center text-gray-600">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">4.8</span>
              <span className="mx-1">·</span>
              <span>234 reviews</span>
              <span className="mx-1">·</span>
              <MapPin className="h-4 w-4 mr-1" />
              <span>Douala, Cameroon</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4 h-96 rounded-2xl overflow-hidden">
            {/* Main Image */}
            <div className="col-span-2 row-span-2">
              <img
                src={serviceImages[selectedImageIndex]}
                alt={service.name}
                className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition-all"
                onClick={() => setSelectedImageIndex(0)}
                onError={(e) => {
                  e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                      <rect width="400" height="300" fill="#f3f4f6"/>
                      <text x="200" y="150" text-anchor="middle" dy="0.35em" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">
                        ${service.name}
                      </text>
                    </svg>
                  `)}`;
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            {serviceImages.slice(1, 5).map((image, index) => (
              <div key={index} className="relative overflow-hidden">
                <img
                  src={image}
                  alt={`${service.name} ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition-all"
                  onClick={() => setSelectedImageIndex(index + 1)}
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="150" fill="#f3f4f6"/>
                        <text x="100" y="75" text-anchor="middle" dy="0.35em" fill="#6b7280" font-family="Arial, sans-serif" font-size="12">
                          View ${index + 2}
                        </text>
                      </svg>
                    `)}`;
                  }}
                />
                {index === 3 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white font-medium flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Show all photos
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Service Overview</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(service.price)}
                  </div>
                  {service.price.type === 'hourly' && (
                    <div className="text-sm text-gray-500">per hour</div>
                  )}
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Clock className="h-6 w-6 text-primary-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">{formatDuration(service.duration)}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Users className="h-6 w-6 text-primary-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">234</div>
                  <div className="text-xs text-gray-500">Happy customers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Award className="h-6 w-6 text-primary-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">4.8★</div>
                  <div className="text-xs text-gray-500">Average rating</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Verified className="h-6 w-6 text-primary-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">100%</div>
                  <div className="text-xs text-gray-500">Verified</div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[
                    'Professional service delivery',
                    'All necessary tools and equipment',
                    'Quality guarantee',
                    'Clean-up after service'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    'Insurance coverage',
                    'Customer support',
                    'Satisfaction guarantee',
                    'Flexible scheduling'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Provider Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Choose your service provider</h3>
              <div className="space-y-4">
                {mockProviders.map((provider, index) => (
                  <div
                    key={provider.id}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedProvider === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedProvider(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-16 h-16 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                              <rect width="64" height="64" fill="#e5e7eb" rx="32"/>
                              <text x="32" y="32" text-anchor="middle" dy="0.35em" fill="#6b7280" font-family="Arial, sans-serif" font-size="20">
                                ${provider.name.split(' ').map(n => n[0]).join('')}
                              </text>
                            </svg>
                          `)}`;
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center">
                              <h4 className="text-lg font-semibold text-gray-900">{provider.name}</h4>
                              {provider.verified && (
                                <Verified className="h-5 w-5 text-blue-500 ml-2" />
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{provider.title}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-gray-600">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="font-medium">{provider.rating}</span>
                              <span className="text-sm ml-1">({provider.reviews})</span>
                            </div>
                            <p className="text-sm text-gray-500">{provider.experience} experience</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{provider.about}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {provider.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{provider.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Responds in {provider.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Booking Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatPrice(service.price)}
                  </div>
                  {service.price.type === 'hourly' && (
                    <div className="text-sm text-gray-500">per hour</div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="border border-gray-300 rounded-xl p-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">Selected Provider</div>
                    <div className="flex items-center">
                      <img
                        src={selectedProviderData.avatar}
                        alt={selectedProviderData.name}
                        className="w-8 h-8 rounded-full mr-3"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                              <rect width="32" height="32" fill="#e5e7eb" rx="16"/>
                              <text x="16" y="16" text-anchor="middle" dy="0.35em" fill="#6b7280" font-family="Arial, sans-serif" font-size="12">
                                ${selectedProviderData.name.split(' ').map(n => n[0]).join('')}
                              </text>
                            </svg>
                          `)}`;
                        }}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{selectedProviderData.name}</div>
                        <div className="text-sm text-gray-500">⭐ {selectedProviderData.rating}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/book/${service.id}?provider=${selectedProviderData.id}`}
                  className="w-full bg-primary-500 text-white py-4 px-6 rounded-xl hover:bg-primary-600 transition-colors font-medium text-center block mb-4"
                >
                  Book Service
                </Link>

                <div className="space-y-3">
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Message Provider
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Provider
                  </button>
                </div>

                <div className="text-center mt-4 text-sm text-gray-500">
                  You won't be charged yet
                </div>
              </div>

              {/* Trust & Safety */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">BOLODEY Guarantee</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: 'Verified providers' },
                    { icon: Star, text: 'Quality guarantee' },
                    { icon: Phone, text: '24/7 customer support' },
                    { icon: Award, text: 'Satisfaction promise' }
                  ].map(({ icon: Icon, text }, index) => (
                    <div key={index} className="flex items-center">
                      <Icon className="h-5 w-5 text-primary-500 mr-3" />
                      <span className="text-sm text-gray-700">{text}</span>
                    </div>
                  ))}
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