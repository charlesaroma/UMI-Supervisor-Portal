import React from 'react';
import { Icon } from '@iconify/react';

const NotificationSearchBar = ({ value, onChange }) => (
  <div className="relative w-72 mb-4">
    <input
      type="text"
      placeholder="Search by Type"
      value={value}
      onChange={onChange}
      className="w-full border border-gray-200 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
    />
    <Icon icon="mdi:magnify" className="absolute left-3 top-2.5 text-gray-400 text-lg" />
  </div>
);

export default NotificationSearchBar;
