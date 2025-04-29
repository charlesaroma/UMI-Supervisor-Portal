import React from 'react';
import MessagesList from '../4.DirectMessages/DirectMessageList';
import MessageDetail from '../4.DirectMessages/DirectMessageDetail';

const DirectMessages = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Direct Messages</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex md:flex-row flex-col">
          <div className="w-full md:w-1/3 p-4 border-r">
            <MessagesList />
          </div>
          <div className="w-full md:w-2/3 p-4">
            <MessageDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;