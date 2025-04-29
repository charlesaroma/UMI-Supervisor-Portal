import React from 'react';
import { Icon } from '@iconify/react';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white border border-[#E5E7EB] rounded-xl py-6 flex flex-col items-center">
        <div className="text-4xl font-bold text-[#111827] mb-1">45</div>
        <div className="text-sm text-gray-500">Recently Assigned</div>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-xl py-6 flex flex-col items-center">
        <div className="text-4xl font-bold text-[#111827] mb-1">14</div>
        <div className="flex items-center gap-1 text-sm font-bold text-[#939495]">
          Workshop
          <Icon icon="mdi:information-outline" className="text-gray-400 text-base" />
        </div>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-xl py-6 flex flex-col items-center">
        <div className="text-4xl font-bold text-[#111827] mb-1">26</div>
        <div className="flex items-center gap-1 text-sm font-bold text-[#939495]">
          Normal Progress
          <Icon icon="mdi:information-outline" className="text-gray-400 text-base" />
        </div>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-xl py-6 flex flex-col items-center">
        <div className="text-4xl font-bold text-[#111827] mb-1">9</div>
        <div className="flex items-center gap-1 text-sm font-bold text-[#939495]">
          Under examination
          <Icon icon="mdi:information-outline" className="text-[#939495] text-base" />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;