import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, Sparkles, ArrowRight } from 'lucide-react';
import { serviceCategories } from '../data/mockData';
import { Service } from '../types';

interface AISearchProps {
  onSearchResults?: (results: Service[]) => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

const AISearch: React.FC<AISearchProps> = ({ 
  onSearchResults, 
  placeholder = "What service do you need? (e.g., 'I need someone to clean my house tomorrow')",
  showSuggestions = true 
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const recognitionRef = useRef<any>(null);

  // AI-powered search suggestions
  const smartSuggestions = [
    "I need someone to clean my house this weekend",
    "Looking for a plumber to fix my bathroom sink",
    "Need electrical work done in my office",
    "Want a hairdresser to come to my home",
    "Looking for someone to repair my phone screen",
    "Need a graphic designer for my business logo",
    "Want someone to paint my living room",
    "Looking for a massage therapist for home service"
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleAISearch(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // AI-powered natural language processing
  const processNaturalLanguage = (text: string): { intent: string; keywords: string[]; urgency: string } => {
    const lowercaseText = text.toLowerCase();
    
    // Extract keywords
    const serviceKeywords = [
      'clean', 'cleaning', 'plumb', 'plumber', 'electric', 'electrical', 'repair', 'fix',
      'paint', 'painting', 'hair', 'hairdress', 'massage', 'design', 'graphic', 'computer',
      'phone', 'mobile', 'carpenter', 'carpentry', 'garden', 'tutoring', 'teach'
    ];
    
    const urgencyKeywords = {
      'urgent': ['urgent', 'emergency', 'asap', 'immediately', 'now', 'today'],
      'soon': ['tomorrow', 'this week', 'soon', 'quickly'],
      'flexible': ['whenever', 'flexible', 'no rush', 'sometime']
    };

    const foundKeywords = serviceKeywords.filter(keyword => lowercaseText.includes(keyword));
    
    let urgency = 'flexible';
    for (const [level, words] of Object.entries(urgencyKeywords)) {
      if (words.some(word => lowercaseText.includes(word))) {
        urgency = level;
        break;
      }
    }

    // Determine intent
    let intent = 'search';
    if (lowercaseText.includes('book') || lowercaseText.includes('hire') || lowercaseText.includes('need')) {
      intent = 'book';
    } else if (lowercaseText.includes('price') || lowercaseText.includes('cost') || lowercaseText.includes('how much')) {
      intent = 'pricing';
    }

    return { intent, keywords: foundKeywords, urgency };
  };

  // Smart service matching
  const findMatchingServices = (keywords: string[]): Service[] => {
    const allServices = serviceCategories.flatMap(cat => cat.services);
    
    return allServices.filter(service => {
      const searchText = `${service.name} ${service.description} ${service.category.name}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword));
    }).slice(0, 6); // Limit to top 6 results
  };

  // AI search handler
  const handleAISearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const analysis = processNaturalLanguage(searchQuery);
    const results = findMatchingServices(analysis.keywords);
    
    setSearchResults(results);
    if (onSearchResults) {
      onSearchResults(results);
    }

    // Generate AI suggestions based on the query
    const newSuggestions = smartSuggestions
      .filter(suggestion => 
        analysis.keywords.some(keyword => 
          suggestion.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 3);
    
    setAiSuggestions(newSuggestions);
    setIsProcessing(false);
  };

  const startVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAISearch(query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* AI Search Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
            <Sparkles className="h-5 w-5 text-primary-500 mr-2" />
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-16 pr-20 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-200"
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Voice Search Button */}
            <button
              type="button"
              onClick={isListening ? stopVoiceSearch : startVoiceSearch}
              className={`p-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isListening ? 'Stop listening' : 'Voice search'}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            
            {/* Search Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center"
            >
              {isProcessing ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <span className="mr-2">Search</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* AI Status */}
      {isListening && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Listening... Speak your request</span>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-lg">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>AI is processing your request...</span>
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      {showSuggestions && !isProcessing && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            ✨ Try these AI-powered suggestions:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(aiSuggestions.length > 0 ? aiSuggestions : smartSuggestions.slice(0, 4)).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  handleAISearch(suggestion);
                }}
                className="text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 group-hover:text-primary-700">
                    {suggestion}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Search Results Preview */}
      {searchResults.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 text-primary-500 mr-2" />
            AI Found {searchResults.length} Services for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-900 mb-1">{service.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-600">
                    {service.price.type === 'quote' ? 'Get Quote' : 
                     `${service.price.min.toLocaleString()} XAF`}
                  </span>
                  <button className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearch;