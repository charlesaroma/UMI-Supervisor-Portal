import React from 'react';

const MessagesList = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Message List</h2>
      <div className="space-y-2">
        <div className="p-2 rounded hover:bg-gray-50">
          <div className="font-bold">Apolo Asimwe</div>
          <div className="text-sm text-gray-500">Hi Prof, Mwangu, hope your afternoon is going...</div>
        </div>
        <div className="p-2 rounded hover:bg-gray-50">
          <div className="font-bold">Apolo Ocen</div>
          <div className="text-sm text-gray-500">Got it... Quick one-should I email it to you or use the portal?</div>
        </div>
        <div className="p-2 rounded hover:bg-gray-50">
          <div className="font-bold">Apolo Ocen</div>
          <div className="text-sm text-gray-500">Thanks for the update!</div>
        </div>
      </div>
    </div>
  );
};

export default MessagesList;