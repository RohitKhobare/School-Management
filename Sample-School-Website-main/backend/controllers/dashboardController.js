import User from "../models/user.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Parent from "../models/parent.js";
import { errorResponse, successResponse } from "../utils/errorHandler.js";

// Get Student Dashboard Data
export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const student = await Student.findOne({ userAccount: userId })
      .populate("parent", "name email phone")
      .populate("userAccount", "name email");

    if (!student) {
      return errorResponse(res, 404, "Student profile not found.");
    }

    const dashboardData = {
      profile: {
        name: student.name,
        rollNumber: student.rollNumber,
        class: student.class,
        section: student.section,
        email: student.userAccount.email,
        phone: student.phone,
        enrollmentDate: student.enrollmentDate,
      },
      parent: student.parent ? {
        name: student.parent.name,
        email: student.parent.email,
        phone: student.parent.phone,
      } : null,
      stats: {
        attendance: "95%", // Mock data - you can implement actual attendance
        totalSubjects: 8,
        currentGrade: "A",
      }
    };

    return successResponse(res, 200, "Student dashboard data retrieved", dashboardData);
  } catch (error) {
    console.error("Student dashboard error:", error);
    return errorResponse(res, 500, "Error retrieving dashboard data");
  }
};

// Get Teacher Dashboard Data
export const getTeacherDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacher = await Teacher.findOne({ userAccount: userId })
      .populate("userAccount", "name email");

    if (!teacher) {
      return errorResponse(res, 404, "Teacher profile not found.");
    }

    // Get students from assigned classes
    const classNames = teacher.classesAssigned.map(c => c.class);
    const students = await Student.find({ class: { $in: classNames } });

    const dashboardData = {
      profile: {
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
        experience: teacher.experience,
        qualification: teacher.qualification,
        joinDate: teacher.joinDate,
      },
      classesAssigned: teacher.classesAssigned,
      stats: {
        totalStudents: students.length,
        totalClasses: teacher.classesAssigned.length,
        subject: teacher.subject,
      },
      recentStudents: students.slice(0, 5).map(s => ({
        name: s.name,
        rollNumber: s.rollNumber,
        class: s.class,
        section: s.section,
      }))
    };

    return successResponse(res, 200, "Teacher dashboard data retrieved", dashboardData);
  } catch (error) {
    console.error("Teacher dashboard error:", error);
    return errorResponse(res, 500, "Error retrieving dashboard data");
  }
};

// Get Parent Dashboard Data
export const getParentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const parent = await Parent.findOne({ userAccount: userId })
      .populate("linkedStudents", "name rollNumber class section phone enrollmentDate")
      .populate("userAccount", "name email");

    if (!parent) {
      return errorResponse(res, 404, "Parent profile not found.");
    }

    const dashboardData = {
      profile: {
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
        relationship: parent.relationship,
        occupation: parent.occupation,
      },
      children: parent.linkedStudents.map(child => ({
        name: child.name,
        rollNumber: child.rollNumber,
        class: child.class,
        section: child.section,
        enrollmentDate: child.enrollmentDate,
        attendance: "94%", // Mock data
        grade: "A-", // Mock data
      })),
      stats: {
        totalChildren: parent.linkedStudents.length,
        avgAttendance: "94%",
        avgGrade: "A-",
      }
    };

    return successResponse(res, 200, "Parent dashboard data retrieved", dashboardData);
  } catch (error) {
    console.error("Parent dashboard error:", error);
    return errorResponse(res, 500, "Error retrieving dashboard data");
  }
};

// Get Admin Dashboard Data
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalParents = await Parent.countDocuments();

    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userAccount", "email");

    const recentTeachers = await Teacher.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const dashboardData = {
      stats: {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalParents,
        totalClasses: 12, // Mock data
        avgAttendance: "92%", // Mock data
      },
      recentStudents: recentStudents.map(s => ({
        name: s.name,
        rollNumber: s.rollNumber,
        class: s.class,
        section: s.section,
        email: s.userAccount.email,
        enrollmentDate: s.enrollmentDate,
      })),
      recentTeachers: recentTeachers.map(t => ({
        name: t.name,
        email: t.email,
        subject: t.subject,
        experience: t.experience,
        joinDate: t.joinDate,
      }))
    };

    return successResponse(res, 200, "Admin dashboard data retrieved", dashboardData);
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return errorResponse(res, 500, "Error retrieving dashboard data");
  }
};