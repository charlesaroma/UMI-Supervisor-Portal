import React from "react";
import StatsCards from "../components/Dashboard/DStats";
import DirectMessagesList from "../components/Dashboard/DMessage";
import StatusReportChat from "../components/Dashboard/DStatusReportChat";
import RecentlyAddedTable from "../components/Dashboard/DRecentlyAddedTable";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last login: 08-09-2024 15:23:42PM
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCards />
      </div>

      {/* Direct Messages Section and Status Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <DirectMessagesList />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <StatusReportChat />
        </div>
      </div>

      {/* Recently Added Table Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <RecentlyAddedTable />
      </div>
    </div>
  );
};

export default Dashboard;
