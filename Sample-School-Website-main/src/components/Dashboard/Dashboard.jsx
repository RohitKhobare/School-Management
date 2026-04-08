import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsGrid from './StatsGrid';
import DashboardCharts from './DashboardChartsSimple';
import TableSection from './TableSection';
import ScheduleSection from './ScheduleSection';
import NoticeBoard from './NoticeBoard';
import AttendanceManagement from './AttendanceManagement';
import ContactManagement from './ContactManagement';
import ApplicationManagement from './ApplicationManagement';
import ClassManagement from './ClassManagement';
import FinanceManagement from './FinanceManagement';
import ReportsManagement from './ReportsManagement';
import SettingsManagement from './SettingsManagement';
import AdminStudentManagement from './AdminStudentManagement';
import AdminTeacherManagement from './AdminTeacherManagement';
import ModalManager from './ModalManager';

const Dashboard = ({ role, data }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reset state when role changes
  useEffect(() => {
    setActiveTab('overview');
    setSidebarOpen(false);
  }, [role]);

  // Component mapping - All components imported here
  const componentMap = {
    TableSection,
    ScheduleSection,
    NoticeBoard,
    AttendanceManagement,
    ContactManagement,
    ApplicationManagement,
    ClassManagement,
    FinanceManagement,
    ReportsManagement,
    SettingsManagement,
    AdminStudentManagement,
    AdminTeacherManagement
  };

  if (!data || !data.sidebarItems || !data.header) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading dashboard...</div>
    </div>;
  }

  const renderContent = () => {
    // Handle real-time components
    if (activeTab === 'contacts') {
      return <ContactManagement />;
    }
    if (activeTab === 'applications') {
      return <ApplicationManagement />;
    }
    if (activeTab === 'classes') {
      return <ClassManagement />;
    }
    if (activeTab === 'finance') {
      return <FinanceManagement />;
    }
    if (activeTab === 'reports') {
      return <ReportsManagement />;
    }
    if (activeTab === 'settings') {
      return <SettingsManagement />;
    }
    if (activeTab === 'students') {
      return <AdminStudentManagement />;
    }
    if (activeTab === 'teachers') {
      return <AdminTeacherManagement />;
    }
    if (activeTab === 'notices') {
      return <NoticeBoard userRole={role} />;
    }
    if (activeTab === 'attendance') {
      return <AttendanceManagement />;
    }
    if (activeTab === 'schedule') {
      return <ScheduleSection />;
    }
    
    if (!data.sections || !data.sections[activeTab]) {
      return <div className="text-gray-600">No content available for this section.</div>;
    }
    
    const sectionData = data.sections[activeTab];
    const ComponentToRender = componentMap[sectionData.component];
    
    if (!ComponentToRender) {
      return <div className="text-gray-600">Component not found: {sectionData.component}</div>;
    }
    
    return <ComponentToRender {...sectionData.props} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Modal Manager */}
      <ModalManager />
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transform transition-transform duration-300 ease-in-out lg:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <Sidebar 
          items={data.sidebarItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          role={role}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={data.header.title}
          subtitle={data.header.subtitle}
          badgeText={data.header.badgeText}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 p-3 sm:p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="mb-6">
              <StatsGrid stats={data.stats} />
              <DashboardCharts userRole={role} />
            </div>
          )}
          <div className="min-w-0">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;