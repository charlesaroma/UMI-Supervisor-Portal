import React, { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGetDashboardStats, useGetSupervisorProfile } from "../../store/tanstackStore/services/queries";
import DashboardStats from "./DashboardStats";
import DashboardDirectMessages from "./DashboardDirectMessages";
import DashboardStatusReportChat from "./DashboardStatusReportChat";
import DashboardRecentlyAddedTable from "./DashboardRecentlyAddedTable";

const STATUS_COLORS = ["#22C55E", "#F59E42", "#FACC15", "#6366F1", "#F43F5E"];

const mockMessages = [
  {
    sender: "Apio Asiimwe",
    initials: "A",
    message: "Hi Prof. Mwangi, hope your afternoon is going...",
    time: "15:23:42PM",
    color: "bg-pink-100 text-pink-700"
  },
  {
    sender: "Apio Ocen",
    initials: "AO",
    message: "Got it!... Quick one—should I email it to you or use the portal?",
    time: "15:23:42PM",
    color: "bg-green-100 text-green-700"
  },
  {
    sender: "Apio Ocen",
    initials: "AO",
    message: "Quick one, should I email to you or use the portal?",
    time: "15:23:42PM",
    color: "bg-green-100 text-green-700"
  }
];

const mockStatusData = [
  { value: 32, color: '#14B8A6', label: 'Normal Progress', border: '#0F766E', bg: '#ccfbf1' },
  { value: 10, color: '#B45309', label: 'Book Submitted', border: '#b45309', bg: '#fffbeb' },
  { value: 9, color: '#0369A1', label: 'Under Examination', border: '#0369A1', bg: '#f0f9ff' },
];

const mockRecentlyAdded = [
  { name: "Jenny Wilson", campus: "Kampala", category: "Masters", status: "Workshop" },
  { name: "Anna Roberts", campus: "Mbarara", category: "Masters", status: "Workshop" },
  { name: "Lindsay Walton", campus: "Kampala", category: "Masters", status: "Workshop" },
  { name: "Benjamin Russel", campus: "Mbale", category: "Masters", status: "Workshop" },
  { name: "Courtney Henry", campus: "Gulu", category: "PhD", status: "Workshop" },
  { name: "Tom Cook", campus: "Gulu", category: "PhD", status: "Workshop" }
];

const Dashboard = () => {
  const { user } = useAuth();
  const { data: profileData, isLoading: profileLoading } = useGetSupervisorProfile();
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStats();
  const [statusType] = useState("Status report");

  // Mocked stat values for demo
  const statValues = useMemo(() => ({
    assignedStudentsCount: statsData?.stats?.assignedStudentsCount || 45,
    workshopCount: 14,
    normalProgressCount: 26,
    underExaminationCount: 9
  }), [statsData]);

  if (profileLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50  ">
      {/* Header */}
      <div className="flex items-center justify-between py-6 px-6 pb-0 w-full h-[64px]">
        <p className="text-sm font-medium text-gray-900">Supervisor Portal</p>
        <p className="text-sm font-medium text-gray-600">Digital Research Information Management System</p>
      </div>
      {/* Horizontal Line */}
      <div className="my-6 border-t w-full border-gray-200"></div>
      {/* Dashboard Title and Last Login */}
      <div className="flex items-center justify-between p-6 pb-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-xs text-gray-500">Last login : {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
      </div>
      {/* Stat Cards */}
      <div className="px-6 mb-6">
        <DashboardStats statValues={statValues} />
      </div>
      {/* Direct Messages & Status Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mb-6">
        <DashboardDirectMessages messages={mockMessages} />
        <DashboardStatusReportChat chartData={mockStatusData} statusType={statusType} />
      </div>
      {/* Recently Added Table Section */}
      <div className="px-6 mb-6">
        <DashboardRecentlyAddedTable data={mockRecentlyAdded} />
      </div>
    </div>
  );
};

export default Dashboard;
