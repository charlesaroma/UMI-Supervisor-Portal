import React from 'react';

const MessageDetail = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Message Details</h2>
      <div className="border-b pb-4 mb-4">
        <div className="font-bold">From: Apolo Asimwe</div>
        <div className="text-sm text-gray-500">Date: 08-09-2024 15:23:42PM</div>
      </div>
      <div className="mb-4">
        <p>Hi Prof, Mwangu, hope your afternoon is going well. I wanted to ask about the submission deadline for the workshop proposal. Could you please clarify?</p>
      </div>
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Reply
        </button>
      </div>
    </div>
  );
};

export default MessageDetail;