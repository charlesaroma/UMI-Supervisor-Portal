import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';
import { RiArrowDownSLine } from 'react-icons/ri';

const statusTypes = [
  { value: 'main', label: 'Student Statuses' },
  { value: 'book', label: 'Dissertation Statuses' },
  { value: 'proposal', label: 'Proposal Statuses' },
];

const defaultChartData = [
  { label: 'Normal Progress', value: 32, color: '#14B8A6', bg: '#ccfbf1', border: '#0F766E' },
  { label: 'Book Submitted', value: 10, color: '#B45309', bg: '#fffbeb', border: '#b45309' },
  { label: 'Under Examination', value: 9, color: '#0369A1', bg: '#f0f9ff', border: '#0369A1' },
];

const DashboardStatusReportChat = ({ chartData = defaultChartData, statusType: initialStatusType = 'Student Statuses' }) => {
  const [statusType, setStatusType] = useState('main');

  // For now, use the same mock data for all types
  const data = chartData;
  const total = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      {/* Card Header */}
      <div className="flex flex-row items-start justify-between gap-2 px-4 pt-4 pb-2">
        <div>
          <h3 className="text-md font-semibold text-gray-700">Status Distribution</h3>
          <p className="text-xs text-gray-400">Current student status breakdown</p>
        </div>
        <div className="relative">
          <select
            className="w-[160px] text-xs font-medium border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none"
            value={statusType}
            onChange={e => setStatusType(e.target.value)}
          >
            {statusTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Chart */}
      <div className="flex-1 flex flex-col items-center justify-center pb-2">
        <div className="w-full aspect-square max-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg bg-white p-2 shadow-md border text-xs">
                      <p className="font-semibold">{d.label}</p>
                      <p className="text-gray-500">{d.value} students ({((d.value / total) * 100).toFixed(1)}%)</p>
                    </div>
                  );
                }}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                cx="50%"
                cy="50%"
              >
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.bg} stroke={entry.border} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox) return null;
                    const { cx, cy } = viewBox;
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={cx} y={cy} className="fill-gray-900 text-xl font-bold">{total}</tspan>
                        <tspan x={cx} y={cy + 18} className="fill-gray-400 text-xs">Total Students</tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-1 w-full px-4">
          {data.map((d, idx) => (
            <div key={d.label} className="flex items-start space-x-2">
              <div className="w-3 h-3 rounded-full mt-1" style={{ backgroundColor: d.bg }} />
              <div className="flex flex-col w-full">
                <span className="text-xs font-medium text-gray-900">{d.label}</span>
                <span className="text-xs text-gray-400">{d.value} ({((d.value / total) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatusReportChat;