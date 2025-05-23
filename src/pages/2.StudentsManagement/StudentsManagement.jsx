import React from 'react';
import StudentsStats from './StudentManagementStats';
import StudentsTable from './StudentManagementTable';

const StudentsManagement = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Students Management</h1>
      
      {/* Stats Cards */}
      <div className="mb-6">
        <StudentsStats />
      </div>
      
      {/* Students Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <StudentsTable />
      </div>
    </div>
  );
};

export default StudentsManagement;