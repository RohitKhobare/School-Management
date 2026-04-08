import React, { useState, useEffect } from 'react';
import { FaClock, FaBook, FaUser, FaCalendarAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { ButtonActions } from './ButtonActions';

const ScheduleSection = ({ title = "Schedule Management" }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('weekly'); // weekly, daily

  useEffect(() => {
    // Mock schedule data
    const mockSchedules = [
      {
        day: 'Monday',
        periods: [
          { time: '09:00-09:45', subject: 'Mathematics', teacher: 'Mrs. Sharma', class: 'Class 5A', room: 'Room 101' },
          { time: '09:45-10:30', subject: 'English', teacher: 'Mr. Patel', class: 'Class 5A', room: 'Room 102' },
          { time: '10:30-10:45', subject: 'Break', teacher: '', class: '', room: '' },
          { time: '10:45-11:30', subject: 'Science', teacher: 'Dr. Kumar', class: 'Class 5A', room: 'Lab 1' },
          { time: '11:30-12:15', subject: 'Hindi', teacher: 'Mrs. Gupta', class: 'Class 5A', room: 'Room 103' },
          { time: '12:15-13:00', subject: 'Social Studies', teacher: 'Mr. Singh', class: 'Class 5A', room: 'Room 104' }
        ]
      },
      {
        day: 'Tuesday',
        periods: [
          { time: '09:00-09:45', subject: 'English', teacher: 'Mr. Patel', class: 'Class 5A', room: 'Room 102' },
          { time: '09:45-10:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', class: 'Class 5A', room: 'Room 101' },
          { time: '10:30-10:45', subject: 'Break', teacher: '', class: '', room: '' },
          { time: '10:45-11:30', subject: 'Physical Education', teacher: 'Mr. Yadav', class: 'Class 5A', room: 'Playground' },
          { time: '11:30-12:15', subject: 'Art', teacher: 'Ms. Joshi', class: 'Class 5A', room: 'Art Room' },
          { time: '12:15-13:00', subject: 'Computer Science', teacher: 'Mr. Agarwal', class: 'Class 5A', room: 'Computer Lab' }
        ]
      },
      {
        day: 'Wednesday',
        periods: [
          { time: '09:00-09:45', subject: 'Science', teacher: 'Dr. Kumar', class: 'Class 5A', room: 'Lab 1' },
          { time: '09:45-10:30', subject: 'Hindi', teacher: 'Mrs. Gupta', class: 'Class 5A', room: 'Room 103' },
          { time: '10:30-10:45', subject: 'Break', teacher: '', class: '', room: '' },
          { time: '10:45-11:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', class: 'Class 5A', room: 'Room 101' },
          { time: '11:30-12:15', subject: 'Music', teacher: 'Mr. Mehta', class: 'Class 5A', room: 'Music Room' },
          { time: '12:15-13:00', subject: 'English', teacher: 'Mr. Patel', class: 'Class 5A', room: 'Room 102' }
        ]
      },
      {
        day: 'Thursday',
        periods: [
          { time: '09:00-09:45', subject: 'Social Studies', teacher: 'Mr. Singh', class: 'Class 5A', room: 'Room 104' },
          { time: '09:45-10:30', subject: 'Science', teacher: 'Dr. Kumar', class: 'Class 5A', room: 'Lab 1' },
          { time: '10:30-10:45', subject: 'Break', teacher: '', class: '', room: '' },
          { time: '10:45-11:30', subject: 'Hindi', teacher: 'Mrs. Gupta', class: 'Class 5A', room: 'Room 103' },
          { time: '11:30-12:15', subject: 'Mathematics', teacher: 'Mrs. Sharma', class: 'Class 5A', room: 'Room 101' },
          { time: '12:15-13:00', subject: 'Library', teacher: 'Ms. Reddy', class: 'Class 5A', room: 'Library' }
        ]
      },
      {
        day: 'Friday',
        periods: [
          { time: '09:00-09:45', subject: 'English', teacher: 'Mr. Patel', class: 'Class 5A', room: 'Room 102' },
          { time: '09:45-10:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', class: 'Class 5A', room: 'Room 101' },
          { time: '10:30-10:45', subject: 'Break', teacher: '', class: '', room: '' },
          { time: '10:45-11:30', subject: 'Science', teacher: 'Dr. Kumar', class: 'Class 5A', room: 'Lab 1' },
          { time: '11:30-12:15', subject: 'Physical Education', teacher: 'Mr. Yadav', class: 'Class 5A', room: 'Playground' },
          { time: '12:15-13:00', subject: 'Assembly', teacher: 'All Teachers', class: 'All Classes', room: 'Main Hall' }
        ]
      }
    ];
    
    setTimeout(() => {
      setSchedules(mockSchedules);
      setLoading(false);
    }, 1000);
  }, []);

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
      'English': 'bg-green-100 text-green-800 border-green-200',
      'Science': 'bg-purple-100 text-purple-800 border-purple-200',
      'Hindi': 'bg-orange-100 text-orange-800 border-orange-200',
      'Social Studies': 'bg-red-100 text-red-800 border-red-200',
      'Physical Education': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Art': 'bg-pink-100 text-pink-800 border-pink-200',
      'Music': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Computer Science': 'bg-gray-100 text-gray-800 border-gray-200',
      'Library': 'bg-teal-100 text-teal-800 border-teal-200',
      'Assembly': 'bg-amber-100 text-amber-800 border-amber-200',
      'Break': 'bg-gray-50 text-gray-600 border-gray-100'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCurrentDaySchedule = () => {
    return schedules.find(s => s.day === selectedDay) || { day: selectedDay, periods: [] };
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={ButtonActions.schedule.addPeriod}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            Add Period
          </button>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'weekly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'daily' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Daily
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector for Daily View */}
      {viewMode === 'daily' && (
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex flex-wrap gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === day
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Display */}
      {viewMode === 'weekly' ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="w-5 h-5 text-amber-500" />
              Weekly Schedule - Class 5A
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {schedules.map((daySchedule) => (
              <div key={daySchedule.day} className="p-4">
                <h4 className="font-semibold text-gray-800 mb-3 text-center">{daySchedule.day}</h4>
                <div className="space-y-2">
                  {daySchedule.periods.map((period, index) => (
                    <div key={index} className={`p-2 rounded-lg border text-xs ${getSubjectColor(period.subject)}`}>
                      <div className="font-medium flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {period.time}
                      </div>
                      {period.subject !== 'Break' && (
                        <>
                          <div className="flex items-center gap-1 mt-1">
                            <FaBook className="w-3 h-3" />
                            {period.subject}
                          </div>
                          <div className="flex items-center gap-1">
                            <FaUser className="w-3 h-3" />
                            {period.teacher}
                          </div>
                          <div className="text-xs opacity-75">{period.room}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="w-5 h-5 text-amber-500" />
              {selectedDay} Schedule - Class 5A
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {getCurrentDaySchedule().periods.map((period, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getSubjectColor(period.subject)} flex items-center justify-between`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 font-medium">
                        <FaClock className="w-4 h-4" />
                        {period.time}
                      </div>
                      {period.subject !== 'Break' && (
                        <div className="flex items-center gap-2">
                          <FaBook className="w-4 h-4" />
                          {period.subject}
                        </div>
                      )}
                    </div>
                    {period.subject !== 'Break' && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FaUser className="w-3 h-3" />
                          {period.teacher}
                        </div>
                        <div>{period.room}</div>
                      </div>
                    )}
                  </div>
                  {period.subject !== 'Break' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => ButtonActions.schedule.editPeriod(period)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => ButtonActions.schedule.deletePeriod(period)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Periods</p>
              <p className="text-2xl font-bold text-blue-800">30</p>
            </div>
            <FaBook className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-blue-600 text-sm mt-2">Per week</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Active Teachers</p>
              <p className="text-2xl font-bold text-green-800">8</p>
            </div>
            <FaUser className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-green-600 text-sm mt-2">Teaching this class</p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Subjects</p>
              <p className="text-2xl font-bold text-purple-800">9</p>
            </div>
            <FaBook className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-purple-600 text-sm mt-2">Different subjects</p>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Daily Hours</p>
              <p className="text-2xl font-bold text-amber-800">6</p>
            </div>
            <FaClock className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-amber-600 text-sm mt-2">Including breaks</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;