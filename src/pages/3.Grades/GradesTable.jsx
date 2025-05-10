import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { gradeProposalDefenceData } from '../../data/GradeProposalDefenceData';
import { gradeBookExaminationData } from '../../data/GradeBookExaminationData';
import { Icon } from '@iconify/react';

// Tabs
const TABS = [
  { label: 'Proposal Defense', value: 'defense' },
  { label: 'Book Examination', value: 'book' },
];

const SHOW_OPTIONS = [5, 10, 20, 30];

// Component
const GradesTable = () => {
  const [tab, setTab] = useState('defense');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);

  // Data selection based on tab
  const rawData = tab === 'defense' ? gradeProposalDefenceData : gradeBookExaminationData;

  // Search filter
  const filteredData = useMemo(() => {
    if (!search.trim()) return rawData;
    const lower = search.toLowerCase();
    return rawData.filter(row => row.student.toLowerCase().includes(lower));
  }, [rawData, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / show));
  const currentPage = Math.min(page, totalPages);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * show;
    return filteredData.slice(start, start + show);
  }, [filteredData, currentPage, show]);

  // Table columns
  const columns = useMemo(() => {
    if (tab === 'defense') {
      return [
        { header: 'Proposal ID', accessorKey: 'id', cell: info => <a href="#" className="text-blue-700 underline font-medium">{info.getValue()}</a> },
        { header: 'Student', accessorKey: 'student' },
        { header: 'Defense Date', accessorKey: 'defenseDate' },
        { header: 'Panelists', accessorKey: 'panelists' },
        {
          header: () => (
            <span className="flex items-center gap-1 relative group">
              Mark Range
              <span className="ml-1">
                <Icon icon="mdi:information" className="text-[#939495] text-lg cursor-pointer align-middle" />
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 text-xs text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-normal pointer-events-none bg-[#939495]">
                  The range of marks awarded for the proposal defense.
                </span>
              </span>
            </span>
          ),
          accessorKey: 'markRange',
          cell: info => info.getValue().toFixed(2),
        },
        { header: 'Status', accessorKey: 'status',
          cell: info => {
            const val = info.getValue();
            let color = 'bg-gray-100 text-gray-500';
            if (val === 'PASSED') color = 'bg-green-100 text-green-700';
            if (val === 'FAILED') color = 'bg-red-100 text-red-700';
            return <span className={`px-3 py-1 rounded text-xs font-semibold ${color}`}>{val}</span>;
          }
        },
        { header: '', accessorKey: 'open',
          cell: () => (
            <button className="px-3 py-1 rounded border border-blue-200 text-blue-700 text-xs font-semibold bg-white">Open to View</button>
          )
        },
      ];
    } else {
      return [
        { header: 'Proposal ID', accessorKey: 'id', cell: info => <a href="#" className="text-blue-700 underline font-medium">{info.getValue()}</a> },
        { header: 'Student', accessorKey: 'student' },
        { header: 'Score Internal 1', accessorKey: 'score1' },
        { header: 'Score Internal 2', accessorKey: 'score2' },
        { header: 'Average Score', accessorKey: 'avg' },
        { header: 'Category', accessorKey: 'category',
          cell: info => {
            const val = info.getValue();
            let color = 'bg-gray-100 text-gray-500';
            if (val === 'PASSED') color = 'bg-green-100 text-green-700';
            if (val === 'FAILED') color = 'bg-red-100 text-red-700';
            return <span className={`px-3 py-1 rounded text-xs font-semibold ${color}`}>{val}</span>;
          }
        },
        { header: '', accessorKey: 'open',
          cell: () => (
            <button className="px-3 py-1 rounded border border-blue-200 text-blue-700 text-xs font-semibold bg-white">Open to View</button>
          )
        },
      ];
    }
  }, [tab]);

  // Table data mapping for Book Examination
  const tableData = useMemo(() => {
    if (tab === 'defense') return paginatedData;
    // For book examination, flatten the data if needed
    return paginatedData.map(row => ({
      id: row.id,
      student: row.student,
      score1: row.score1,
      score2: row.score2,
      avg: row.avg,
      category: row.category,
    }));
  }, [paginatedData, tab]);

  // Table instance
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Pagination controls
  const handleShowChange = e => {
    setShow(Number(e.target.value));
    setPage(1);
  };
  const handleSearchChange = e => {
    setSearch(e.target.value);
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

  // Render
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-3">
        {TABS.map(t => (
          <button
            key={t.value}
            onClick={() => {
              setTab(t.value);
              setPage(1);
            }}
            className={`pb-2 text-sm cursor-pointer font-semibold border-b-2 transition-all ${
              tab === t.value ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Search & Show */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search by Name"
            value={search}
            onChange={handleSearchChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <Icon icon="mdi:magnify" className="absolute left-3 top-2.5 text-gray-400 text-lg" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Show:</span>
          <select
            value={show}
            onChange={handleShowChange}
            className="border border-gray-200 rounded px-2 py-1 text-xs"
          >
            {SHOW_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 text-left font-semibold text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-gray-200 last:border-0">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                  </td>
                ))}
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

// Exports
export default GradesTable;