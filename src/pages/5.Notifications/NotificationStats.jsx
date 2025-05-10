import React from 'react';
import { Icon } from '@iconify/react';

const stats = [
  { value: 45, label: 'Recently Enrolled' },
  { value: 14, label: 'Status: Workshop', tooltip: 'Number of students in workshop status.' },
  { value: 26, label: 'Status: Normal Progress', tooltip: 'Number of students in normal progress.' },
];

const NotificationStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-4xl font-bold text-center">{stat.value}</div>
          <div className="text-center text-gray-500 flex items-center justify-center gap-1">
            {stat.label}
            {stat.tooltip && (
              <span className="ml-1 relative group inline-block align-middle">
                <Icon icon="mdi:information" className="text-[#939495] text-lg" />
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 text-xs text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-normal pointer-events-none bg-[#939495]">
                  {stat.tooltip}
                </span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationStats;