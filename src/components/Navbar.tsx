import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, MapPin, Bell, Search, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary-500 tracking-tight">
              BOLODEY
            </div>
            <div className="hidden sm:block ml-2 text-xs text-gray-500 font-medium">
              Services
            </div>
          </Link>

          {/* Desktop Search Bar (Airbnb style) */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-3">
              <div className="flex items-center space-x-6">
                <div className="text-sm font-medium text-gray-900">Where</div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="text-sm font-medium text-gray-900">Service</div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="text-sm text-gray-500">Add details</div>
              </div>
              <button className="ml-4 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/services"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
            >
              Browse Services
            </Link>
            <Link
              to="/register?type=provider"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
            >
              Become a Host
            </Link>
            
            <div className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors">
              <Globe className="h-4 w-4 mr-1" />
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow bg-white"
              >
                <Menu className="h-4 w-4 text-gray-600" />
                <div className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/bookings"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Your bookings
                      </Link>
                      <Link
                        to="/favorites"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Favorites
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <Link
                        to="/register?type=provider"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Become a service provider
                      </Link>
                      <Link
                        to="/help"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Help
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowProfileMenu(false);
                        }}
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Sign up
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <Link
                        to="/register?type=provider"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Become a service provider
                      </Link>
                      <Link
                        to="/help"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Help
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Mobile Search Button */}
            <Link
              to="/services"
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
            </Link>
            
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100">
          <div className="px-4 pt-6 pb-3 space-y-1 bg-white">
            {/* Mobile Search */}
            <Link
              to="/services"
              className="flex items-center px-3 py-4 border border-gray-300 rounded-xl mb-4 hover:border-gray-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">Search services</div>
                <div className="text-xs text-gray-500">Find what you need</div>
              </div>
            </Link>

            <Link
              to="/"
              className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                isActiveRoute('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                isActiveRoute('/services') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Services
            </Link>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your bookings
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <button
                      className="block w-full text-left px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block mx-3 my-2 px-6 py-3 rounded-xl text-base font-medium bg-primary-500 text-white hover:bg-primary-600 text-center transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  to="/register?type=provider"
                  className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Become a service provider
                </Link>
                <Link
                  to="/help"
                  className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;