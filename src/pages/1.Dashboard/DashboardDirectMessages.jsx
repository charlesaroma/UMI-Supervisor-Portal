import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

const DashboardDirectMessages = ({ messages }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-base">Direct Messages</span>
        <button className="text-xs font-medium text-[#23388F] flex items-center gap-1 px-2 py-1 rounded hover:bg-[#ECF6FB]">View More <RiArrowDownSLine className="w-4 h-4" /></button>
      </div>
      <div className="flex-1 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-center gap-3 py-2 border-b last:border-b-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base ${msg.color}`}>{msg.initials}</div>
            <div className="flex-1">
              <div className="font-medium text-xs text-gray-900">{msg.sender}</div>
              <div className="text-xs text-gray-500 truncate max-w-[180px]">{msg.message}</div>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">{msg.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardDirectMessages;