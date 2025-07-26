import React from 'react';
import FXQuotes from '../components/FXQuotes';
import TechnicalAnalysis from '../components/TechnicalAnalysis';
import NewsFeed from '../components/NewsFeed';
import SentimentAnalysis from '../components/SentimentAnalysis';
import SignalAlerts from '../components/SignalAlerts';

const FXDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">FX Trading Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FXQuotes />
        <TechnicalAnalysis />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NewsFeed />
        <SentimentAnalysis />
        <SignalAlerts />
      </div>
    </div>
  );
};

export default FXDashboardPage;