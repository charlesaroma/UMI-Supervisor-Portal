import React from 'react';
import { RiInformationLine } from 'react-icons/ri';

const statCards = [
  { label: "Recently Assigned", valueKey: "assignedStudentsCount", info: "Number of students recently assigned" },
  { label: "Workshop", valueKey: "workshopCount", info: "Number of workshops" },
  { label: "Normal Progress", valueKey: "normalProgressCount", info: "Students in normal progress" },
  { label: "Under examination", valueKey: "underExaminationCount", info: "Students under examination" }
];

const InfoTooltip = ({ text }) => (
  <span className="relative group cursor-pointer">
    <RiInformationLine className="w-4 h-4 text-gray-400" />
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
      {text}
    </span>
  </span>
);

const DashboardStats = ({ statValues }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((card) => (
        <div key={card.label} className="bg-white p-6 rounded-lg shadow-md text-left hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-3xl font-semibold text-gray-900">{statValues[card.valueKey]}</h2>
          <div className="text-sm font-medium text-gray-500 flex items-center gap-1 mt-1">
            {card.label}
            {card.info && <InfoTooltip text={card.info} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;