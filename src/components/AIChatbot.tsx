import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink } from 'lucide-react';
import { serviceCategories } from '../data/mockData';
import { Service } from '../types';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  actions?: {
    type: 'service' | 'link' | 'booking';
    data: any;
  }[];
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hi! I'm BOLODEY AI Assistant. I can help you find services, answer questions, or guide you through booking. How can I assist you today?",
          [
            { type: 'service', data: { text: 'Find a service', action: 'search' } },
            { type: 'link', data: { text: 'View all services', url: '/services' } },
            { type: 'service', data: { text: 'How it works', action: 'how_it_works' } }
          ]
        );
      }, 500);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (content: string, actions?: any[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      actions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // AI Response Generator
  const generateAIResponse = (userMessage: string): { content: string; actions?: any[] } => {
    const lowercaseMessage = userMessage.toLowerCase();

    // Greeting responses
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      return {
        content: "Hello! 😊 I'm here to help you find the perfect service. What do you need assistance with?",
        actions: [
          { type: 'service', data: { text: 'Browse services', action: 'browse' } },
          { type: 'service', data: { text: 'Book a service', action: 'book' } }
        ]
      };
    }

    // Service search
    if (lowercaseMessage.includes('clean') || lowercaseMessage.includes('cleaning')) {
      return {
        content: "Great! I found several cleaning services for you. We have professional house cleaning, commercial cleaning, and deep cleaning services available. 🧹",
        actions: [
          { type: 'service', data: { text: 'View cleaning services', serviceId: 'cleaning' } },
          { type: 'booking', data: { text: 'Book cleaning now', serviceId: 'cleaning' } }
        ]
      };
    }

    if (lowercaseMessage.includes('plumb') || lowercaseMessage.includes('pipe') || lowercaseMessage.includes('leak')) {
      return {
        content: "I can help you find a qualified plumber! Our verified plumbers handle repairs, installations, and emergency fixes. 🔧",
        actions: [
          { type: 'service', data: { text: 'View plumbing services', serviceId: 'plumbing' } },
          { type: 'booking', data: { text: 'Book plumber', serviceId: 'plumbing' } }
        ]
      };
    }

    if (lowercaseMessage.includes('electric') || lowercaseMessage.includes('wire') || lowercaseMessage.includes('power')) {
      return {
        content: "Need electrical work? Our certified electricians can help with repairs, installations, and wiring. Safety first! ⚡",
        actions: [
          { type: 'service', data: { text: 'View electrical services', serviceId: 'electrical' } },
          { type: 'booking', data: { text: 'Book electrician', serviceId: 'electrical' } }
        ]
      };
    }

    if (lowercaseMessage.includes('hair') || lowercaseMessage.includes('beauty') || lowercaseMessage.includes('makeup')) {
      return {
        content: "Looking fabulous! 💄 We have professional hairdressers and makeup artists who can come to your location.",
        actions: [
          { type: 'service', data: { text: 'View beauty services', serviceId: 'hairdressing' } },
          { type: 'service', data: { text: 'Makeup services', serviceId: 'makeup' } }
        ]
      };
    }

    // Pricing questions
    if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('how much')) {
      return {
        content: "Pricing varies by service type and complexity. Most services range from 3,000 to 50,000 XAF. Here's what affects pricing: 📊\n\n• Service type and duration\n• Location in Cameroon\n• Urgency of request\n• Materials needed\n\nI can show you specific pricing for any service!",
        actions: [
          { type: 'link', data: { text: 'View all services & prices', url: '/services' } },
          { type: 'service', data: { text: 'Get price estimate', action: 'pricing' } }
        ]
      };
    }

    // Booking questions
    if (lowercaseMessage.includes('book') || lowercaseMessage.includes('hire') || lowercaseMessage.includes('schedule')) {
      return {
        content: "Booking is easy! 📅 Here's how:\n\n1. Choose your service\n2. Select date and time\n3. Enter your location\n4. Choose payment method\n5. Confirm booking\n\nWhat service would you like to book?",
        actions: [
          { type: 'link', data: { text: 'Start booking', url: '/services' } },
          { type: 'service', data: { text: 'Popular services', action: 'popular' } }
        ]
      };
    }

    // Payment questions
    if (lowercaseMessage.includes('payment') || lowercaseMessage.includes('pay') || lowercaseMessage.includes('money')) {
      return {
        content: "We accept multiple payment methods in Cameroon: 💳\n\n• MTN Mobile Money\n• Orange Money\n• Credit/Debit Cards\n• Cash on Delivery\n\nAll payments are secure and verified!",
        actions: [
          { type: 'service', data: { text: 'Learn more about payments', action: 'payments' } }
        ]
      };
    }

    // Location/coverage questions
    if (lowercaseMessage.includes('location') || lowercaseMessage.includes('area') || lowercaseMessage.includes('where')) {
      return {
        content: "We currently serve major cities in Cameroon: 🌍\n\n• Douala\n• Yaoundé\n• Bamenda\n• Bafoussam\n• And more!\n\nExpanding to more areas soon. What's your location?",
        actions: [
          { type: 'service', data: { text: 'Check service availability', action: 'coverage' } }
        ]
      };
    }

    // Default response with smart suggestions
    const serviceKeywords = ['clean', 'plumb', 'electric', 'hair', 'repair', 'design', 'massage', 'paint'];
    const foundKeywords = serviceKeywords.filter(keyword => lowercaseMessage.includes(keyword));

    if (foundKeywords.length > 0) {
      return {
        content: `I understand you're looking for ${foundKeywords.join(', ')} services. Let me help you find the right provider! 🎯`,
        actions: [
          { type: 'link', data: { text: 'Search services', url: '/services' } },
          { type: 'service', data: { text: 'Talk to human agent', action: 'human' } }
        ]
      };
    }

    return {
      content: "I'm here to help! I can assist with:\n\n🔍 Finding services\n📅 Booking appointments\n💰 Pricing information\n📍 Service areas\n❓ General questions\n\nWhat would you like to know?",
      actions: [
        { type: 'link', data: { text: 'Browse all services', url: '/services' } },
        { type: 'service', data: { text: 'Popular services', action: 'popular' } },
        { type: 'service', data: { text: 'Contact support', action: 'support' } }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    addUserMessage(userMsg);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateAIResponse(userMsg);
      addBotMessage(response.content, response.actions);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds
  };

  const handleActionClick = (action: any) => {
    if (action.type === 'link') {
      window.location.href = action.data.url;
    } else if (action.type === 'service') {
      addUserMessage(action.data.text);
      setIsTyping(true);
      
             setTimeout(() => {
         let response: { content: string; actions?: any[] } = { content: "Let me help you with that!" };
         
         if (action.data.action === 'popular') {
           response = {
             content: "Here are our most popular services: ⭐\n\n• House Cleaning\n• Plumbing Repairs\n• Hair Styling\n• Phone Repair\n• Graphic Design\n\nWhich one interests you?",
             actions: [
               { type: 'service', data: { text: 'House Cleaning', action: 'cleaning' } },
               { type: 'service', data: { text: 'Plumbing', action: 'plumbing' } },
               { type: 'service', data: { text: 'Hair Styling', action: 'hairdressing' } }
             ]
           };
         }

         addBotMessage(response.content, response.actions);
         setIsTyping(false);
       }, 800);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-primary-500 hover:bg-primary-600 animate-pulse'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold">BOLODEY AI Assistant</h3>
                <p className="text-xs text-primary-100">Online • Instant replies</p>
              </div>
            </div>
            <Sparkles className="h-5 w-5 text-primary-200" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action)}
                          className="block w-full text-left text-xs bg-primary-50 text-primary-700 px-3 py-2 rounded border border-primary-200 hover:bg-primary-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span>{action.data.text}</span>
                            {action.type === 'link' && <ExternalLink className="h-3 w-3" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'order-1 mr-2 bg-primary-500' : 'order-2 ml-2 bg-gray-300'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3 text-gray-600" />
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Powered by BOLODEY AI • Instant responses
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;