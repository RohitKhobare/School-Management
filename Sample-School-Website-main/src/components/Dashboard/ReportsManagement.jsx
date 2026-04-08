import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaDownload, FaEye, FaPlus, FaChartBar, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { ButtonActions } from './ButtonActions';

const ReportsManagement = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockReports = [
      { _id: '1', title: 'Academic Performance Report Q1', type: 'academic', status: 'completed', createdAt: '2024-01-15', generatedBy: 'Admin', fileSize: '2.5 MB' },
      { _id: '2', title: 'Financial Summary December 2023', type: 'financial', status: 'completed', createdAt: '2024-01-10', generatedBy: 'Admin', fileSize: '1.8 MB' },
      { _id: '3', title: 'Student Attendance Analysis', type: 'attendance', status: 'generating', createdAt: '2024-01-14', generatedBy: 'Admin', fileSize: null },
      { _id: '4', title: 'Teacher Performance Evaluation', type: 'performance', status: 'completed', createdAt: '2024-01-12', generatedBy: 'Admin', fileSize: '3.2 MB' },
      { _id: '5', title: 'Monthly Administrative Report', type: 'administrative', status: 'completed', createdAt: '2024-01-08', generatedBy: 'Admin', fileSize: '1.5 MB' },
    ];
    
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      financial: 'bg-green-100 text-green-800',
      attendance: 'bg-purple-100 text-purple-800',
      performance: 'bg-orange-100 text-orange-800',
      administrative: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      generating: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const reportTypes = [
    { type: 'academic', name: 'Academic Reports', icon: FaChartBar, count: reports.filter(r => r.type === 'academic').length },
    { type: 'financial', name: 'Financial Reports', icon: FaFileAlt, count: reports.filter(r => r.type === 'financial').length },
    { type: 'attendance', name: 'Attendance Reports', icon: FaCalendarAlt, count: reports.filter(r => r.type === 'attendance').length },
    { type: 'performance', name: 'Performance Reports', icon: FaChartBar, count: reports.filter(r => r.type === 'performance').length },
  ];

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Reports Management</h2>
        <button 
          onClick={() => ButtonActions.reports.generateReport('custom')}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      {/* Report Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {reportTypes.map((reportType) => {
          const IconComponent = reportType.icon;
          return (
            <div key={reportType.type} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{reportType.name}</p>
                  <p className="text-2xl font-bold text-gray-800">{reportType.count}</p>
                </div>
                <IconComponent className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-amber-600 text-sm mt-2">View Reports</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Report Generation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => ButtonActions.reports.generateReport('academic')}
            className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <FaChartBar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-600 font-medium">Student Performance</p>
            <p className="text-sm text-gray-500">Generate academic performance report</p>
          </button>
          
          <button 
            onClick={() => ButtonActions.reports.generateReport('financial')}
            className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
          >
            <FaFileAlt className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-green-600 font-medium">Financial Summary</p>
            <p className="text-sm text-gray-500">Generate financial report</p>
          </button>
          
          <button 
            onClick={() => ButtonActions.reports.generateReport('attendance')}
            className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
          >
            <FaCalendarAlt className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-purple-600 font-medium">Attendance Report</p>
            <p className="text-sm text-gray-500">Generate attendance analysis</p>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Generated Reports</h3>
            <div className="flex gap-2">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All Reports</option>
                <option value="academic">Academic</option>
                <option value="financial">Financial</option>
                <option value="attendance">Attendance</option>
                <option value="performance">Performance</option>
              </select>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FaFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.type)}`}>
                      {report.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status === 'generating' ? (
                        <div className="flex items-center gap-1">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-600"></div>
                          GENERATING
                        </div>
                      ) : (
                        report.status.toUpperCase()
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.generatedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.fileSize || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {report.status === 'completed' && (
                        <>
                          <button 
                            onClick={() => ButtonActions.reports.downloadReport(report)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => ButtonActions.reports.downloadReport(report)}
                            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-100 rounded-lg transition-colors"
                          >
                            <FaDownload className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;