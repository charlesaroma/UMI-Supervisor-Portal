// Imports
import React from 'react';
import { Icon } from '@iconify/react';

// Data
const defaultStats = [
  { key: 'submitted', value: 45, label: 'Proposals Submitted' },
  { key: 'passed', value: 14, label: 'Status: Proposal Graded - Passed', tooltip: 'Number of proposals that have been graded and passed.' },
  { key: 'failed', value: 26, label: 'Status: Proposal Graded - Failed', tooltip: 'Number of proposals that have been graded and failed.' },
];

// Component
const GradesStats = ({ stats = defaultStats }) => {
  return (
    // Stats grid container
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Map over stats array to render each stat card */}
      {stats.map((stat) => (
        // Individual stat card
        <div key={stat.key} className="bg-white p-4 rounded-lg shadow-sm">
          {/* Stat value */}
          <div className="text-4xl font-bold text-center">{stat.value}</div>
          {/* Stat label and optional tooltip */}
          <div className="text-center text-gray-500 flex items-center justify-center gap-1">
            {stat.label.replace('Status: ', 'Status: ')}
            {stat.tooltip && (
              // Tooltip icon and popup
              <span className="ml-1 relative group inline-block align-middle">
                <Icon icon="mdi:information" className="text-[#939495] text-lg" />
                <span
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 text-xs text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-normal pointer-events-none bg-[#939495]"
                >
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

// ===================== Exports =====================
export default GradesStats;