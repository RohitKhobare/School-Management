import React, { useEffect, useState } from 'react';
import { statisticsAPI } from '../../services/api';

const SimpleChart = ({ data, type = 'bar', title }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(item => item.value || item.count || 0));

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + (item.value || item.count || 0), 0);
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {data.map((item, index) => {
                const percentage = ((item.value || item.count || 0) / total) * 100;
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = data.slice(0, index).reduce((sum, prev) => 
                  sum - ((prev.value || prev.count || 0) / total) * 100, 0);
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="15.915"
                    fill="transparent"
                    stroke={colors[index % colors.length]}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>
          <div className="ml-6 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][index % 6] }}
                ></div>
                <span className="text-sm text-gray-600 capitalize">
                  {item.label || item.role || item.subject}: {item.value || item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = maxValue > 0 ? ((item.value || item.count || item.students || 0) / maxValue) * 100 : 0;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-sm text-gray-600 capitalize truncate">
                {item.label || item.class || item.month || item.subject || `Item ${index + 1}`}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-white text-xs font-medium">
                    {item.value || item.count || item.students || item.users || 0}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DashboardCharts = ({ userRole }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await statisticsAPI.get();
        if (response.success) {
          setChartData(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [userRole]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-lg animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="text-center text-red-600">
          <p>Failed to load charts: {error}</p>
        </div>
      </div>
    );
  }

  if (!chartData) return null;

  // Role-specific charts
  const renderRoleSpecificCharts = () => {
    switch (userRole) {
      case 'admin':
        if (chartData.roleSpecific.contactStats) {
          return (
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <SimpleChart 
                data={chartData.roleSpecific.contactStats}
                type="bar"
                title="Contact Submissions by Subject"
              />
            </div>
          );
        }
        break;

      case 'teacher':
        if (chartData.roleSpecific.studentsByClass) {
          return (
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <SimpleChart 
                data={chartData.roleSpecific.studentsByClass}
                type="bar"
                title="My Students by Class"
              />
            </div>
          );
        }
        break;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <SimpleChart 
            data={chartData.chartData.roleDistribution}
            type="pie"
            title="User Distribution"
          />
        </div>

        {/* Students by Class */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <SimpleChart 
            data={chartData.chartData.studentsByClass}
            type="bar"
            title="Students by Class"
          />
        </div>

        {/* User Growth */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <SimpleChart 
            data={chartData.chartData.userGrowth}
            type="bar"
            title="User Growth (Last 6 Months)"
          />
        </div>

        {/* Role-specific chart */}
        {renderRoleSpecificCharts()}
      </div>
    </div>
  );
};

export default DashboardCharts;