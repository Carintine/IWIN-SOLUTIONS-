import React from 'react';

const FXQuotes = () => <div className="bg-white rounded shadow p-4">FX Quotes (Real-time)</div>;
const TechnicalAnalysis = () => <div className="bg-white rounded shadow p-4">Technical Analysis Chart</div>;
const NewsFeed = () => <div className="bg-white rounded shadow p-4">Fundamental News Feed</div>;
const Sentiment = () => <div className="bg-white rounded shadow p-4">Sentiment Analysis</div>;
const SignalAlerts = () => <div className="bg-white rounded shadow p-4">Signal Alerts</div>;

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
        <Sentiment />
        <SignalAlerts />
      </div>
    </div>
  );
};

export default FXDashboardPage;