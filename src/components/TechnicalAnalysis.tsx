import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const TechnicalAnalysis: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [timeframe, setTimeframe] = useState('1H');
  const [chartData, setChartData] = useState<any>(null);
  const [rsiData, setRsiData] = useState<any>(null);
  const [macdData, setMacdData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const currencyPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF'];
  const timeframes = ['15M', '1H', '4H', '1D'];

  // Generate mock OHLC data
  const generateMockData = (pair: string, period: string): CandleData[] => {
    const data: CandleData[] = [];
    let basePrice = 1.1000; // Starting price
    
    for (let i = 0; i < 100; i++) {
      const change = (Math.random() - 0.5) * 0.01;
      const open = basePrice;
      const close = basePrice + change;
      const high = Math.max(open, close) + Math.random() * 0.005;
      const low = Math.min(open, close) - Math.random() * 0.005;
      const volume = Math.random() * 1000000 + 500000;
      
      data.push({
        time: new Date(Date.now() - (100 - i) * 60000).toISOString(),
        open,
        high,
        low,
        close,
        volume
      });
      
      basePrice = close;
    }
    
    return data;
  };

  // Calculate Simple Moving Average
  const calculateSMA = (data: number[], period: number): number[] => {
    const sma: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        sma.push(NaN);
      } else {
        const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
      }
    }
    return sma;
  };

  // Calculate RSI
  const calculateRSI = (data: number[], period: number = 14): number[] => {
    const rsi: number[] = [];
    const gains: number[] = [];
    const losses: number[] = [];
    
    for (let i = 1; i < data.length; i++) {
      const change = data[i] - data[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    for (let i = 0; i < data.length; i++) {
      if (i < period) {
        rsi.push(NaN);
      } else {
        const avgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
        const avgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
        const rs = avgGain / avgLoss;
        const rsiValue = 100 - (100 / (1 + rs));
        rsi.push(rsiValue);
      }
    }
    
    return rsi;
  };

  // Calculate MACD
  const calculateMACD = (data: number[]): { macd: number[], signal: number[], histogram: number[] } => {
    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);
    
    const macd: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (isNaN(ema12[i]) || isNaN(ema26[i])) {
        macd.push(NaN);
      } else {
        macd.push(ema12[i] - ema26[i]);
      }
    }
    
    const signal = calculateEMA(macd, 9);
    const histogram: number[] = [];
    
    for (let i = 0; i < macd.length; i++) {
      if (isNaN(macd[i]) || isNaN(signal[i])) {
        histogram.push(NaN);
      } else {
        histogram.push(macd[i] - signal[i]);
      }
    }
    
    return { macd, signal, histogram };
  };

  // Calculate Exponential Moving Average
  const calculateEMA = (data: number[], period: number): number[] => {
    const ema: number[] = [];
    const multiplier = 2 / (period + 1);
    
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        ema.push(data[i]);
      } else {
        ema.push((data[i] * multiplier) + (ema[i - 1] * (1 - multiplier)));
      }
    }
    
    return ema;
  };

  useEffect(() => {
    const loadChartData = () => {
      setLoading(true);
      
      // Generate mock data
      const mockData = generateMockData(selectedPair, timeframe);
      const closePrices = mockData.map(d => d.close);
      const times = mockData.map(d => d.time);
      
      // Calculate indicators
      const sma20 = calculateSMA(closePrices, 20);
      const sma50 = calculateSMA(closePrices, 50);
      const rsi = calculateRSI(closePrices);
      const { macd, signal, histogram } = calculateMACD(closePrices);
      
      // Main chart data
      setChartData({
        labels: times,
        datasets: [
          {
            label: 'Price',
            data: closePrices,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'SMA 20',
            data: sma20,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'SMA 50',
            data: sma50,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: false,
          },
        ],
      });
      
      // RSI data
      setRsiData({
        labels: times,
        datasets: [
          {
            label: 'RSI',
            data: rsi,
            borderColor: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      });
      
      // MACD data
      setMacdData({
        labels: times,
        datasets: [
          {
            label: 'MACD',
            data: macd,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Signal',
            data: signal,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Histogram',
            data: histogram,
            type: 'bar' as const,
            backgroundColor: histogram.map(h => h >= 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'),
            borderColor: histogram.map(h => h >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'),
            borderWidth: 1,
          },
        ],
      });
      
      setLoading(false);
    };
    
    loadChartData();
  }, [selectedPair, timeframe]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${selectedPair} - ${timeframe}`,
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'hour' as const,
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  const rsiOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'RSI (14)',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  const macdOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'MACD',
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Technical Analysis</h2>
        <div className="flex space-x-2">
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {currencyPairs.map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {timeframes.map(tf => (
              <option key={tf} value={tf}>{tf}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Main Price Chart */}
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
        
        {/* RSI Chart */}
        <div className="h-32">
          <Line data={rsiData} options={rsiOptions} />
        </div>
        
        {/* MACD Chart */}
        <div className="h-32">
          <Bar data={macdData} options={macdOptions} />
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;