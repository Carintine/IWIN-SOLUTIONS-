import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Users, BarChart3 } from 'lucide-react';

interface SentimentData {
  fearGreedIndex: number;
  socialSentiment: number;
  institutionalPositioning: number;
  volatilityIndex: number;
  lastUpdate: string;
}

interface SentimentMetric {
  name: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const SentimentAnalysis: React.FC = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSentimentData = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock sentiment data
      const mockData: SentimentData = {
        fearGreedIndex: Math.floor(Math.random() * 100),
        socialSentiment: Math.floor(Math.random() * 100),
        institutionalPositioning: Math.floor(Math.random() * 100),
        volatilityIndex: Math.floor(Math.random() * 100),
        lastUpdate: new Date().toLocaleTimeString()
      };
      
      setSentimentData(mockData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch sentiment data');
      setLoading(false);
      console.error('Error fetching sentiment data:', err);
    }
  };

  useEffect(() => {
    fetchSentimentData();
    
    // Update every 5 minutes
    const interval = setInterval(fetchSentimentData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getFearGreedLabel = (index: number) => {
    if (index >= 80) return 'Extreme Greed';
    if (index >= 60) return 'Greed';
    if (index >= 40) return 'Neutral';
    if (index >= 20) return 'Fear';
    return 'Extreme Fear';
  };

  const getFearGreedColor = (index: number) => {
    if (index >= 80) return 'text-red-600 bg-red-100';
    if (index >= 60) return 'text-orange-600 bg-orange-100';
    if (index >= 40) return 'text-yellow-600 bg-yellow-100';
    if (index >= 20) return 'text-blue-600 bg-blue-100';
    return 'text-green-600 bg-green-100';
  };

  const getSentimentColor = (value: number) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentIcon = (value: number) => {
    if (value >= 70) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value >= 50) return <Activity className="h-4 w-4 text-yellow-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getVolatilityColor = (value: number) => {
    if (value >= 70) return 'text-red-600';
    if (value >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !sentimentData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
        <button 
          onClick={fetchSentimentData}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const sentimentMetrics: SentimentMetric[] = [
    {
      name: 'Fear & Greed Index',
      value: sentimentData.fearGreedIndex,
      change: Math.random() * 10 - 5,
      icon: <Activity className="h-5 w-5" />,
      color: getFearGreedColor(sentimentData.fearGreedIndex),
      description: getFearGreedLabel(sentimentData.fearGreedIndex)
    },
    {
      name: 'Social Sentiment',
      value: sentimentData.socialSentiment,
      change: Math.random() * 10 - 5,
      icon: <Users className="h-5 w-5" />,
      color: getSentimentColor(sentimentData.socialSentiment),
      description: sentimentData.socialSentiment >= 70 ? 'Bullish' : sentimentData.socialSentiment >= 50 ? 'Neutral' : 'Bearish'
    },
    {
      name: 'Institutional Positioning',
      value: sentimentData.institutionalPositioning,
      change: Math.random() * 10 - 5,
      icon: <BarChart3 className="h-5 w-5" />,
      color: getSentimentColor(sentimentData.institutionalPositioning),
      description: sentimentData.institutionalPositioning >= 70 ? 'Long' : sentimentData.institutionalPositioning >= 50 ? 'Neutral' : 'Short'
    },
    {
      name: 'Volatility Index',
      value: sentimentData.volatilityIndex,
      change: Math.random() * 10 - 5,
      icon: <TrendingUp className="h-5 w-5" />,
      color: getVolatilityColor(sentimentData.volatilityIndex),
      description: sentimentData.volatilityIndex >= 70 ? 'High' : sentimentData.volatilityIndex >= 40 ? 'Medium' : 'Low'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Market Sentiment</h2>
        <span className="text-sm text-gray-500">
          Last update: {sentimentData.lastUpdate}
        </span>
      </div>
      
      <div className="space-y-4">
        {sentimentMetrics.map((metric) => (
          <div key={metric.name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${metric.color.split(' ')[1]}`}>
                  {React.cloneElement(metric.icon as React.ReactElement, { 
                    className: `${metric.color.split(' ')[0]} h-4 w-4` 
                  })}
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-900">{metric.name}</h3>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                <div className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${metric.color.split(' ')[1].replace('bg-', 'bg-').replace('-100', '-500')}`}
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Market Overview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-sm text-gray-900 mb-2">Market Overview</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-500">Overall Sentiment:</span>
            <span className={`ml-2 font-medium ${getSentimentColor((sentimentData.socialSentiment + sentimentData.institutionalPositioning) / 2)}`}>
              {((sentimentData.socialSentiment + sentimentData.institutionalPositioning) / 2) >= 70 ? 'Bullish' : 
               ((sentimentData.socialSentiment + sentimentData.institutionalPositioning) / 2) >= 50 ? 'Neutral' : 'Bearish'}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Risk Level:</span>
            <span className={`ml-2 font-medium ${getVolatilityColor(sentimentData.volatilityIndex)}`}>
              {sentimentData.volatilityIndex >= 70 ? 'High' : sentimentData.volatilityIndex >= 40 ? 'Medium' : 'Low'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button 
          onClick={fetchSentimentData}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Sentiment
        </button>
      </div>
    </div>
  );
};

export default SentimentAnalysis;