import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { studentTableData } from '../../data/StudentTableData';
import { Icon } from '@iconify/react';

// Custom debounce hook
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const TABS = [
  { label: 'All Students', value: 'all' },
  { label: 'Masters', value: 'Masters' },
  { label: 'PhD', value: 'PhD' },
];

const SHOW_OPTIONS = [5, 10, 15, 20];

const STable = () => {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(5);
  const [page, setPage] = useState(1);

  // Use the debounce hook instead of lodash
  const debouncedSearch = useDebounce(search);

  // Filter data based on tab and search
  const filteredData = useMemo(() => {
    let data = [...studentTableData];
    
    // Filter by tab
    if (tab !== 'all') {
      data = data.filter(d => d.category === tab);
    }
    
    // Filter by search
    if (debouncedSearch.trim()) {
      const lower = debouncedSearch.toLowerCase();
      data = data.filter(d => d.fullname.toLowerCase().includes(lower));
    }
    
    return data;
  }, [tab, debouncedSearch]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / show));
  const currentPage = Math.min(page, totalPages);
  
  // Get current page data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * show;
    return filteredData.slice(start, start + show);
  }, [filteredData, currentPage, show]);

  // Table configuration
  const table = useReactTable({
    data: paginatedData,
    columns: useMemo(() => [
      { header: 'Fullname', accessorKey: 'fullname' },
      { header: 'Email Address', accessorKey: 'email' },
      {
        header: 'School Code',
        accessorKey: 'schoolCode',
        cell: info => (
          <span className="flex items-center gap-1">
            {info.getValue()}
            <Icon icon="mdi:information-outline" className="text-gray-400 text-xs" />
          </span>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: info => (
          <span className="px-3 py-1 rounded bg-[#FDD388] text-xs font-semibold">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: info => {
          const val = info.getValue();
          return (
            <span className={`px-3 py-1 rounded text-xs font-semibold ${
              val === 'Normal Progress' 
                ? 'bg-[#A7F3D0] text-[#047857]' 
                : 'bg-gray-50 text-gray-500 border border-gray-300'
            }`}>
              {val}
            </span>
          );
        },
      },
      {
        header: '',
        accessorKey: 'statusOpen',
        cell: () => (
          <span className="px-3 py-1 rounded border border-[#A7F3D0] text-[#047857] text-xs font-semibold bg-white">
            Open
          </span>
        ),
      },
    ], []),
    getCoreRowModel: getCoreRowModel(),
  });

  // Calculate tab counts
  const tabCounts = useMemo(() => ({
    Masters: studentTableData.filter(s => s.category === 'Masters').length,
    PhD: studentTableData.filter(s => s.category === 'PhD').length,
  }), []);

  // Handle show/page changes
  const handleShowChange = e => {
    setShow(Number(e.target.value));
    setPage(1);
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Render pagination buttons
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
          className={`px-2 py-1 rounded border ${
            num === currentPage ? 'border-blue-700 text-blue-700 font-semibold' : 'border-gray-200'
          }`}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </button>
      )
    );
  };

  return (
    <div>
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
            {tabCounts[t.value] !== undefined && (
              <span className="ml-1 text-xs text-gray-400">{tabCounts[t.value]}</span>
            )}
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

export default STable;
