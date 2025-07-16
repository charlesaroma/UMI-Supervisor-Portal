import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';

const DashboardRecentlyAddedTable = ({ data = [], isLoading = false, isError = false, onViewMore }) => {
  const navigate = useNavigate();

  const handleStudentClick = (studentId) => {
    if (studentId) {
      navigate(`/students/profile/${studentId}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      <div className="flex flex-row justify-between items-start gap-6 px-6 pt-4 pb-2">
        <h2 className="text-lg font-medium text-gray-900">Recently Added</h2>
        <button
          onClick={onViewMore}
          className="text-sm text-white bg-[#23388F] hover:bg-[#23388F]/80 flex items-center gap-1 px-3 py-1.5 rounded"
        >
          View More <RiArrowDownSLine className="w-4 h-4" />
        </button>
      </div>
      <div className="px-2 pt-2 sm:px-6 sm:pt-0 flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#23388F]" />
          </div>
        ) : isError ? (
          <div className="text-center py-4 text-red-500 text-sm">Error loading data. Please try again.</div>
        ) : data && data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Fullname</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Campus</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleStudentClick(row.id)}
                  >
                    <td className="py-2 px-2 whitespace-nowrap text-xs text-gray-900 font-medium">{row.name}</td>
                    <td className="py-2 px-2 whitespace-nowrap text-xs text-gray-700">{row.campus}</td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      <span className={`inline-flex h-[28px] capitalize rounded-[6px] border py-[4px] px-[9px] items-center justify-center text-xs font-semibold ${row.category === 'Masters' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : 'bg-purple-100 border-purple-300 text-purple-800'}`}>{row.category}</span>
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      <span className="inline-flex h-[28px] rounded-[6px] border border-gray-300 py-[4px] px-[9px] items-center justify-center text-xs font-semibold bg-gray-50 text-gray-700">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="text-sm font-medium">No recent students</div>
            <div className="text-xs text-gray-400 mt-1">Recently assigned students will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardRecentlyAddedTable;