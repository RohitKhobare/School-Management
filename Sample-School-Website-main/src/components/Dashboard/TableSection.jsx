import React from 'react';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const TableSection = ({ title, columns, rows, showAddButton = false, showSearch = false, actions = [] }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
        {showAddButton && (
          <button className="bg-linear-to-r from-amber-400 to-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
            <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            Add New
          </button>
        )}
      </div>

      <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
        {showSearch && (
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="relative w-full sm:w-auto">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-64 text-sm sm:text-base"
              />
            </div>
          </div>
        )}

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-3">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="border border-gray-200 rounded-lg p-3">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-gray-600">{column.header}:</span>
                  <span className="text-sm text-gray-800 text-right">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </span>
                </div>
              ))}
              {actions.length > 0 && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  {actions.includes('view') && (
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-300">
                      <FaEye className="w-3 h-3" />
                    </button>
                  )}
                  {actions.includes('edit') && (
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-300">
                      <FaEdit className="w-3 h-3" />
                    </button>
                  )}
                  {actions.includes('delete') && (
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-300">
                      <FaTrash className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column, index) => (
                  <th key={index} className="text-left py-3 px-4 font-semibold text-gray-700 text-sm lg:text-base">
                    {column.header}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm lg:text-base">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-3 px-4">
                      {column.render ? column.render(row) : (
                        <span className={`text-sm lg:text-base ${column.accessor === 'name' ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                          {row[column.accessor]}
                        </span>
                      )}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {actions.includes('view') && (
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-300">
                            <FaEye className="w-4 h-4" />
                          </button>
                        )}
                        {actions.includes('edit') && (
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-300">
                            <FaEdit className="w-4 h-4" />
                          </button>
                        )}
                        {actions.includes('delete') && (
                          <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-300">
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSection;