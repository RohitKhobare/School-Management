import User from "../models/user.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Parent from "../models/parent.js";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../utils/errorHandler.js";

// Add new student
export const addStudent = async (req, res) => {
  try {
    const { name, email, password, class: studentClass, section, phone, dateOfBirth, address } = req.body;

    if (!name || !email || !password || !studentClass || !section) {
      return errorResponse(res, 400, "Name, email, password, class, and section are required.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User with this email already exists.");
    }

    // Create user account
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    // Generate roll number
    const studentCount = await Student.countDocuments();
    const rollNumber = `STU${Date.now()}${studentCount}`;

    // Create student record
    const student = await Student.create({
      name,
      rollNumber,
      class: studentClass,
      section,
      userAccount: user._id,
      phone: phone || null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      address: address || {},
    });

    return successResponse(res, 201, "Student added successfully", {
      student: {
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        class: student.class,
        section: student.section,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Add student error:", error);
    return errorResponse(res, 500, "Failed to add student");
  }
};

// Add new teacher
export const addTeacher = async (req, res) => {
  try {
    const { name, email, password, subject, experience, qualification, phone, classesAssigned } = req.body;

    if (!name || !email || !password || !subject) {
      return errorResponse(res, 400, "Name, email, password, and subject are required.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User with this email already exists.");
    }

    // Create user account
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "teacher",
    });

    // Create teacher record
    const teacher = await Teacher.create({
      name,
      email,
      subject,
      userAccount: user._id,
      experience: experience || 0,
      qualification: qualification || null,
      phone: phone || null,
      classesAssigned: classesAssigned || [],
    });

    return successResponse(res, 201, "Teacher added successfully", {
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
        experience: teacher.experience,
      },
    });
  } catch (error) {
    console.error("Add teacher error:", error);
    return errorResponse(res, 500, "Failed to add teacher");
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("userAccount", "email")
      .populate("parent", "name email phone")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Students retrieved successfully", students);
  } catch (error) {
    console.error("Get students error:", error);
    return errorResponse(res, 500, "Failed to retrieve students");
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("userAccount", "email")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Teachers retrieved successfully", teachers);
  } catch (error) {
    console.error("Get teachers error:", error);
    return errorResponse(res, 500, "Failed to retrieve teachers");
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const student = await Student.findByIdAndUpdate(id, updateData, { new: true })
      .populate("userAccount", "email");

    if (!student) {
      return errorResponse(res, 404, "Student not found");
    }

    return successResponse(res, 200, "Student updated successfully", student);
  } catch (error) {
    console.error("Update student error:", error);
    return errorResponse(res, 500, "Failed to update student");
  }
};

// Update teacher
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true })
      .populate("userAccount", "email");

    if (!teacher) {
      return errorResponse(res, 404, "Teacher not found");
    }

    return successResponse(res, 200, "Teacher updated successfully", teacher);
  } catch (error) {
    console.error("Update teacher error:", error);
    return errorResponse(res, 500, "Failed to update teacher");
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return errorResponse(res, 404, "Student not found");
    }

    // Delete user account
    await User.findByIdAndDelete(student.userAccount);
    // Delete student record
    await Student.findByIdAndDelete(id);

    return successResponse(res, 200, "Student deleted successfully");
  } catch (error) {
    console.error("Delete student error:", error);
    return errorResponse(res, 500, "Failed to delete student");
  }
};

// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return errorResponse(res, 404, "Teacher not found");
    }

    // Delete user account
    await User.findByIdAndDelete(teacher.userAccount);
    // Delete teacher record
    await Teacher.findByIdAndDelete(id);

    return successResponse(res, 200, "Teacher deleted successfully");
  } catch (error) {
    console.error("Delete teacher error:", error);
    return errorResponse(res, 500, "Failed to delete teacher");
  }
};