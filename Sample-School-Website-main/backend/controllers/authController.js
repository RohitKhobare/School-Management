import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Parent from "../models/parent.js";
import { errorResponse, successResponse } from "../utils/errorHandler.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role = "student" } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return errorResponse(res, 400, "All required fields must be provided.");
    }

    if (password.length < 6) {
      return errorResponse(res, 400, "Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return errorResponse(res, 400, "Passwords do not match.");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, "User with this email already exists.");
    }

    const validRoles = ["student", "teacher", "admin", "parent"];
    if (!validRoles.includes(role)) {
      return errorResponse(res, 400, `Invalid role. Must be one of: ${validRoles.join(", ")}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    // Create role-specific records
    if (role === "student") {
      const studentCount = await Student.countDocuments();
      const rollNumber = `STU${Date.now()}${studentCount}`;
      await Student.create({
        name,
        rollNumber,
        class: "Pending",
        section: "Pending",
        userAccount: newUser._id,
      });
    } else if (role === "teacher") {
      await Teacher.create({
        name,
        email,
        subject: "Pending",
        userAccount: newUser._id,
      });
    } else if (role === "parent") {
      await Parent.create({
        name,
        email,
        userAccount: newUser._id,
      });
    }

    return successResponse(res, 201, "User registered successfully", {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return errorResponse(res, 500, "Error during signup. Please try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return errorResponse(res, 400, "Email, password, and role are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 401, "Invalid email or password. Please try again.");
    }

    if (user.role !== role) {
      return errorResponse(res, 403, `This account is registered as a ${user.role}. Please login with ${user.role} role.`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid email or password. Please try again.");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return successResponse(res, 200, "Login successful", {
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, 500, "Error during login. Please try again.");
  }
};