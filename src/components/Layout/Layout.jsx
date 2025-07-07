import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50  ">
      {/* Sidebar - Fixed on the left */}
      {/* <div className="fixed inset-y-0 left-0 z-30"> */}
        <Sidebar />
      {/* </div> */}
      {/* Main Content Area */}
      <main className="flex-1  overflow-auto">
        {/* <div className="p-6"> */}
          <Outlet />
        {/* </div> */}
      </main>
    </div>
  );
};

export default Layout;