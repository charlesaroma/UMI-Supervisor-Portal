import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const chartData = [
  { value: 32, color: '#14B8A6', label: 'Normal Progress', border: '#0F766E', bg: '#ccfbf1' },
  { value: 10, color: '#B45309', label: 'Book Submitted', border: '#b45309', bg: '#fffbeb' },
  { value: 9, color: '#0369A1', label: 'Under Examination', border: '#0369A1', bg: '#f0f9ff' },
];

const StatusReportChat = () => {
  return (
    <div className="p-6 flex flex-col h-full">
      <div className="mb-4">
        <select className="border border-[#E5E7EB] cursor-pointer rounded-lg px-4 py-2 text-gray-700 text-base font-medium shadow-sm focus:outline-none">
          <option>Status report</option>
        </select>
      </div>
      <div className="flex items-center justify-between flex-1">
        {/* Donut Chart with Recharts */}
        <div className="w-[170px] h-[170px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={62}
                paddingAngle={0}
                stroke="none"
              >
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.bg} stroke={entry.border} strokeWidth={1} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="ml-4 space-y-4">
          {chartData.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: d.color }}
              ></span>
              <span className="font-bold text-lg text-[#222]">{d.value}</span>
              <span className="text-gray-500 text-base">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusReportChat;