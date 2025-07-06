import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Settings, User, CreditCard, Bell, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [userType] = useState<'customer' | 'provider'>('customer'); // This would come from authentication

  // Mock data
  const mockBookings = [
    {
      id: '1',
      service: 'House Cleaning',
      provider: 'Marie Kouam',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      price: 15000,
      address: 'Akwa, Douala'
    },
    {
      id: '2',
      service: 'Plumbing Repair',
      provider: 'Jean Baptiste',
      date: '2024-01-18',
      time: '2:00 PM',
      status: 'pending',
      price: 25000,
      address: 'Bonanjo, Douala'
    },
    {
      id: '3',
      service: 'Electrical Installation',
      provider: 'Paul Ndongo',
      date: '2024-01-12',
      time: '9:00 AM',
      status: 'completed',
      price: 35000,
      address: 'Bepanda, Douala'
    }
  ];

  const mockProviderStats = {
    totalBookings: 45,
    completedJobs: 42,
    rating: 4.8,
    earnings: 650000
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, John!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">2</span>
                </span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === 'bookings'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === 'payments'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Payments
                </button>
                {userType === 'provider' && (
                  <button
                    onClick={() => setActiveTab('provider')}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === 'provider'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Star className="h-5 w-5 mr-3" />
                    Provider Dashboard
                  </button>
                )}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Bookings</p>
                        <p className="text-2xl font-bold text-gray-900">{mockBookings.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {mockBookings.filter(b => b.status === 'completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {mockBookings.filter(b => b.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bookings List */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {mockBookings.map((booking) => (
                      <div key={booking.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-medium text-gray-900">{booking.service}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1 capitalize">{booking.status}</span>
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Provider: {booking.provider}</p>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {booking.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {booking.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {booking.address}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{booking.price.toLocaleString()} XAF</p>
                            <div className="mt-2 space-x-2">
                              {booking.status === 'pending' && (
                                <button className="text-sm text-red-600 hover:text-red-800">
                                  Cancel
                                </button>
                              )}
                              {booking.status === 'completed' && (
                                <button className="text-sm text-primary-600 hover:text-primary-800">
                                  Review
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" className="input-field" defaultValue="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="input-field" defaultValue="Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" className="input-field" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input type="tel" className="input-field" defaultValue="+237 6XX XXX XXX" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea className="input-field" rows={3} defaultValue="123 Main Street, Douala, Cameroon" />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="btn-primary">Update Profile</button>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium">MT</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-900">MTN Mobile Money</p>
                          <p className="text-sm text-gray-600">**** **** 1234</p>
                        </div>
                      </div>
                      <button className="text-sm text-primary-600 hover:text-primary-800">Edit</button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-medium">OM</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-900">Orange Money</p>
                          <p className="text-sm text-gray-600">**** **** 5678</p>
                        </div>
                      </div>
                      <button className="text-sm text-primary-600 hover:text-primary-800">Edit</button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="btn-outline">Add Payment Method</button>
                </div>
              </div>
            )}

            {activeTab === 'provider' && userType === 'provider' && (
              <div className="space-y-6">
                {/* Provider Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Jobs</p>
                        <p className="text-2xl font-bold text-gray-900">{mockProviderStats.totalBookings}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">{mockProviderStats.completedJobs}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">{mockProviderStats.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Earnings</p>
                        <p className="text-2xl font-bold text-gray-900">{mockProviderStats.earnings.toLocaleString()} XAF</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Jobs */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {mockBookings.map((booking) => (
                      <div key={booking.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-medium text-gray-900">{booking.service}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1 capitalize">{booking.status}</span>
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {booking.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {booking.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {booking.address}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{booking.price.toLocaleString()} XAF</p>
                            <div className="mt-2 space-x-2">
                              {booking.status === 'confirmed' && (
                                <button className="text-sm text-green-600 hover:text-green-800">
                                  Mark Complete
                                </button>
                              )}
                              {booking.status === 'pending' && (
                                <>
                                  <button className="text-sm text-green-600 hover:text-green-800">
                                    Accept
                                  </button>
                                  <button className="text-sm text-red-600 hover:text-red-800">
                                    Decline
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;