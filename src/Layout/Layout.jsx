// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from './Shared/Header';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Content Outlet */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;