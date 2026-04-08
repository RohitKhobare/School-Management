import React, { useState, useEffect } from 'react';
import { FaUsers, FaChalkboardTeacher, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { ButtonActions } from './ButtonActions';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockClasses = [
      { _id: '1', name: 'nursery A', grade: 0, section: 'A', maxCapacity: 30, currentStrength: 25, classTeacher: 'Priya Sharma', academicYear: '2024-2025' },
      { _id: '2', name: 'lkg B', grade: 1, section: 'B', maxCapacity: 30, currentStrength: 28, classTeacher: 'Arjun Patel', academicYear: '2024-2025' },
      { _id: '3', name: '1st A', grade: 3, section: 'A', maxCapacity: 30, currentStrength: 30, classTeacher: 'Kavya Singh', academicYear: '2024-2025' },
      { _id: '4', name: '2nd C', grade: 4, section: 'C', maxCapacity: 30, currentStrength: 27, classTeacher: 'Aarav Kumar', academicYear: '2024-2025' },
      { _id: '5', name: '3rd B', grade: 5, section: 'B', maxCapacity: 30, currentStrength: 29, classTeacher: 'Diya Gupta', academicYear: '2024-2025' },
    ];
    
    setTimeout(() => {
      setClasses(mockClasses);
      setLoading(false);
    }, 1000);
  }, []);

  const getGradeName = (grade) => {
    const gradeNames = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th'];
    return gradeNames[grade] || 'Unknown';
  };

  const getCapacityColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Class Management</h2>
        <button 
          onClick={ButtonActions.class.addClass}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add New Class
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Classes</p>
              <p className="text-2xl font-bold text-blue-800">{classes.length}</p>
            </div>
            <FaUsers className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-green-800">
                {classes.reduce((sum, cls) => sum + cls.currentStrength, 0)}
              </p>
            </div>
            <FaUsers className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Avg Class Size</p>
              <p className="text-2xl font-bold text-purple-800">
                {Math.round(classes.reduce((sum, cls) => sum + cls.currentStrength, 0) / classes.length)}
              </p>
            </div>
            <FaChalkboardTeacher className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Capacity Used</p>
              <p className="text-2xl font-bold text-amber-800">
                {Math.round((classes.reduce((sum, cls) => sum + cls.currentStrength, 0) / 
                classes.reduce((sum, cls) => sum + cls.maxCapacity, 0)) * 100)}%
              </p>
            </div>
            <FaUsers className="w-8 h-8 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 capitalize">
                  {getGradeName(classItem.grade)} - {classItem.section}
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => ButtonActions.class.viewStudents(classItem)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => ButtonActions.class.editClass(classItem)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => ButtonActions.class.deleteClass(classItem)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Class Teacher:</span>
                  <span className="font-medium text-gray-800">{classItem.classTeacher}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCapacityColor(classItem.currentStrength, classItem.maxCapacity)}`}>
                    {classItem.currentStrength}/{classItem.maxCapacity}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(classItem.currentStrength / classItem.maxCapacity) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Academic Year:</span>
                  <span className="text-gray-700">{classItem.academicYear}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassManagement;