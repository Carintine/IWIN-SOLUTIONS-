import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CurrencyPair {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
  lastUpdate: string;
}

const FXQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Major currency pairs to track
  const currencyPairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 
    'AUD/USD', 'USD/CAD', 'NZD/USD', 'EUR/GBP'
  ];

  const fetchQuotes = async () => {
    try {
      setError(null);
      
      // Using Exchange Rate API (free tier)
      const promises = currencyPairs.map(async (pair) => {
        const [base, quote] = pair.split('/');
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const data = await response.json();
        
        const rate = data.rates[quote];
        const change = Math.random() * 0.02 - 0.01; // Simulated change for demo
        const changePercent = (change / rate) * 100;
        
        return {
          pair,
          rate: parseFloat(rate.toFixed(5)),
          change: parseFloat(change.toFixed(5)),
          changePercent: parseFloat(changePercent.toFixed(2)),
          lastUpdate: new Date().toLocaleTimeString()
        };
      });

      const results = await Promise.all(promises);
      setQuotes(results);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch FX quotes');
      setLoading(false);
      console.error('Error fetching FX quotes:', err);
    }
  };

  useEffect(() => {
    fetchQuotes();
    
    // Update every 30 seconds
    const interval = setInterval(fetchQuotes, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">FX Quotes</h2>
        <div className="animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">FX Quotes</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
        <button 
          onClick={fetchQuotes}
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
        <h2 className="text-xl font-semibold">FX Quotes</h2>
        <span className="text-sm text-gray-500">
          Last update: {quotes[0]?.lastUpdate}
        </span>
      </div>
      
      <div className="space-y-3">
        {quotes.map((quote) => (
          <div key={quote.pair} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{quote.pair}</span>
              {getChangeIcon(quote.change)}
            </div>
            
            <div className="text-right">
              <div className="font-mono text-lg">{quote.rate}</div>
              <div className={`text-sm ${getChangeColor(quote.change)}`}>
                {quote.change > 0 ? '+' : ''}{quote.change} ({quote.changePercent > 0 ? '+' : ''}{quote.changePercent}%)
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button 
          onClick={fetchQuotes}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Quotes
        </button>
      </div>
    </div>
  );
};

export default FXQuotes;