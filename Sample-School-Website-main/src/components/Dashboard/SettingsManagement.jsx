import React, { useState, useEffect } from 'react';
import { FaSchool, FaGraduationCap, FaRupeeSign, FaBell, FaShieldAlt, FaSave, FaEdit } from 'react-icons/fa';
import { ButtonActions } from './ButtonActions';

const SettingsManagement = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('school');
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockSettings = {
      school: {
        school_name: 'M.M. Vidya Mandir Primary School',
        school_address: 'Mumbai, Maharashtra, India',
        school_phone: '+91 98765 43210',
        school_email: 'info@mmvidyamandir.edu.in'
      },
      academic: {
        academic_year: '2024-2025',
        session_start: '2024-04-01',
        session_end: '2025-03-31',
        working_days: 220
      },
      finance: {
        currency: 'INR',
        late_fee_percentage: 5,
        discount_limit: 20
      },
      notification: {
        email_notifications: true,
        sms_notifications: true
      },
      security: {
        password_expiry_days: 90,
        max_login_attempts: 5
      }
    };
    
    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const settingsTabs = [
    { id: 'school', name: 'School Info', icon: FaSchool, color: 'blue' },
    { id: 'academic', name: 'Academic', icon: FaGraduationCap, color: 'green' },
    { id: 'finance', name: 'Finance', icon: FaRupeeSign, color: 'amber' },
    { id: 'notification', name: 'Notifications', icon: FaBell, color: 'purple' },
    { id: 'security', name: 'Security', icon: FaShieldAlt, color: 'red' }
  ];

  const handleEdit = (category, key) => {
    setEditMode({ ...editMode, [`${category}_${key}`]: true });
  };

  const handleSave = (category, key) => {
    setEditMode({ ...editMode, [`${category}_${key}`]: false });
    // Here you would typically save to backend
    console.log('Saving setting:', category, key, settings[category][key]);
  };

  const handleInputChange = (category, key, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    });
  };

  const renderSettingField = (category, key, value, label, type = 'text') => {
    const isEditing = editMode[`${category}_${key}`];
    
    return (
      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          {isEditing ? (
            type === 'boolean' ? (
              <select
                value={value.toString()}
                onChange={(e) => handleInputChange(category, key, e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => handleInputChange(category, key, type === 'number' ? parseInt(e.target.value) : e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            )
          ) : (
            <p className="text-gray-900 font-medium">
              {type === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
            </p>
          )}
        </div>
        <div className="ml-4 flex gap-2">
          {isEditing ? (
            <button
              onClick={() => ButtonActions.settings.updateSetting({ key }, value)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <FaSave className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleEdit(category, key)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <FaEdit className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="flex gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activeTabData = settingsTabs.find(tab => tab.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Settings Management</h2>
        <button 
          onClick={ButtonActions.settings.exportSettings}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <FaSave className="w-4 h-4" />
          Save All Changes
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {settingsTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? `border-${tab.color}-500 text-${tab.color}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <activeTabData.icon className={`w-5 h-5 text-${activeTabData.color}-600`} />
              {activeTabData.name} Settings
            </h3>
            <p className="text-gray-600 mt-1">
              Configure {activeTabData.name.toLowerCase()} related settings for your school
            </p>
          </div>

          <div className="space-y-4">
            {settings[activeTab] && Object.entries(settings[activeTab]).map(([key, value]) => {
              const labels = {
                school_name: 'School Name',
                school_address: 'School Address',
                school_phone: 'Phone Number',
                school_email: 'Email Address',
                academic_year: 'Academic Year',
                session_start: 'Session Start Date',
                session_end: 'Session End Date',
                working_days: 'Working Days',
                currency: 'Currency',
                late_fee_percentage: 'Late Fee Percentage',
                discount_limit: 'Discount Limit (%)',
                email_notifications: 'Email Notifications',
                sms_notifications: 'SMS Notifications',
                password_expiry_days: 'Password Expiry (Days)',
                max_login_attempts: 'Max Login Attempts'
              };

              const types = {
                session_start: 'date',
                session_end: 'date',
                working_days: 'number',
                late_fee_percentage: 'number',
                discount_limit: 'number',
                password_expiry_days: 'number',
                max_login_attempts: 'number',
                email_notifications: 'boolean',
                sms_notifications: 'boolean'
              };

              return renderSettingField(
                activeTab,
                key,
                value,
                labels[key] || key.replace('_', ' ').toUpperCase(),
                types[key] || 'text'
              );
            })}
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-600 text-sm font-medium">System Version</p>
            <p className="text-blue-800 font-bold">v2.1.0</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-600 text-sm font-medium">Last Backup</p>
            <p className="text-green-800 font-bold">2 hours ago</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-600 text-sm font-medium">Database Status</p>
            <p className="text-purple-800 font-bold">Healthy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;