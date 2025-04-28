import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="w-full bg-white shadow flex items-center px-8 py-4 border-b">
        <div className="flex items-center gap-4">
          <img src="/Logo%20main.png" alt="UMI Logo" className="h-10" />
          <span className="text-xs font-semibold text-blue-900 tracking-wide">UGANDA MANAGEMENT INSTITUTE</span>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Sidebar - Fixed on the left */}
        <Sidebar />
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;