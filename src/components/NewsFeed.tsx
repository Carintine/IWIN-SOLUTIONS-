import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, Filter } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');

  const categories = ['all', 'forex', 'economics', 'central-banks', 'politics'];
  const sentiments = ['all', 'positive', 'negative', 'neutral'];

  // Mock news data (in a real app, you'd use NewsAPI or similar)
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'ECB Signals Potential Rate Cut in March Meeting',
      description: 'European Central Bank officials hint at possible interest rate reduction as inflation continues to decline across the Eurozone.',
      url: '#',
      publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      source: 'Reuters',
      sentiment: 'negative',
      category: 'central-banks'
    },
    {
      id: '2',
      title: 'US Dollar Strengthens on Strong Employment Data',
      description: 'The greenback gains ground against major currencies following better-than-expected non-farm payrolls report.',
      url: '#',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: 'Bloomberg',
      sentiment: 'positive',
      category: 'economics'
    },
    {
      id: '3',
      title: 'GBP/USD Hits 3-Month High on Brexit Deal Optimism',
      description: 'Sterling rallies as UK and EU negotiators make progress on trade agreement terms.',
      url: '#',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: 'Financial Times',
      sentiment: 'positive',
      category: 'forex'
    },
    {
      id: '4',
      title: 'Federal Reserve Maintains Hawkish Stance',
      description: 'Fed officials emphasize continued monetary tightening despite recent market volatility.',
      url: '#',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: 'CNBC',
      sentiment: 'negative',
      category: 'central-banks'
    },
    {
      id: '5',
      title: 'Japanese Yen Weakens on BoJ Policy Decision',
      description: 'Bank of Japan keeps ultra-loose monetary policy, leading to yen depreciation.',
      url: '#',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: 'Nikkei',
      sentiment: 'negative',
      category: 'central-banks'
    },
    {
      id: '6',
      title: 'Oil Prices Surge, CAD Benefits',
      description: 'Canadian dollar strengthens as crude oil prices reach new highs on supply concerns.',
      url: '#',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      source: 'MarketWatch',
      sentiment: 'positive',
      category: 'forex'
    }
  ];

  const fetchNews = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd fetch from NewsAPI or similar
      // const response = await fetch(`https://newsapi.org/v2/everything?q=forex+currency&apiKey=YOUR_API_KEY`);
      // const data = await response.json();
      
      setNews(mockNews);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news');
      setLoading(false);
      console.error('Error fetching news:', err);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      case 'neutral':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '📈';
      case 'negative':
        return '📉';
      case 'neutral':
        return '➡️';
      default:
        return '➡️';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const filteredNews = news.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const sentimentMatch = selectedSentiment === 'all' || item.sentiment === selectedSentiment;
    return categoryMatch && sentimentMatch;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Market News</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Market News</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
        <button 
          onClick={fetchNews}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Market News</h2>
        <button 
          onClick={fetchNews}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          Refresh
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-xs"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
        <select
          value={selectedSentiment}
          onChange={(e) => setSelectedSentiment(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-xs"
        >
          {sentiments.map(sent => (
            <option key={sent} value={sent}>
              {sent.charAt(0).toUpperCase() + sent.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                {item.title}
              </h3>
              <span className="text-lg ml-2">
                {getSentimentIcon(item.sentiment)}
              </span>
            </div>
            
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {item.description}
            </p>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{item.source}</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeAgo(item.publishedAt)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(item.sentiment)}`}>
                  {item.sentiment}
                </span>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredNews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No news found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default NewsFeed;