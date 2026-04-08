import React, { useState, useEffect } from 'react';
import { noticeAPI } from '../../services/api';

const NoticeBoard = ({ userRole = 'student' }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'all',
    priority: 'medium',
    expiryDate: ''
  });

  useEffect(() => {
    fetchNotices();
  }, [userRole]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await noticeAPI.getAll({ targetAudience: userRole });
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await noticeAPI.create({
        ...formData,
        publishedBy: 'admin@school.com'
      });
      
      await fetchNotices();
      setFormData({
        title: '',
        content: '',
        targetAudience: 'all',
        priority: 'medium',
        expiryDate: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to create notice:', error);
      alert('Failed to create notice');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await noticeAPI.delete(id);
        await fetchNotices();
      } catch (error) {
        console.error('Failed to delete notice:', error);
        alert('Failed to delete notice');
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notice Board</h2>
        {(userRole === 'admin' || userRole === 'teacher') && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Notice
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Notice</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Notice Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Notice Content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-2 border rounded"
                rows="4"
                required
              />
              <select
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="all">All</option>
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
                <option value="parents">Parents</option>
              </select>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                placeholder="Expiry Date (Optional)"
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Add Notice
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({
                      title: '', content: '', targetAudience: 'all',
                      priority: 'medium', expiryDate: ''
                    });
                  }}
                  className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice._id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{notice.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                    {notice.priority.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    For: {notice.targetAudience}
                  </span>
                </div>
              </div>
              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{notice.content}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Published: {formatDate(notice.publishDate)}</span>
              {notice.expiryDate && (
                <span>Expires: {formatDate(notice.expiryDate)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {notices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">📢</div>
          <p>No notices available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;