import React from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { dashboardTableData } from '../../data/DashboardTableData';

const columns = [
  {
    header: 'Fullname',
    accessorKey: 'fullname',
  },
  {
    header: 'Campus',
    accessorKey: 'campus1',
  },
  {
    header: 'Campus',
    accessorKey: 'campus2',
  },
  {
    header: 'Category',
    accessorKey: 'category',
    cell: info => (
      <span
        className="px-3 py-1 rounded bg-[#FDD388] text-xs font-semibold"
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: info => (
      <span className="px-3 py-1 rounded border border-gray-300 text-gray-500 text-xs bg-gray-50 font-medium">
        {info.getValue()}
      </span>
    ),
  },
];

const RecentlyAddedTable = () => {
  const table = useReactTable({
    data: dashboardTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-base">Recently Added</h2>
        <button className="bg-blue-700 text-white px-4 py-2 rounded text-xs font-medium flex items-center gap-1 hover:bg-blue-800">
          View More
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 font-semibold text-left text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-[#E5E7EB] last:border-0">
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
    </div>
  );
};

export default RecentlyAddedTable;