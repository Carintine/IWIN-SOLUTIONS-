import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Clock, MapPin, ChevronRight, Users, Award, Smartphone } from 'lucide-react';
import { serviceCategories } from '../data/mockData';
import AISearch from '../components/AISearch';
import AIFeatureShowcase from '../components/AIFeatureShowcase';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Airbnb Style */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
              <Smartphone className="h-4 w-4 mr-2" />
              Now Available in Cameroon
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Find amazing
              <span className="text-primary-500 block">services</span>
              near you
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with trusted, verified service providers across Cameroon. From home maintenance to personal care, we've got you covered.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
                <AISearch 
                  placeholder="What service do you need? Try: 'House cleaning this weekend'"
                  showSuggestions={true}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary-500" />
                <span><strong>500+</strong> Service Providers</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                <span><strong>10+</strong> Cities</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-primary-500" />
                <span><strong>1000+</strong> Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories - Enhanced Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Explore by category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover services that make your life easier
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category) => (
              <Link
                key={category.id}
                to={`/services?category=${category.id}`}
                className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-8 h-64 flex flex-col justify-between">
                  <div>
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-primary-600 group-hover:text-primary-700 font-medium">
                    <span className="text-sm">Explore services</span>
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Subtle border */}
                <div className="absolute inset-0 rounded-3xl border border-gray-100 group-hover:border-primary-200 transition-colors"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why customers love BOLODEY
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're changing how Cameroonians access quality services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-shadow">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verified & Trusted
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every service provider undergoes thorough background checks, skill verification, and reference validation before joining our platform.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-shadow">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                5-Star Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our rating system and customer reviews ensure you always get high-quality service from top-rated professionals.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-shadow">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Same-Day Service
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Book instantly and get connected with available providers in your area. Many services available same-day or next-day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <AIFeatureShowcase />

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How BOLODEY works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the service you need in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Tell us what you need",
                description: "Describe your service requirement and we'll match you with the right providers",
                icon: Search
              },
              {
                step: "2", 
                title: "Choose your provider",
                description: "Browse profiles, read reviews, and select the perfect provider for your needs",
                icon: Users
              },
              {
                step: "3",
                title: "Get it done",
                description: "Schedule the service and enjoy professional quality work at your convenience",
                icon: Award
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                )}
                
                <div className="relative z-10">
                  <div className="bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to experience the future of services?
          </h2>
          <p className="text-xl mb-10 text-primary-100 leading-relaxed">
            Join thousands of satisfied customers who trust BOLODEY for their daily service needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book a Service Now
            </Link>
            <Link
              to="/register?type=provider"
              className="bg-transparent text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 border-2 border-white transform hover:scale-105"
            >
              Become a Provider
            </Link>
          </div>
          
          <div className="mt-8 text-primary-200 text-sm">
            No credit card required • Free to browse • Instant booking
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;