import React from 'react';
import StudentsStats from '../components/Students-Management/SStats';
import StudentsTable from '../components/Students-Management/STable';

const StudentsManagement = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Students Management</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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