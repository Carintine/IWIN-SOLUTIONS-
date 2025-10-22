import React, { useState, useEffect } from 'react';
import { Bell, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Settings } from 'lucide-react';

interface TradingSignal {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  strength: 'STRONG' | 'MEDIUM' | 'WEAK';
  entry: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: number;
  confidence: number;
  indicators: string[];
  timestamp: string;
  status: 'ACTIVE' | 'TRIGGERED' | 'EXPIRED' | 'CANCELLED';
}

const SignalAlerts: React.FC = () => {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [signalSettings, setSignalSettings] = useState({
    minStrength: 'MEDIUM',
    minConfidence: 70,
    maxRisk: 2.0,
    enabledPairs: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF']
  });

  const generateMockSignals = (): TradingSignal[] => {
    const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD'];
    const types: ('BUY' | 'SELL')[] = ['BUY', 'SELL'];
    const strengths: ('STRONG' | 'MEDIUM' | 'WEAK')[] = ['STRONG', 'MEDIUM', 'WEAK'];
    const indicators = [
      'RSI Oversold', 'MACD Crossover', 'Moving Average Crossover', 
      'Support/Resistance Break', 'Bollinger Band Squeeze', 'Fibonacci Retracement'
    ];
    
    const mockSignals: TradingSignal[] = [];
    
    for (let i = 0; i < 5; i++) {
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const strength = strengths[Math.floor(Math.random() * strengths.length)];
      const basePrice = type === 'BUY' ? 1.1000 : 1.2000;
      const entry = basePrice + (Math.random() - 0.5) * 0.01;
      const stopLoss = type === 'BUY' ? entry - 0.005 : entry + 0.005;
      const takeProfit = type === 'BUY' ? entry + 0.015 : entry - 0.015;
      const riskReward = Math.abs(takeProfit - entry) / Math.abs(stopLoss - entry);
      const confidence = Math.floor(Math.random() * 30) + 70;
      
      mockSignals.push({
        id: `signal-${i + 1}`,
        pair,
        type,
        strength,
        entry: parseFloat(entry.toFixed(5)),
        stopLoss: parseFloat(stopLoss.toFixed(5)),
        takeProfit: parseFloat(takeProfit.toFixed(5)),
        riskReward: parseFloat(riskReward.toFixed(2)),
        confidence,
        indicators: indicators.slice(0, Math.floor(Math.random() * 3) + 1),
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE'
      });
    }
    
    return mockSignals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const fetchSignals = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSignals = generateMockSignals();
      setSignals(mockSignals);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch signals');
      setLoading(false);
      console.error('Error fetching signals:', err);
    }
  };

  useEffect(() => {
    fetchSignals();
    
    // Update signals every 2 minutes
    const interval = setInterval(fetchSignals, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getSignalColor = (type: string) => {
    return type === 'BUY' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'STRONG':
        return 'text-red-600 bg-red-100';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-100';
      case 'WEAK':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
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

  const filteredSignals = signals.filter(signal => {
    const strengthMatch = signalSettings.minStrength === 'WEAK' || 
                         (signalSettings.minStrength === 'MEDIUM' && signal.strength !== 'WEAK') ||
                         (signalSettings.minStrength === 'STRONG' && signal.strength === 'STRONG');
    const confidenceMatch = signal.confidence >= signalSettings.minConfidence;
    const riskMatch = signal.riskReward >= signalSettings.maxRisk;
    const pairMatch = signalSettings.enabledPairs.includes(signal.pair);
    
    return strengthMatch && confidenceMatch && riskMatch && pairMatch;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Trading Signals</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
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
        <h2 className="text-xl font-semibold mb-4">Trading Signals</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
        <button 
          onClick={fetchSignals}
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
        <h2 className="text-xl font-semibold">Trading Signals</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button 
            onClick={fetchSignals}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Refresh
          </button>
        </div>
      </div>
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-sm text-gray-900 mb-3">Signal Filters</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 mb-1">Min Strength</label>
              <select
                value={signalSettings.minStrength}
                onChange={(e) => setSignalSettings({...signalSettings, minStrength: e.target.value as any})}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="WEAK">Weak</option>
                <option value="MEDIUM">Medium</option>
                <option value="STRONG">Strong</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Min Confidence (%)</label>
              <input
                type="number"
                value={signalSettings.minConfidence}
                onChange={(e) => setSignalSettings({...signalSettings, minConfidence: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-2 py-1"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredSignals.map((signal) => (
          <div key={signal.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">{signal.pair}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSignalColor(signal.type)}`}>
                  {signal.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStrengthColor(signal.strength)}`}>
                  {signal.strength}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(signal.timestamp)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-gray-500">Entry:</span>
                <span className="ml-2 font-mono font-medium">{signal.entry}</span>
              </div>
              <div>
                <span className="text-gray-500">Stop Loss:</span>
                <span className="ml-2 font-mono font-medium">{signal.stopLoss}</span>
              </div>
              <div>
                <span className="text-gray-500">Take Profit:</span>
                <span className="ml-2 font-mono font-medium">{signal.takeProfit}</span>
              </div>
              <div>
                <span className="text-gray-500">R:R Ratio:</span>
                <span className="ml-2 font-mono font-medium">{signal.riskReward}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">Confidence:</span>
                <span className={`font-medium ${getConfidenceColor(signal.confidence)}`}>
                  {signal.confidence}%
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {signal.indicators.map((indicator, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    {indicator}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-500 text-white py-2 px-3 rounded text-sm hover:bg-green-600 transition-colors">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                Take Signal
              </button>
              <button className="flex-1 bg-gray-500 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors">
                <XCircle className="h-4 w-4 inline mr-1" />
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredSignals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p>No signals match your current filters.</p>
          <p className="text-xs">Try adjusting your settings or wait for new signals.</p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <AlertTriangle className="h-3 w-3 inline mr-1" />
          Signals are for educational purposes only. Always do your own analysis.
        </div>
      </div>
    </div>
  );
};

export default SignalAlerts;