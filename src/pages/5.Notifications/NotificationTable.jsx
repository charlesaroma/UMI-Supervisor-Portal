import React, { useMemo } from 'react';
import { notificationsTableData } from '../../data/NotificationsTableData';

const SHOW_OPTIONS = [5, 10, 20, 30];

const priorityColor = {
  Anytime: 'text-green-600',
  Important: 'text-orange-500',
  Urgent: 'text-red-600',
};

const NotificationTable = ({ search }) => {
  const [show, setShow] = React.useState(10);
  const [page, setPage] = React.useState(1);

  // Filtered data
  const filteredData = useMemo(() => {
    if (!search.trim()) return notificationsTableData;
    const lower = search.toLowerCase();
    return notificationsTableData.filter(row => row.type.toLowerCase().includes(lower));
  }, [search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / show));
  const currentPage = Math.min(page, totalPages);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * show;
    return filteredData.slice(start, start + show);
  }, [filteredData, currentPage, show]);

  // Pagination controls
  const handleShowChange = e => {
    setShow(Number(e.target.value));
    setPage(1);
  };
  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };
  const renderPaginationButtons = () => {
    const buttons = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      buttons.push(1);
      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) buttons.push(i);
        buttons.push('...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        buttons.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) buttons.push(i);
      } else {
        buttons.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return buttons.map((num, idx) =>
      num === '...' ? (
        <span key={`ellipsis-${idx}`} className="px-2">...</span>
      ) : (
        <button
          key={`page-${num}`}
          className={`px-2 py-1 rounded border ${num === currentPage ? 'border-blue-700 text-blue-700 font-semibold' : 'border-gray-200'}`}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </button>
      )
    );
  };

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Type</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Student Name</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Priority</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Remarks</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-200 last:border-0">
                <td className="px-4 py-2">{row.type}</td>
                <td className="px-4 py-2">{row.studentName}</td>
                <td className={`px-4 py-2 font-semibold ${priorityColor[row.priority] || ''}`}>{row.priority}</td>
                <td className="px-4 py-2">{row.remarks}</td>
                <td className="px-4 py-2">
                  <span className="px-3 py-1 rounded border border-blue-200 text-blue-700 text-xs font-semibold bg-white cursor-pointer">Open</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div>
          Showing {filteredData.length ? (currentPage - 1) * show + 1 : 0}-
          {Math.min(currentPage * show, filteredData.length)} of {filteredData.length} Results
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded border border-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-2 py-1 rounded border border-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;