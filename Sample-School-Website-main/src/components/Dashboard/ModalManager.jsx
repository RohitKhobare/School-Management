import React, { useState, useEffect } from 'react';
import { AddStudentForm, AddTeacherForm, AddClassForm, AddPeriodForm, EditStudentForm, EditTeacherForm } from './Forms';
import { ButtonActions } from './ButtonActions';

const ModalManager = () => {
  const [modalStates, setModalStates] = useState({
    student: { isOpen: false, type: null, data: null },
    teacher: { isOpen: false, type: null, data: null },
    class: { isOpen: false, type: null, data: null },
    schedule: { isOpen: false, type: null, data: null },
    contact: { isOpen: false, type: null, data: null },
    application: { isOpen: false, type: null, data: null }
  });

  useEffect(() => {
    const handleModalStateChange = (event) => {
      const { type, modalType, data } = event.detail;
      setModalStates(prev => ({
        ...prev,
        [type]: { isOpen: modalType !== null, type: modalType, data }
      }));
    };

    window.addEventListener('modalStateChange', handleModalStateChange);
    return () => window.removeEventListener('modalStateChange', handleModalStateChange);
  }, []);

  const closeModal = (type) => {
    setModalStates(prev => ({
      ...prev,
      [type]: { isOpen: false, type: null, data: null }
    }));
  };

  // Form submission handlers
  const handleStudentSubmit = (formData) => {
    console.log('Student form submitted:', formData);
    alert(`Student ${formData.name} ${formData.id ? 'updated' : 'added'} successfully!`);
    closeModal('student');
  };

  const handleTeacherSubmit = (formData) => {
    console.log('Teacher form submitted:', formData);
    alert(`Teacher ${formData.name} ${formData.id ? 'updated' : 'added'} successfully!`);
    closeModal('teacher');
  };

  const handleClassSubmit = (formData) => {
    console.log('Class form submitted:', formData);
    alert(`Class ${formData.name} added successfully!`);
    closeModal('class');
  };

  const handlePeriodSubmit = (formData) => {
    console.log('Period form submitted:', formData);
    alert(`Period ${formData.subject} added successfully!`);
    closeModal('schedule');
  };

  return (
    <>
      {/* Student Modals */}
      <AddStudentForm
        isOpen={modalStates.student.isOpen && modalStates.student.type === 'addStudent'}
        onClose={() => closeModal('student')}
        onSubmit={handleStudentSubmit}
      />
      
      <EditStudentForm
        isOpen={modalStates.student.isOpen && modalStates.student.type === 'editStudent'}
        onClose={() => closeModal('student')}
        onSubmit={handleStudentSubmit}
        student={modalStates.student.data}
      />

      {/* Teacher Modals */}
      <AddTeacherForm
        isOpen={modalStates.teacher.isOpen && modalStates.teacher.type === 'addTeacher'}
        onClose={() => closeModal('teacher')}
        onSubmit={handleTeacherSubmit}
      />
      
      <EditTeacherForm
        isOpen={modalStates.teacher.isOpen && modalStates.teacher.type === 'editTeacher'}
        onClose={() => closeModal('teacher')}
        onSubmit={handleTeacherSubmit}
        teacher={modalStates.teacher.data}
      />

      {/* Class Modals */}
      <AddClassForm
        isOpen={modalStates.class.isOpen && modalStates.class.type === 'addClass'}
        onClose={() => closeModal('class')}
        onSubmit={handleClassSubmit}
      />

      {/* Schedule Modals */}
      <AddPeriodForm
        isOpen={modalStates.schedule.isOpen && modalStates.schedule.type === 'addPeriod'}
        onClose={() => closeModal('schedule')}
        onSubmit={handlePeriodSubmit}
      />
    </>
  );
};

export default ModalManager;