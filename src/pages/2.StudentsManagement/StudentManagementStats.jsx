import React from 'react';

const stats = [
  { value: 120, label: 'Total Students' },
  { value: 45, label: 'Active Students' },
  { value: 32, label: 'Graduated' },
  { value: 18, label: 'On Hold' },
];

const StudentsStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-4xl font-bold text-center">{stat.value}</div>
          <div className="text-center text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StudentsStats;