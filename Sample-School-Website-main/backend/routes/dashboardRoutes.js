import express from "express";
import { verifyToken, authorize } from "../middleware/auth.js";
import {
  getStudentDashboard,
  getTeacherDashboard,
  getParentDashboard,
  getAdminDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

// Student Dashboard
router.get("/student", verifyToken, authorize(["student"]), getStudentDashboard);

// Teacher Dashboard
router.get("/teacher", verifyToken, authorize(["teacher"]), getTeacherDashboard);

// Parent Dashboard
router.get("/parent", verifyToken, authorize(["parent"]), getParentDashboard);

// Admin Dashboard
router.get("/admin", verifyToken, authorize(["admin"]), getAdminDashboard);

export default router;