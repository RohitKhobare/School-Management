import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaClock, FaTrash, FaUser, FaCalendarAlt, FaGraduationCap, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { applicationAPI } from '../../services/api';
import { ButtonActions } from './ButtonActions';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await applicationAPI.getAll(params);
      
      if (response.success) {
        setApplications(response.data.applications);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status, adminNotes = '') => {
    try {
      await applicationAPI.updateStatus(id, { status, adminNotes });
      fetchApplications(); // Refresh the list
    } catch (err) {
      alert('Failed to update application status');
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationAPI.delete(id);
        fetchApplications(); // Refresh the list
        setShowModal(false);
      } catch (err) {
        alert('Failed to delete application');
      }
    }
  };

  const openApplicationModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock className="w-4 h-4" />;
      case 'under_review': return <FaEye className="w-4 h-4" />;
      case 'approved': return <FaCheckCircle className="w-4 h-4" />;
      case 'rejected': return <FaTimes className="w-4 h-4" />;
      default: return <FaClock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
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
        <h2 className="text-2xl font-bold text-gray-800">Application Management</h2>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'under_review', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaGraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <FaUser className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.parentName}</div>
                      <div className="text-sm text-gray-500">{application.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{application.grade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openApplicationModal(application)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        {application.status !== 'approved' && (
                          <button
                            onClick={() => ButtonActions.application.approve(application)}
                            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-100 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                        )}
                        {application.status !== 'rejected' && (
                          <button
                            onClick={() => ButtonActions.application.reject(application)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => ButtonActions.application.delete(application)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Application Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Student Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FaUser className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Student Name</p>
                          <p className="font-medium">{selectedApplication.studentName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaGraduationCap className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Grade Applied</p>
                          <p className="font-medium capitalize">{selectedApplication.grade}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{new Date(selectedApplication.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Parent Information</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Parent/Guardian Name</p>
                        <p className="font-medium">{selectedApplication.parentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedApplication.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Address</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>{selectedApplication.address}</p>
                  </div>
                </div>

                {/* Previous School */}
                {selectedApplication.previousSchool && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Previous School</p>
                    <p className="font-medium">{selectedApplication.previousSchool}</p>
                  </div>
                )}

                {/* Medical Info */}
                {selectedApplication.medicalInfo && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Medical Information</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{selectedApplication.medicalInfo}</p>
                    </div>
                  </div>
                )}

                {/* Status Update */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication._id, 'pending')}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Mark Pending
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication._id, 'under_review')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Under Review
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication._id, 'approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication._id, 'rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;