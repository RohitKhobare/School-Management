import React, { useState, useEffect } from 'react';

const StudentOverview = () => {
  const [studentData, setStudentData] = useState({
    name: 'Arjun Sharma',
    class: '10-A',
    rollNumber: 'ST001',
    attendance: 92,
    gpa: 8.5,
    subjects: 6,
    pendingFees: 5000
  });

  const [recentGrades, setRecentGrades] = useState([
    { subject: 'Mathematics', grade: 'A', score: 95 },
    { subject: 'Science', grade: 'A-', score: 88 },
    { subject: 'English', grade: 'B+', score: 82 }
  ]);

  const [upcomingTasks, setUpcomingTasks] = useState([
    { task: 'Math Assignment', due: '2024-01-15', priority: 'high' },
    { task: 'Science Project', due: '2024-01-18', priority: 'medium' },
    { task: 'English Essay', due: '2024-01-20', priority: 'low' }
  ]);

  const [achievements, setAchievements] = useState([
    'Perfect Attendance - December 2023',
    'Mathematics Excellence Award',
    'Science Fair Winner'
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {studentData.name}!</h1>
        <p className="text-blue-100">Class {studentData.class} • Roll No: {studentData.rollNumber}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{studentData.gpa}</div>
          <div className="text-sm text-gray-600">Current GPA</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">{studentData.attendance}%</div>
          <div className="text-sm text-gray-600">Attendance</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">{studentData.subjects}</div>
          <div className="text-sm text-gray-600">Subjects</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-amber-600">₹{studentData.pendingFees}</div>
          <div className="text-sm text-gray-600">Pending Fees</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Performance</h3>
          <div className="space-y-3">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium text-gray-800">{grade.subject}</div>
                  <div className="text-sm text-gray-600">Score: {grade.score}%</div>
                </div>
                <div className={`px-3 py-1 rounded text-sm font-medium ${
                  grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                  grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {grade.grade}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Tasks</h3>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium text-gray-800">{task.task}</div>
                  <div className="text-sm text-gray-600">Due: {task.due}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center p-3 bg-amber-50 rounded-lg">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">🏆</span>
              </div>
              <div className="text-sm font-medium text-gray-800">{achievement}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;