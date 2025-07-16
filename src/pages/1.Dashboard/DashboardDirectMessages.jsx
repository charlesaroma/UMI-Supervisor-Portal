import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

const DashboardDirectMessages = ({ messages, isLoading, onViewMore }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-base">Direct Messages</span>
        <button 
          onClick={onViewMore}
          className="text-xs font-medium text-[#23388F] flex items-center gap-1 px-2 py-1 rounded hover:bg-[#ECF6FB]"
        >
          View More <RiArrowDownSLine className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 space-y-2">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3 py-2 border-b last:border-b-0 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        ) : messages && messages.length > 0 ? (
          // Actual messages
          messages.map((msg, idx) => (
            <div key={idx} className="flex items-center gap-3 py-2 border-b last:border-b-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base ${msg.color}`}>
                {msg.initials}
              </div>
              <div className="flex-1">
                <div className="font-medium text-xs text-gray-900">{msg.sender}</div>
                <div className="text-xs text-gray-500 truncate max-w-[180px]">{msg.message}</div>
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap">{msg.time}</div>
            </div>
          ))
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <div className="text-sm">No recent messages</div>
            <div className="text-xs text-gray-400 mt-1">Messages will appear here when you receive them</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDirectMessages;