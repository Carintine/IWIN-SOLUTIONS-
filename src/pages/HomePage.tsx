import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { serviceCategories } from '../data/mockData';
import AISearch from '../components/AISearch';
import AIFeatureShowcase from '../components/AIFeatureShowcase';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Quality Services
              <span className="text-primary-200"> On-Demand</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Connect with verified service providers in Cameroon for all your home, personal, and business needs.
            </p>
            
            {/* AI Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <AISearch 
                placeholder="What service do you need? Try: 'I need someone to clean my house this weekend'"
                showSuggestions={true}
              />
            </div>

            {/* Location Indicator */}
            <div className="flex items-center justify-center text-primary-200">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Currently serving Douala and Yaoundé</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Categories
            </h2>
            <p className="text-xl text-gray-600">
              Professional services at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((category) => (
              <Link
                key={category.id}
                to={`/services?category=${category.id}`}
                className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">View Services</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BOLODEY?
            </h2>
            <p className="text-xl text-gray-600">
              Trusted, reliable, and convenient service marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Providers
              </h3>
              <p className="text-gray-600">
                All service providers are thoroughly vetted with background checks, skill verification, and reference checks.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Customer ratings and reviews ensure high-quality service delivery every time.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast & Convenient
              </h3>
              <p className="text-gray-600">
                Book services instantly through our app with real-time tracking and flexible scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <AIFeatureShowcase />

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of satisfied customers who trust BOLODEY for their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started as Customer
            </Link>
            <Link
              to="/register?type=provider"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border border-primary-500"
            >
              Become a Service Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;