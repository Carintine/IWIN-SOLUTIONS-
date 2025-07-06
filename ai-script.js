// BOLODEY AI-Powered Service Marketplace
// AI Script for HTML Version

// Mock service data
const mockServices = [
    {
        id: 1,
        name: "Professional House Cleaning",
        description: "Deep cleaning service for homes and apartments",
        category: "Home Services",
        price: "15000 XAF",
        rating: 4.8,
        keywords: ["clean", "cleaning", "house", "home", "apartment", "deep"]
    },
    {
        id: 2,
        name: "Plumbing Repair Service",
        description: "Fix leaks, install pipes, and emergency plumbing",
        category: "Home Services",
        price: "8000 XAF",
        rating: 4.9,
        keywords: ["plumb", "plumber", "leak", "pipe", "water", "bathroom", "kitchen"]
    },
    {
        id: 3,
        name: "Electrical Repair & Installation",
        description: "Wiring, outlets, and electrical system repairs",
        category: "Home Services",
        price: "12000 XAF",
        rating: 4.7,
        keywords: ["electric", "electrical", "wiring", "outlet", "power", "lights"]
    },
    {
        id: 4,
        name: "Professional Hair Styling",
        description: "Home visit hairdressing and styling services",
        category: "Personal Care",
        price: "5000 XAF",
        rating: 4.6,
        keywords: ["hair", "hairdress", "style", "cut", "beauty", "salon"]
    },
    {
        id: 5,
        name: "Makeup Artist Service",
        description: "Professional makeup for events and occasions",
        category: "Personal Care",
        price: "8000 XAF",
        rating: 4.8,
        keywords: ["makeup", "beauty", "artist", "event", "wedding", "party"]
    },
    {
        id: 6,
        name: "Mobile Phone Repair",
        description: "Screen repair, battery replacement, and more",
        category: "Repair Services",
        price: "3000 XAF",
        rating: 4.5,
        keywords: ["phone", "mobile", "repair", "screen", "battery", "fix"]
    },
    {
        id: 7,
        name: "Graphic Design Service",
        description: "Logo design, branding, and marketing materials",
        category: "Business Support",
        price: "25000 XAF",
        rating: 4.9,
        keywords: ["design", "graphic", "logo", "brand", "marketing", "business"]
    },
    {
        id: 8,
        name: "Home Massage Therapy",
        description: "Relaxing massage therapy at your location",
        category: "Personal Care",
        price: "12000 XAF",
        rating: 4.7,
        keywords: ["massage", "therapy", "relax", "health", "wellness", "spa"]
    },
    {
        id: 9,
        name: "Carpentry & Furniture Repair",
        description: "Custom furniture and repair services",
        category: "Home Services",
        price: "20000 XAF",
        rating: 4.6,
        keywords: ["carpenter", "carpentry", "furniture", "wood", "repair", "custom"]
    },
    {
        id: 10,
        name: "Computer Repair Service",
        description: "Laptop and desktop repair and maintenance",
        category: "Repair Services",
        price: "7000 XAF",
        rating: 4.4,
        keywords: ["computer", "laptop", "desktop", "repair", "fix", "maintenance"]
    }
];

// AI Chat responses
const chatResponses = {
    greetings: [
        "Hello! 👋 I'm BOLODEY AI Assistant. How can I help you find the perfect service today?",
        "Hi there! 😊 I'm here to help you discover amazing services in Cameroon. What do you need?",
        "Welcome to BOLODEY! 🌟 I can help you find services, answer questions, or guide you through booking."
    ],
    services: {
        "clean": "Great! I found several cleaning services for you. We have professional house cleaning, commercial cleaning, and deep cleaning services available. 🧹",
        "plumb": "I can help you find a qualified plumber! Our verified plumbers handle repairs, installations, and emergency fixes. 🔧",
        "electric": "Need electrical work? Our certified electricians can help with repairs, installations, and wiring. Safety first! ⚡",
        "hair": "Looking fabulous! 💄 We have professional hairdressers and makeup artists who can come to your location.",
        "massage": "Perfect for relaxation! 🧘‍♀️ Our certified massage therapists provide home visits for ultimate comfort.",
        "repair": "I can help you find repair services! Whether it's phones, computers, or appliances, we've got you covered. 🔧",
        "design": "Creative services coming up! 🎨 Our graphic designers can help with logos, branding, and marketing materials."
    },
    pricing: "Pricing varies by service type and complexity. Most services range from 3,000 to 50,000 XAF. Here's what affects pricing: 📊\n\n• Service type and duration\n• Location in Cameroon\n• Urgency of request\n• Materials needed\n\nI can show you specific pricing for any service!",
    booking: "Booking is easy! 📅 Here's how:\n\n1. Choose your service\n2. Select date and time\n3. Enter your location\n4. Choose payment method\n5. Confirm booking\n\nWhat service would you like to book?",
    payment: "We accept multiple payment methods in Cameroon: 💳\n\n• MTN Mobile Money\n• Orange Money\n• Credit/Debit Cards\n• Cash on Delivery\n\nAll payments are secure and verified!",
    location: "We currently serve major cities in Cameroon: 🌍\n\n• Douala\n• Yaoundé\n• Bamenda\n• Bafoussam\n• And more!\n\nExpanding to more areas soon. What's your location?",
    default: "I'm here to help! I can assist with:\n\n🔍 Finding services\n📅 Booking appointments\n💰 Pricing information\n📍 Service areas\n❓ General questions\n\nWhat would you like to know?"
};

// AI Processing Functions
class BolodeyAI {
    constructor() {
        this.isListening = false;
        this.recognition = null;
        this.chatHistory = [];
        this.initializeEventListeners();
        this.initializeSpeechRecognition();
    }

    initializeEventListeners() {
        // Search functionality
        document.getElementById('search-btn').addEventListener('click', () => this.handleSearch());
        document.getElementById('ai-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // Voice search
        document.getElementById('voice-btn').addEventListener('click', () => this.toggleVoiceSearch());
        
        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = e.currentTarget.querySelector('span').textContent;
                document.getElementById('ai-search').value = text;
                this.handleSearch();
            });
        });

        // Chat functionality
        document.getElementById('chat-toggle').addEventListener('click', () => this.toggleChat());
        document.getElementById('chat-close').addEventListener('click', () => this.closeChat());
        document.getElementById('chat-send').addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('ai-search').value = transcript;
                this.handleSearch();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton();
            };
        }
    }

    toggleVoiceSearch() {
        if (!this.recognition) {
            alert('Voice search is not supported in this browser. Please use Chrome or Firefox.');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.isListening = true;
            this.updateVoiceButton();
            this.recognition.start();
        }
    }

    updateVoiceButton() {
        const voiceBtn = document.getElementById('voice-btn');
        const statusDiv = document.getElementById('ai-status');
        const statusText = document.getElementById('status-text');

        if (this.isListening) {
            voiceBtn.className = 'p-2 rounded-lg voice-recording text-white transition-colors';
            statusDiv.className = 'mt-4 text-center';
            statusText.textContent = 'Listening... Speak your request';
        } else {
            voiceBtn.className = 'p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors';
            statusDiv.className = 'hidden mt-4 text-center';
        }
    }

    async handleSearch() {
        const query = document.getElementById('ai-search').value.trim();
        if (!query) return;

        this.showAIProcessing();
        
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const results = this.processNaturalLanguageQuery(query);
        this.displaySearchResults(results);
        this.hideAIProcessing();
    }

    showAIProcessing() {
        const statusDiv = document.getElementById('ai-status');
        const statusText = document.getElementById('status-text');
        statusDiv.className = 'mt-4 text-center';
        statusText.textContent = 'AI is processing your request...';
    }

    hideAIProcessing() {
        const statusDiv = document.getElementById('ai-status');
        statusDiv.className = 'hidden mt-4 text-center';
    }

    processNaturalLanguageQuery(query) {
        const lowercaseQuery = query.toLowerCase();
        
        // Extract keywords
        const keywords = this.extractKeywords(lowercaseQuery);
        
        // Find matching services
        const matchingServices = mockServices.filter(service => {
            return keywords.some(keyword => 
                service.keywords.some(serviceKeyword => 
                    serviceKeyword.includes(keyword) || keyword.includes(serviceKeyword)
                )
            );
        });

        // Sort by relevance (simple scoring)
        return matchingServices.sort((a, b) => {
            const scoreA = this.calculateRelevanceScore(a, keywords);
            const scoreB = this.calculateRelevanceScore(b, keywords);
            return scoreB - scoreA;
        });
    }

    extractKeywords(query) {
        // Remove common words and extract meaningful keywords
        const commonWords = ['i', 'need', 'want', 'looking', 'for', 'someone', 'to', 'a', 'an', 'the', 'my', 'me', 'help', 'find'];
        const words = query.split(/\s+/).filter(word => 
            word.length > 2 && !commonWords.includes(word)
        );
        
        // Add service-specific keywords
        const serviceKeywords = [];
        if (query.includes('clean')) serviceKeywords.push('clean', 'cleaning');
        if (query.includes('plumb')) serviceKeywords.push('plumb', 'plumber');
        if (query.includes('electric')) serviceKeywords.push('electric', 'electrical');
        if (query.includes('hair')) serviceKeywords.push('hair', 'hairdress');
        if (query.includes('makeup')) serviceKeywords.push('makeup', 'beauty');
        if (query.includes('massage')) serviceKeywords.push('massage', 'therapy');
        if (query.includes('repair')) serviceKeywords.push('repair', 'fix');
        if (query.includes('design')) serviceKeywords.push('design', 'graphic');
        
        return [...new Set([...words, ...serviceKeywords])];
    }

    calculateRelevanceScore(service, keywords) {
        let score = 0;
        keywords.forEach(keyword => {
            service.keywords.forEach(serviceKeyword => {
                if (serviceKeyword.includes(keyword) || keyword.includes(serviceKeyword)) {
                    score += keyword === serviceKeyword ? 3 : 1;
                }
            });
        });
        return score;
    }

    displaySearchResults(results) {
        const resultsSection = document.getElementById('search-results');
        const resultsGrid = document.getElementById('results-grid');
        const resultsCount = document.getElementById('results-count');

        if (results.length === 0) {
            resultsSection.className = 'hidden py-16 bg-white';
            return;
        }

        resultsCount.textContent = results.length;
        resultsGrid.innerHTML = '';

        results.forEach(service => {
            const serviceCard = this.createServiceCard(service);
            resultsGrid.appendChild(serviceCard);
        });

        resultsSection.className = 'py-16 bg-white';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'bg-white border rounded-lg p-6 hover:shadow-md transition-shadow';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-semibold text-gray-900">${service.name}</h3>
                <div class="flex items-center text-sm text-yellow-600">
                    <span>⭐</span>
                    <span class="ml-1">${service.rating}</span>
                </div>
            </div>
            <p class="text-gray-600 mb-3">${service.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-lg font-bold text-orange-600">${service.price}</span>
                <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Book Now
                </button>
            </div>
            <div class="mt-3 text-sm text-gray-500">
                📍 ${service.category}
            </div>
        `;
        return card;
    }

    // Chat functionality
    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatToggle = document.getElementById('chat-toggle');
        
        if (chatWindow.classList.contains('hidden')) {
            this.openChat();
        } else {
            this.closeChat();
        }
    }

    openChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatToggle = document.getElementById('chat-toggle');
        
        chatWindow.classList.remove('hidden');
        chatToggle.className = 'w-14 h-14 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center';
        
        // Add welcome message if first time
        if (this.chatHistory.length === 0) {
            setTimeout(() => {
                this.addBotMessage(chatResponses.greetings[0]);
            }, 500);
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatToggle = document.getElementById('chat-toggle');
        
        chatWindow.classList.add('hidden');
        chatToggle.className = 'w-14 h-14 primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 flex items-center justify-center animate-pulse';
    }

    async sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message) return;

        this.addUserMessage(message);
        chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        this.hideTypingIndicator();
        const response = this.generateChatResponse(message);
        this.addBotMessage(response);
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-end';
        messageDiv.innerHTML = `
            <div class="bg-orange-500 text-white p-3 rounded-lg max-w-xs">
                <p class="text-sm">${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        this.scrollChatToBottom();
        
        this.chatHistory.push({ type: 'user', message });
    }

    addBotMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-start';
        messageDiv.innerHTML = `
            <div class="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs">
                <p class="text-sm whitespace-pre-line">${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        this.scrollChatToBottom();
        
        this.chatHistory.push({ type: 'bot', message });
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start';
        typingDiv.innerHTML = `
            <div class="bg-gray-100 p-3 rounded-lg">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        this.scrollChatToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollChatToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateChatResponse(message) {
        const lowercaseMessage = message.toLowerCase();

        // Greeting responses
        if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
            return chatResponses.greetings[Math.floor(Math.random() * chatResponses.greetings.length)];
        }

        // Service-specific responses
        for (const [keyword, response] of Object.entries(chatResponses.services)) {
            if (lowercaseMessage.includes(keyword)) {
                return response;
            }
        }

        // Pricing questions
        if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('how much')) {
            return chatResponses.pricing;
        }

        // Booking questions
        if (lowercaseMessage.includes('book') || lowercaseMessage.includes('hire') || lowercaseMessage.includes('schedule')) {
            return chatResponses.booking;
        }

        // Payment questions
        if (lowercaseMessage.includes('payment') || lowercaseMessage.includes('pay') || lowercaseMessage.includes('money')) {
            return chatResponses.payment;
        }

        // Location questions
        if (lowercaseMessage.includes('location') || lowercaseMessage.includes('area') || lowercaseMessage.includes('where')) {
            return chatResponses.location;
        }

        // Default response
        return chatResponses.default;
    }
}

// Initialize the AI system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const bolodeyAI = new BolodeyAI();
    
    // Add some startup animations
    setTimeout(() => {
        document.querySelector('.animate-pulse').style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
    }, 1000);
    
    console.log('🤖 BOLODEY AI System Initialized');
    console.log('🎯 Try voice search, AI chat, or natural language queries!');
});

// Add some helper functions
function smoothScroll(targetId) {
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
}

// Add click handlers for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});