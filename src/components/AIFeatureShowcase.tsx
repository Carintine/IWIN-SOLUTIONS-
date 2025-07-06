import React from 'react';
import { Sparkles, Mic, MessageCircle, Search, Zap, Brain } from 'lucide-react';

const AIFeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "AI-Powered Search",
      description: "Use natural language to find services. Say 'I need someone to clean my house tomorrow' and our AI understands exactly what you need.",
      examples: [
        "I need urgent plumbing help",
        "Looking for a makeup artist for my wedding",
        "Need someone to repair my phone screen"
      ]
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Search",
      description: "Speak your request and let our AI process it instantly. Perfect for when you're busy or on the go.",
      examples: [
        "Voice recognition in English",
        "Instant speech-to-text conversion",
        "Hands-free service discovery"
      ]
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Smart Chatbot",
      description: "Get instant answers about services, pricing, booking process, and more from our intelligent assistant.",
      examples: [
        "24/7 instant responses",
        "Service recommendations",
        "Booking assistance"
      ]
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Intent Recognition",
      description: "Our AI understands what you really need, even when you don't know the exact service name.",
      examples: [
        "Understands urgency levels",
        "Recognizes service types",
        "Suggests alternatives"
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Smart Matching",
      description: "AI analyzes your request and matches you with the most suitable service providers in your area.",
      examples: [
        "Location-based matching",
        "Skill-based recommendations",
        "Availability optimization"
      ]
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Intelligent Suggestions",
      description: "Get personalized service suggestions based on your location, preferences, and previous bookings.",
      examples: [
        "Popular services in your area",
        "Seasonal recommendations",
        "Trending service providers"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Powered by AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience the Future of Service Discovery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BOLODEY uses advanced AI to make finding and booking services as simple as having a conversation. 
            No more searching through endless lists - just tell us what you need!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-primary-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                    <span>{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Try AI-Powered Service Discovery?
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the easiest way to find and book services in Cameroon. 
              Our AI is trained to understand your needs and connect you with the perfect providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Try AI Search Now
              </button>
              <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </div>

        {/* AI Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
            <div className="text-gray-600">Search Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">&lt;2s</div>
            <div className="text-gray-600">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">AI Availability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
            <div className="text-gray-600">Languages Supported</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatureShowcase;