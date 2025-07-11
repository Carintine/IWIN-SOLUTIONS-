import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, ChevronDown, Heart, Grid, List } from 'lucide-react';
import { serviceCategories } from '../data/mockData';
import { Service } from '../types';
import AISearch from '../components/AISearch';

const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Flatten all services from categories
  useEffect(() => {
    const allServices = serviceCategories.flatMap(category => category.services);
    setServices(allServices);
    setFilteredServices(allServices);
  }, []);

  // Handle URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Filter and sort services
  useEffect(() => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category.id === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price.min - b.price.min;
        case 'price-high':
          return b.price.min - a.price.min;
        case 'duration':
          return a.duration - b.duration;
        case 'recommended':
        default:
          return 0;
      }
    });

    setFilteredServices(filtered);
  }, [services, selectedCategory, searchTerm, sortBy]);

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

  const toggleFavorite = (serviceId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(serviceId)) {
      newFavorites.delete(serviceId);
    } else {
      newFavorites.add(serviceId);
    }
    setFavorites(newFavorites);
  };

  const ServiceCard = ({ service }: { service: Service }) => (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
        <button
          onClick={() => toggleFavorite(service.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
        >
          <Heart className={`h-4 w-4 ${favorites.has(service.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
            {service.category.name}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {service.name}
          </h3>
          <div className="flex items-center text-gray-600 ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDuration(service.duration)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Douala</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(service.price)}
            </div>
            {service.price.type === 'hourly' && (
              <div className="text-xs text-gray-500">per hour</div>
            )}
          </div>
          <Link
            to={`/service/${service.id}`}
            className="bg-primary-500 text-white px-6 py-2 rounded-xl hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find your perfect service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with trusted professionals for all your service needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <AISearch 
                placeholder="What service do you need? Try: 'House cleaning this weekend' or 'Plumber urgently'"
                showSuggestions={false}
                onSearchResults={(results) => setFilteredServices(results)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Category Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Services
                </button>
                {serviceCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="recommended">Recommended</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-gray-600">
            <span className="font-medium">{filteredServices.length}</span> services available
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Clear filter
            </button>
          )}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
                            <rect width="96" height="96" fill="#f3f4f6"/>
                            <text x="48" y="48" text-anchor="middle" dy="0.35em" fill="#6b7280" font-family="Arial, sans-serif" font-size="10">
                              ${service.name}
                            </text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <button
                        onClick={() => toggleFavorite(service.id)}
                        className="p-1"
                      >
                        <Heart className={`h-5 w-5 ${favorites.has(service.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>4.8 (127)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDuration(service.duration)}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {service.category.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(service.price)}
                      </div>
                      <Link
                        to={`/service/${service.id}`}
                        className="bg-primary-500 text-white px-6 py-2 rounded-xl hover:bg-primary-600 transition-colors text-sm font-medium"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or browse all available services
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors font-medium"
            >
              Show All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;