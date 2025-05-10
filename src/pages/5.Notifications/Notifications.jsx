import React, { useState } from 'react';
import NotificationStats from '../5.Notifications/NotificationStats';
import NotificationTable from '../5.Notifications/NotificationTable';
import NotificationsPopUp from '../5.Notifications/NotificationPopUp';
import NotificationSearchBar from './NotificationSearchBar';

const Notifications = () => {
  const [topSearch, setTopSearch] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-7xl mx-auto p-4">
      <NotificationSearchBar value={topSearch} onChange={e => setTopSearch(e.target.value)} />
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      
      {/* Stats Cards */}
      <div className="mb-6">
        <NotificationStats />
      </div>
      
      {/* Notifications Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="mb-2 font-semibold text-blue-700">System Notifications</div>
        <NotificationSearchBar value={search} onChange={e => setSearch(e.target.value)} />
        <NotificationTable search={search} />
      </div>
      
      {/* Notifications PopUp */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <NotificationsPopUp />
      </div>
    </div>
  );
};

export default Notifications;