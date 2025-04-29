import React from 'react';
import GradesStats from '../3.Grades/GradesStats';
import GradesTable from '../3.Grades/GradesTable';
import ProposalDefence from '../3.Grades/GradesProposalDefence';
import BookExamination from '../3.Grades/GradesBookExamination';

const Grades = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Grades</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <GradesStats />
      </div>
      
      {/* Grades Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <GradesTable />
      </div>
      
      {/* Proposal Defence and Book Examination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <ProposalDefence />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <BookExamination />
        </div>
      </div>
    </div>
  );
};

export default Grades;