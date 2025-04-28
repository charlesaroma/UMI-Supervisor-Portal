import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Students Management', path: '/students' },
  { name: 'Grades', path: '/grades' },
  { name: 'Direct Messages', path: '/direct-messages' },
  { name: 'Notifications', path: '/notifications' },
  { name: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col min-h-screen border-r">
      {/* Logo */}
      <div className="flex flex-col items-center py-8 border-b">
        <img src="/Logo%20main.png" alt="UMI Logo" className="h-12 mb-2" />
        <div className="text-xs font-semibold text-blue-900 tracking-wide mt-2 text-center">UGANDA MANAGEMENT INSTITUTE</div>
      </div>
      {/* User Info */}
      <div className="flex flex-col items-center py-6 border-b">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-900 mb-2">JK</div>
        <div className="font-semibold text-gray-800">Joshua Kimbaneeba</div>
        <div className="text-xs text-gray-500">IT Administrator</div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive || location.pathname === item.path
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-blue-50'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      {/* Logout */}
      <div className="mt-auto px-4 pb-6">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium text-sm transition-colors">
          <Icon icon="mdi:logout" className="text-base" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;