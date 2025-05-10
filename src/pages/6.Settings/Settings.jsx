import React from 'react';
import SettingsPage from '../6.Settings/SettingsPage';

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <div className="p-4">
        <SettingsPage />
      </div>
    </div>
  );
};

export default Settings;