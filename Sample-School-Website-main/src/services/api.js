const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('mms-token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add Authorization header if token exists (for protected endpoints)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });
    
    if (!response.ok) {
      // Try to get detailed error from backend
      const errorData = await response.json().catch(() => ({}));
      console.error(`API Error ${response.status}:`, errorData);
      console.error('Request details:', {
        endpoint,
        method: options.method || 'GET',
        body: options.body ? JSON.parse(options.body) : null,
      });
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || ''}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Dashboard APIs
export const dashboardAPI = {
  getStudentDashboard: () => apiCall('/dashboard/student'),
  getTeacherDashboard: () => apiCall('/dashboard/teacher'),
  getParentDashboard: () => apiCall('/dashboard/parent'),
  getAdminDashboard: () => apiCall('/dashboard/admin'),
};

// Student APIs
export const studentAPI = {
  getAll: () => apiCall('/students'),
  getById: (id) => apiCall(`/students/${id}`),
  getStats: () => apiCall('/students/stats'),
  getByClass: (className, section) => apiCall(`/students/class/${className}/${section}`),
  add: (data) => apiCall('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/students/${id}`, { method: 'DELETE' }),
};

// Teacher APIs
export const teacherAPI = {
  getAll: () => apiCall('/teachers'),
  getById: (id) => apiCall(`/teachers/${id}`),
  getStats: () => apiCall('/teachers/stats'),
  add: (data) => apiCall('/teachers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/teachers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/teachers/${id}`, { method: 'DELETE' }),
};

// Attendance APIs
export const attendanceAPI = {
  mark: (data) => apiCall('/attendance', { method: 'POST', body: JSON.stringify(data) }),
  getStats: () => apiCall('/attendance/stats'),
  getByClassAndDate: (className, section, date) => apiCall(`/attendance/class/${className}/${section}/${date}`),
  getByStudent: (studentId, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/attendance/student/${studentId}${query ? `?${query}` : ''}`);
  },
};

// Marks APIs
export const marksAPI = {
  add: (data) => apiCall('/marks', { method: 'POST', body: JSON.stringify(data) }),
  getByStudent: (studentId) => apiCall(`/marks/student/${studentId}`),
  getByClassAndExam: (className, section, examType) => apiCall(`/marks/class/${className}/${section}/${examType}`),
  getStudentPerformance: (studentId) => apiCall(`/marks/performance/student/${studentId}`),
  getClassPerformance: (className, section) => apiCall(`/marks/performance/class/${className}/${section}`),
  update: (id, data) => apiCall(`/marks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Notice APIs
export const noticeAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/notices${query ? `?${query}` : ''}`);
  },
  getById: (id) => apiCall(`/notices/${id}`),
  getRecent: () => apiCall('/notices/recent'),
  create: (data) => apiCall('/notices', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/notices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/notices/${id}`, { method: 'DELETE' }),
};

// Admin APIs
export const adminAPI = {
  // Student management
  addStudent: (data) => apiCall('/admin/students', { method: 'POST', body: JSON.stringify(data) }),
  getAllStudents: () => apiCall('/admin/students'),
  updateStudent: (id, data) => apiCall(`/admin/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStudent: (id) => apiCall(`/admin/students/${id}`, { method: 'DELETE' }),
  
  // Teacher management
  addTeacher: (data) => apiCall('/admin/teachers', { method: 'POST', body: JSON.stringify(data) }),
  getAllTeachers: () => apiCall('/admin/teachers'),
  updateTeacher: (id, data) => apiCall(`/admin/teachers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTeacher: (id) => apiCall(`/admin/teachers/${id}`, { method: 'DELETE' }),
};

// Statistics APIs
export const statisticsAPI = {
  get: () => apiCall('/statistics'),
};

// Contact Form APIs
export const contactAPI = {
  submit: (data) => apiCall('/contact/submit', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/contact${query ? `?${query}` : ''}`);
  },
  getStats: () => apiCall('/contact/stats'),
  updateStatus: (id, data) => apiCall(`/contact/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/contact/${id}`, { method: 'DELETE' }),
};

// Auth APIs
export const authAPI = {
  login: (data) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  signup: (data) => apiCall('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
};

// Application APIs
export const applicationAPI = {
  submit: (data) => apiCall('/applications/submit', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/applications${query ? `?${query}` : ''}`);
  },
  updateStatus: (id, data) => apiCall(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/applications/${id}`, { method: 'DELETE' }),
};