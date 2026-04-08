import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { dashboardAPI } from '../../services/api';
import Dashboard from '../../components/Dashboard/Dashboard';
import { FaUsers, FaChalkboardTeacher, FaBook, FaCalendarAlt, FaClipboardList, FaGraduationCap, FaTrophy, FaFileAlt, FaCog, FaChartBar, FaDollarSign, FaBell, FaClipboard } from 'react-icons/fa';

const DynamicDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        let response;

        switch (user.role) {
          case 'student':
            response = await dashboardAPI.getStudentDashboard();
            break;
          case 'teacher':
            response = await dashboardAPI.getTeacherDashboard();
            break;
          case 'parent':
            response = await dashboardAPI.getParentDashboard();
            break;
          case 'admin':
            response = await dashboardAPI.getAdminDashboard();
            break;
          default:
            throw new Error('Invalid user role');
        }

        if (response.success) {
          const transformedData = getDashboardData(user.role, response.data);
          setDashboardData(transformedData);
        } else {
          setError(response.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getDashboardData = (role, apiData) => {
    switch (role) {
      case 'admin':
        return {
          sidebarItems: [
            { id: 'overview', name: 'Overview', icon: FaChartBar },
            { id: 'students', name: 'Students', icon: FaGraduationCap },
            { id: 'teachers', name: 'Teachers', icon: FaChalkboardTeacher },
            { id: 'classes', name: 'Classes', icon: FaBook },
            { id: 'contacts', name: 'Contact Forms', icon: FaBell },
            { id: 'applications', name: 'Applications', icon: FaClipboard },
            { id: 'schedule', name: 'Schedule', icon: FaCalendarAlt },
            { id: 'finance', name: 'Finance', icon: FaDollarSign },
            { id: 'reports', name: 'Reports', icon: FaFileAlt },
            { id: 'settings', name: 'Settings', icon: FaCog }
          ],
          header: {
            title: 'Admin Dashboard',
            subtitle: 'M.M. Vidya Mandir Primary School',
            badgeText: 'Admin'
          },
          stats: [
            { title: 'Total Students', value: apiData.stats.totalStudents.toString(), change: '+12%', color: 'blue' },
            { title: 'Total Teachers', value: apiData.stats.totalTeachers.toString(), change: '+3%', color: 'green' },
            { title: 'Total Parents', value: apiData.stats.totalParents.toString(), change: '+8%', color: 'purple' },
            { title: 'Total Users', value: apiData.stats.totalUsers.toString(), change: '+15%', color: 'amber' }
          ],
          sections: {
            overview: {
              component: 'TableSection',
              props: {
                title: 'Recent Student Enrollments',
                columns: [
                  { header: 'Name', accessor: 'name' },
                  { header: 'Roll Number', accessor: 'rollNumber' },
                  { header: 'Class', accessor: 'class' },
                  { header: 'Date', accessor: 'date' }
                ],
                rows: apiData.recentStudents.map(student => ({
                  name: student.name,
                  rollNumber: student.rollNumber,
                  class: `${student.class}-${student.section}`,
                  date: new Date(student.enrollmentDate).toLocaleDateString()
                })),
                showAddButton: true,
                actions: ['view', 'edit']
              }
            }
          }
        };

      case 'teacher':
        return {
          sidebarItems: [
            { id: 'overview', name: 'Overview', icon: FaChartBar },
            { id: 'students', name: 'My Students', icon: FaUsers },
            { id: 'lessons', name: 'Lesson Plans', icon: FaBook },
            { id: 'assignments', name: 'Assignments', icon: FaClipboardList },
            { id: 'grades', name: 'Grades', icon: FaFileAlt },
            { id: 'schedule', name: 'My Schedule', icon: FaCalendarAlt }
          ],
          header: {
            title: 'Teacher Dashboard',
            subtitle: `${apiData.profile.name} - ${apiData.profile.subject} Teacher`,
            badgeText: 'Teacher'
          },
          stats: [
            { title: 'My Students', value: apiData.stats.totalStudents.toString(), change: '+2%', color: 'blue' },
            { title: 'Classes Assigned', value: apiData.stats.totalClasses.toString(), change: '0%', color: 'green' },
            { title: 'Subject', value: apiData.stats.subject, change: '', color: 'purple' }
          ],
          sections: {
            overview: {
              component: 'TableSection',
              props: {
                title: 'Recent Students',
                columns: [
                  { header: 'Name', accessor: 'name' },
                  { header: 'Roll Number', accessor: 'rollNumber' },
                  { header: 'Class', accessor: 'class' },
                  { header: 'Section', accessor: 'section' }
                ],
                rows: apiData.recentStudents || [],
                actions: ['view']
              }
            }
          }
        };

      case 'student':
        return {
          sidebarItems: [
            { id: 'overview', name: 'Overview', icon: FaChartBar },
            { id: 'assignments', name: 'Assignments', icon: FaClipboardList },
            { id: 'grades', name: 'My Grades', icon: FaFileAlt },
            { id: 'schedule', name: 'Class Schedule', icon: FaCalendarAlt },
            { id: 'achievements', name: 'Achievements', icon: FaTrophy }
          ],
          header: {
            title: 'Student Portal',
            subtitle: `${apiData.profile.name} - Class ${apiData.profile.class}-${apiData.profile.section}`,
            badgeText: 'Student'
          },
          stats: [
            { title: 'Attendance', value: apiData.stats.attendance, change: '+2%', color: 'green' },
            { title: 'Current Grade', value: apiData.stats.currentGrade, change: '+5%', color: 'blue' },
            { title: 'Total Subjects', value: apiData.stats.totalSubjects.toString(), change: '0%', color: 'purple' }
          ],
          sections: {
            overview: {
              component: 'TableSection',
              props: {
                title: 'My Profile',
                columns: [
                  { header: 'Field', accessor: 'field' },
                  { header: 'Value', accessor: 'value' }
                ],
                rows: [
                  { field: 'Name', value: apiData.profile.name },
                  { field: 'Roll Number', value: apiData.profile.rollNumber },
                  { field: 'Class', value: `${apiData.profile.class}-${apiData.profile.section}` },
                  { field: 'Email', value: apiData.profile.email }
                ],
                actions: []
              }
            }
          }
        };

      case 'parent':
        return {
          sidebarItems: [
            { id: 'overview', name: 'Overview', icon: FaChartBar },
            { id: 'children', name: 'My Children', icon: FaUsers },
            { id: 'grades', name: 'Grades', icon: FaFileAlt },
            { id: 'attendance', name: 'Attendance', icon: FaCalendarAlt }
          ],
          header: {
            title: 'Parent Dashboard',
            subtitle: `${apiData.profile.name} - ${apiData.stats.totalChildren} Child(ren)`,
            badgeText: 'Parent'
          },
          stats: [
            { title: 'Total Children', value: apiData.stats.totalChildren.toString(), change: '0%', color: 'pink' },
            { title: 'Avg Attendance', value: apiData.stats.avgAttendance, change: '+2%', color: 'green' },
            { title: 'Avg Grade', value: apiData.stats.avgGrade, change: '+1%', color: 'blue' }
          ],
          sections: {
            overview: {
              component: 'TableSection',
              props: {
                title: 'My Children',
                columns: [
                  { header: 'Name', accessor: 'name' },
                  { header: 'Roll Number', accessor: 'rollNumber' },
                  { header: 'Class', accessor: 'class' },
                  { header: 'Attendance', accessor: 'attendance' },
                  { header: 'Grade', accessor: 'grade' }
                ],
                rows: apiData.children.map(child => ({
                  name: child.name,
                  rollNumber: child.rollNumber,
                  class: `${child.class}-${child.section}`,
                  attendance: child.attendance,
                  grade: child.grade
                })),
                actions: ['view']
              }
            }
          }
        };

      default:
        return {
          sidebarItems: [{ id: 'overview', name: 'Overview', icon: FaUsers }],
          header: { title: 'Dashboard', subtitle: 'User', badgeText: 'User' },
          stats: [],
          sections: { overview: { component: 'EmptySection', props: { message: 'No content available' } } }
        };
    }
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard role={user.role} data={dashboardData} />;
};

export default DynamicDashboard;