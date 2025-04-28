import React from 'react';

const StudentsStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">120</div>
        <div className="text-center text-gray-500">Total Students</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">45</div>
        <div className="text-center text-gray-500">Active Students</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">32</div>
        <div className="text-center text-gray-500">Graduated</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">18</div>
        <div className="text-center text-gray-500">On Hold</div>
      </div>
    </div>
  );
};

export default StudentsStats;