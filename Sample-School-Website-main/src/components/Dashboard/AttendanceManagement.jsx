import React, { useState, useEffect } from 'react';
import { attendanceAPI, studentAPI } from '../../services/api';

const AttendanceManagement = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    fetchAttendance();
  }, [selectedClass, selectedSection, selectedDate]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getByClass(selectedClass, selectedSection);
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const data = await attendanceAPI.getByClassAndDate(selectedClass, selectedSection, selectedDate);
      const attendanceMap = {};
      data.forEach(record => {
        attendanceMap[record.studentId._id] = record.status;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      setAttendance({});
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = async () => {
    try {
      setSaving(true);
      
      for (const student of students) {
        const status = attendance[student._id] || 'absent';
        
        try {
          await attendanceAPI.mark({
            studentId: student._id,
            date: selectedDate,
            status: status,
            class: selectedClass,
            section: selectedSection,
            markedBy: 'teacher@school.com'
          });
        } catch (error) {
          console.log(`Attendance already marked for ${student.name}`);
        }
      }
      
      alert('Attendance saved successfully!');
      await fetchAttendance();
    } catch (error) {
      console.error('Failed to save attendance:', error);
      alert('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Management</h2>
        
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={saveAttendance}
                disabled={saving || students.length === 0}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Attendance'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Roll No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Student Name</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {student.rollNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`attendance-${student._id}`}
                            value="present"
                            checked={attendance[student._id] === 'present'}
                            onChange={() => handleAttendanceChange(student._id, 'present')}
                            className="mr-1"
                          />
                          <span className="text-green-600">Present</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`attendance-${student._id}`}
                            value="absent"
                            checked={attendance[student._id] === 'absent' || !attendance[student._id]}
                            onChange={() => handleAttendanceChange(student._id, 'absent')}
                            className="mr-1"
                          />
                          <span className="text-red-600">Absent</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`attendance-${student._id}`}
                            value="late"
                            checked={attendance[student._id] === 'late'}
                            onChange={() => handleAttendanceChange(student._id, 'late')}
                            className="mr-1"
                          />
                          <span className="text-yellow-600">Late</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {students.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No students found for Class {selectedClass}-{selectedSection}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;