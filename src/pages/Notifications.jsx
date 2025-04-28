import React from 'react';
import NotificationsStats from '../components/Notifications/NStats';
import NotificationsTable from '../components/Notifications/NTable';
import NotificationsPopUp from '../components/Notifications/NPopUp';

const Notifications = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <NotificationsStats />
      </div>
      
      {/* Notifications Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <NotificationsTable />
      </div>
      
      {/* Notifications PopUp */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <NotificationsPopUp />
      </div>
    </div>
  );
};

export default Notifications;