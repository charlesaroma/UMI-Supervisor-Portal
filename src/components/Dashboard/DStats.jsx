import React from 'react';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">45</div>
        <div className="text-center text-gray-500">Recently Assigned</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">14</div>
        <div className="text-center text-gray-500">Workshop</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">26</div>
        <div className="text-center text-gray-500">Normal Progress</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">9</div>
        <div className="text-center text-gray-500">Under Examination</div>
      </div>
    </div>
  );
};

export default StatsCards;