import React from 'react';

const NotificationsStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">24</div>
        <div className="text-center text-gray-500">Total Notifications</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">8</div>
        <div className="text-center text-gray-500">Unread</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">16</div>
        <div className="text-center text-gray-500">Read</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-center">12</div>
        <div className="text-center text-gray-500">Archived</div>
      </div>
    </div>
  );
};

export default NotificationsStats;