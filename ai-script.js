// BOLODEY AI-Powered Service Marketplace
// Enhanced JavaScript with African context and multilingual support

class BolodeyAI {
    constructor() {
        this.isListening = false;
        this.isChatOpen = false;
        this.recognition = null;
        this.chatMessages = [];
        
        // Sample service data for Cameroon
        this.services = [
            {
                id: 1,
                name: "Amina Nkomo",
                service: "House Cleaning",
                location: "Douala",
                rating: 4.9,
                reviews: 127,
                price: "15,000 CFA",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=300&fit=crop&crop=face",
                languages: ["French", "English", "Duala"],
                experience: "5+ years"
            },
            {
                id: 2,
                name: "Paul Mbarga",
                service: "Plumbing",
                location: "Yaoundé",
                rating: 4.8,
                reviews: 89,
                price: "25,000 CFA",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
                languages: ["French", "English"],
                experience: "8+ years"
            },
            {
                id: 3,
                name: "Grace Atem",
                service: "Hair Styling",
                location: "Bamenda",
                rating: 5.0,
                reviews: 156,
                price: "12,000 CFA",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=300&fit=crop&crop=face",
                languages: ["English", "French", "Pidgin"],
                experience: "6+ years"
            },
            {
                id: 4,
                name: "Samuel Fon",
                service: "Electrical Work",
                location: "Buea",
                rating: 4.9,
                reviews: 203,
                price: "30,000 CFA",
                image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=300&fit=crop&crop=face",
                languages: ["English", "French"],
                experience: "10+ years"
            },
            {
                id: 5,
                name: "Fatou Diallo",
                service: "Cleaning",
                location: "Douala",
                rating: 4.7,
                reviews: 92,
                price: "18,000 CFA",
                image: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=400&h=300&fit=crop&crop=face",
                languages: ["French", "Fulfulde"],
                experience: "4+ years"
            },
            {
                id: 6,
                name: "Jean-Baptiste Talla",
                service: "Carpentry",
                location: "Yaoundé",
                rating: 4.8,
                reviews: 134,
                price: "35,000 CFA",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
                languages: ["French", "English"],
                experience: "12+ years"
            }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupVoiceRecognition();
        this.setupChat();
        this.showWelcomeAnimation();
    }

    setupEventListeners() {
        // Search functionality
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('ai-search');
        const voiceBtn = document.getElementById('voice-btn');

        searchBtn?.addEventListener('click', () => this.performSearch());
        searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        voiceBtn?.addEventListener('click', () => this.toggleVoiceSearch());

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.currentTarget.querySelector('span').textContent;
                document.getElementById('ai-search').value = query;
                this.performSearch();
            });
        });

        // Chat functionality
        const chatToggle = document.getElementById('chat-toggle');
        const chatClose = document.getElementById('chat-close');
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');

        chatToggle?.addEventListener('click', () => this.toggleChat());
        chatClose?.addEventListener('click', () => this.closeChat());
        chatSend?.addEventListener('click', () => this.sendChatMessage());
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'fr-CM'; // Cameroon French

            this.recognition.onstart = () => {
                this.isListening = true;
                const voiceBtn = document.getElementById('voice-btn');
                voiceBtn.classList.add('voice-recording');
                this.showStatus('Listening... Speak in French, English, or Pidgin');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('ai-search').value = transcript;
                this.performSearch();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.showStatus('Voice search not available. Please type your request.');
            };

            this.recognition.onend = () => {
                this.isListening = false;
                const voiceBtn = document.getElementById('voice-btn');
                voiceBtn.classList.remove('voice-recording');
                this.hideStatus();
            };
        }
    }

    toggleVoiceSearch() {
        if (!this.recognition) {
            alert('Voice search is not supported in your browser. Please type your request.');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    performSearch() {
        const query = document.getElementById('ai-search').value.trim();
        if (!query) return;

        this.showStatus('AI is analyzing your request...');
        
        // Simulate AI processing delay
        setTimeout(() => {
            const results = this.searchServices(query);
            this.displayResults(results, query);
            this.hideStatus();
        }, 1500);
    }

    searchServices(query) {
        const lowerQuery = query.toLowerCase();
        
        // Simple keyword matching for demo
        const keywords = {
            'clean': ['cleaning', 'house cleaning'],
            'plumb': ['plumbing', 'plumber'],
            'hair': ['hair styling', 'hairdresser'],
            'electric': ['electrical work', 'electrician'],
            'carpen': ['carpentry', 'carpenter'],
            'douala': ['douala'],
            'yaoundé': ['yaoundé'],
            'bamenda': ['bamenda'],
            'buea': ['buea']
        };

        let results = this.services.filter(service => {
            for (const [key, values] of Object.entries(keywords)) {
                if (lowerQuery.includes(key)) {
                    return values.some(value => 
                        service.service.toLowerCase().includes(value) ||
                        service.location.toLowerCase().includes(value)
                    );
                }
            }
            return false;
        });

        // If no specific matches, return random sample
        if (results.length === 0) {
            results = this.services.slice(0, 3);
        }

        return results;
    }

    displayResults(results, query) {
        const resultsSection = document.getElementById('search-results');
        const resultsGrid = document.getElementById('results-grid');
        const resultsCount = document.getElementById('results-count');

        resultsCount.textContent = results.length;
        
        resultsGrid.innerHTML = results.map(service => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src="${service.image}" alt="${service.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="font-semibold text-lg text-gray-900 mb-2">${service.name}</h3>
                    <p class="text-orange-600 font-medium mb-2">${service.service}</p>
                    <p class="text-gray-600 text-sm mb-2">📍 ${service.location} • ${service.experience}</p>
                    <p class="text-gray-600 text-sm mb-3">Languages: ${service.languages.join(', ')}</p>
                    <div class="flex items-center mb-3">
                        <div class="flex text-yellow-400">
                            ${'⭐'.repeat(Math.floor(service.rating))}
                        </div>
                        <span class="text-gray-600 text-sm ml-2">${service.rating} (${service.reviews} reviews)</span>
                    </div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-bold text-gray-900">${service.price}</span>
                        <span class="text-sm text-gray-500">per service</span>
                    </div>
                    <button class="w-full primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
                        Book Now
                    </button>
                </div>
            </div>
        `).join('');

        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    setupChat() {
        // Pre-populate with welcome message (already in HTML)
        this.chatMessages = [
            {
                type: 'bot',
                message: "Hello! I'm your BOLODEY AI assistant. I can help you find services in Cameroon. Try asking me something like 'I need a cleaner in Douala' or 'Find me a plumber near me'."
            }
        ];
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        if (this.isChatOpen) {
            this.closeChat();
        } else {
            chatWindow.classList.remove('hidden');
            this.isChatOpen = true;
            // Remove the pulse animation when chat is opened
            document.getElementById('chat-toggle').classList.remove('animate-pulse');
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.classList.add('hidden');
        this.isChatOpen = false;
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message) return;

        // Add user message
        this.addChatMessage('user', message);
        chatInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addChatMessage('bot', response);
        }, 1000);
    }

    addChatMessage(type, message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        
        if (type === 'user') {
            messageElement.innerHTML = `
                <div class="flex items-start space-x-2 justify-end">
                    <div class="bg-orange-500 text-white rounded-lg p-3 max-w-xs">
                        <p class="text-sm">${message}</p>
                    </div>
                    <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-gray-600 text-sm">👤</span>
                    </div>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="flex items-start space-x-2">
                    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-sm">🤖</span>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p class="text-sm text-gray-800">${message}</p>
                    </div>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple response generation based on keywords
        if (lowerMessage.includes('clean')) {
            return "Great! I found several excellent cleaning services in your area. Would you like me to show you cleaners in Douala, Yaoundé, or another city? I can also filter by price range or specific cleaning services.";
        } else if (lowerMessage.includes('plumb')) {
            return "I can help you find certified plumbers! Are you dealing with a leak, installation, or general repairs? Which city are you located in? Our plumbers are available for emergency and scheduled services.";
        } else if (lowerMessage.includes('hair')) {
            return "Perfect! I have many talented hair stylists across Cameroon. Are you looking for braiding, cuts, coloring, or traditional African styles? I can recommend stylists who come to your location or work in salons.";
        } else if (lowerMessage.includes('electric')) {
            return "I'll help you find qualified electricians! Is this for home wiring, repairs, or installations? Our electricians are certified and experienced with both residential and commercial electrical work.";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return "Our services are competitively priced in CFA francs. Most cleaning services start from 15,000 CFA, plumbing from 25,000 CFA, and electrical work from 30,000 CFA. Prices vary by location and complexity.";
        } else if (lowerMessage.includes('douala')) {
            return "Douala has many excellent service providers! I can show you top-rated cleaners, plumbers, electricians, and more in Douala. What type of service do you need?";
        } else if (lowerMessage.includes('yaoundé')) {
            return "Yaoundé has great service options! I can find you reliable providers in the capital. What service are you looking for?";
        } else {
            return "I understand you need help finding a service! Could you tell me more specifically what you're looking for? For example: 'I need a cleaner in Douala' or 'Find me an electrician for tomorrow'. I'm here to help! 😊";
        }
    }

    showStatus(message) {
        const statusElement = document.getElementById('ai-status');
        const statusText = document.getElementById('status-text');
        
        statusText.textContent = message;
        statusElement.classList.remove('hidden');
        
        // Add processing animation
        const searchBtn = document.getElementById('search-btn');
        searchBtn.classList.add('ai-processing');
    }

    hideStatus() {
        const statusElement = document.getElementById('ai-status');
        statusElement.classList.add('hidden');
        
        // Remove processing animation
        const searchBtn = document.getElementById('search-btn');
        searchBtn.classList.remove('ai-processing');
    }

    showWelcomeAnimation() {
        // Animate elements on page load
        setTimeout(() => {
            const searchBar = document.getElementById('ai-search');
            searchBar.style.transform = 'scale(1.02)';
            setTimeout(() => {
                searchBar.style.transform = 'scale(1)';
            }, 200);
        }, 500);
        
        // Show a helpful tip after 3 seconds
        setTimeout(() => {
            if (!this.isChatOpen) {
                this.showStatus('💡 Try saying "I need a cleaner" or click the chat button for help!');
                setTimeout(() => this.hideStatus(), 3000);
            }
        }, 3000);
    }
}

// Initialize the BOLODEY AI system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.bolodeyAI = new BolodeyAI();
    console.log('🤖 BOLODEY AI System Initialized for Cameroon! 🇨🇲');
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BolodeyAI;
}