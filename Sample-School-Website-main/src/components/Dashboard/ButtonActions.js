// Central button actions for all dashboard components
export const ButtonActions = {
  // Modal state management
  modals: {
    student: { isOpen: false, type: null, data: null },
    teacher: { isOpen: false, type: null, data: null },
    class: { isOpen: false, type: null, data: null },
    schedule: { isOpen: false, type: null, data: null },
    contact: { isOpen: false, type: null, data: null },
    application: { isOpen: false, type: null, data: null }
  },

  // Modal control functions
  openModal: (type, modalType, data = null) => {
    ButtonActions.modals[type] = { isOpen: true, type: modalType, data };
    // Trigger re-render by dispatching custom event
    window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { type, modalType, data } }));
  },

  closeModal: (type) => {
    ButtonActions.modals[type] = { isOpen: false, type: null, data: null };
    window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { type, modalType: null, data: null } }));
  },
  // Finance Management Actions
  finance: {
    exportReport: () => {
      const data = "Finance Report Data";
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `finance-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      alert('Finance report exported successfully!');
    },
    
    generateInvoice: () => {
      alert('Invoice generation feature will open in a new window');
      // In real app: window.open('/invoice-generator', '_blank');
    }
  },

  // Schedule Management Actions
  schedule: {
    addPeriod: () => {
      ButtonActions.openModal('schedule', 'addPeriod');
    },
    
    editPeriod: (period) => {
      ButtonActions.openModal('schedule', 'editPeriod', period);
    },
    
    deletePeriod: (period) => {
      if (window.confirm(`Delete ${period.subject} period?`)) {
        alert(`${period.subject} period deleted`);
      }
    }
  },

  // Class Management Actions
  class: {
    addClass: () => {
      ButtonActions.openModal('class', 'addClass');
    },
    
    editClass: (classData) => {
      ButtonActions.openModal('class', 'editClass', classData);
    },
    
    deleteClass: (classData) => {
      if (window.confirm(`Delete class ${classData.name}?`)) {
        alert(`Class ${classData.name} deleted`);
      }
    },
    
    viewStudents: (classData) => {
      alert(`Viewing students in ${classData.name}`);
    }
  },

  // Student Management Actions
  student: {
    addStudent: () => {
      ButtonActions.openModal('student', 'addStudent');
    },
    
    editStudent: (student) => {
      ButtonActions.openModal('student', 'editStudent', student);
    },
    
    deleteStudent: (student) => {
      if (window.confirm(`Delete student ${student.name}?`)) {
        alert(`Student ${student.name} deleted`);
      }
    },
    
    viewProfile: (student) => {
      alert(`Viewing profile of ${student.name}`);
    }
  },

  // Teacher Management Actions
  teacher: {
    addTeacher: () => {
      ButtonActions.openModal('teacher', 'addTeacher');
    },
    
    editTeacher: (teacher) => {
      ButtonActions.openModal('teacher', 'editTeacher', teacher);
    },
    
    deleteTeacher: (teacher) => {
      if (window.confirm(`Delete teacher ${teacher.name}?`)) {
        alert(`Teacher ${teacher.name} deleted`);
      }
    },
    
    viewProfile: (teacher) => {
      alert(`Viewing profile of ${teacher.name}`);
    }
  },

  // Contact Management Actions
  contact: {
    markAsRead: (contact) => {
      alert(`Contact from ${contact.name} marked as read`);
    },
    
    reply: (contact) => {
      const reply = prompt(`Reply to ${contact.name}:`);
      if (reply) {
        alert(`Reply sent to ${contact.email}`);
      }
    },
    
    delete: (contact) => {
      if (window.confirm(`Delete contact from ${contact.name}?`)) {
        alert(`Contact deleted`);
      }
    },
    
    changeStatus: (contact, newStatus) => {
      alert(`Contact status changed to ${newStatus}`);
    }
  },

  // Application Management Actions
  application: {
    approve: (application) => {
      if (window.confirm(`Approve application for ${application.studentName}?`)) {
        alert(`Application approved for ${application.studentName}`);
      }
    },
    
    reject: (application) => {
      const reason = prompt('Reason for rejection:');
      if (reason) {
        alert(`Application rejected: ${reason}`);
      }
    },
    
    review: (application) => {
      alert(`Reviewing application for ${application.studentName}`);
    },
    
    delete: (application) => {
      if (window.confirm(`Delete application for ${application.studentName}?`)) {
        alert(`Application deleted`);
      }
    }
  },

  // Reports Management Actions
  reports: {
    generateReport: (type) => {
      alert(`Generating ${type} report...`);
      setTimeout(() => {
        alert(`${type} report generated successfully!`);
      }, 1000);
    },
    
    downloadReport: (report) => {
      alert(`Downloading ${report.title}...`);
    },
    
    shareReport: (report) => {
      const email = prompt('Enter email to share report:');
      if (email) {
        alert(`Report shared with ${email}`);
      }
    },
    
    deleteReport: (report) => {
      if (window.confirm(`Delete ${report.title}?`)) {
        alert(`Report deleted`);
      }
    }
  },

  // Settings Management Actions
  settings: {
    updateSetting: (setting, newValue) => {
      if (window.confirm(`Update ${setting.key} to ${newValue}?`)) {
        alert(`Setting ${setting.key} updated`);
      }
    },
    
    resetSetting: (setting) => {
      if (window.confirm(`Reset ${setting.key} to default?`)) {
        alert(`Setting ${setting.key} reset to default`);
      }
    },
    
    exportSettings: () => {
      alert('Settings exported successfully!');
    },
    
    importSettings: () => {
      alert('Settings import feature - select file to import');
    }
  },

  // Common Actions
  common: {
    search: (query, type) => {
      alert(`Searching for "${query}" in ${type}`);
    },
    
    filter: (filterType, value) => {
      alert(`Filtering by ${filterType}: ${value}`);
    },
    
    sort: (column, direction) => {
      alert(`Sorting by ${column} ${direction}`);
    },
    
    refresh: () => {
      alert('Data refreshed');
      window.location.reload();
    },
    
    print: (type) => {
      alert(`Printing ${type}...`);
      window.print();
    }
  }
};