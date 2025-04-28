import React from 'react';
import { Icon } from '@iconify/react';

const colorMap = {
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
};

const DMessage = () => {
  // Sample messages array
  const messages = [
    {
      id: 1,
      sender: 'Apio Asiimwe',
      messagePreview: 'Hi Prof. Mwangi, hope your afternoon is going...',
      timestamp: '15:23:42PM',
      color: 'red',
      initial: 'A',
    },
    {
      id: 2,
      sender: 'Apio Ocen',
      messagePreview: 'Got it... Quick one—should I email it to you or use the portal?',
      timestamp: '15:23:42PM',
      color: 'green',
      initial: 'AC',
    },
    {
      id: 3,
      sender: 'Apio Ocen',
      messagePreview: 'Great! Quick one—should I email it to you or use the portal?',
      timestamp: '15:23:42PM',
      color: 'green',
      initial: 'AC',
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Direct Messages</h2>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center text-xs font-medium">
          View More
          <Icon icon="mdi:arrow-right" className="ml-2 text-base" />
        </button>
      </div>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start">
            <div className="mr-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${colorMap[message.color].bg} ${colorMap[message.color].text}`}> 
                {message.initial}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="font-bold text-sm">{message.sender}</div>
                <div className="text-xs text-gray-400">{message.timestamp}</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{message.messagePreview}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DMessage;