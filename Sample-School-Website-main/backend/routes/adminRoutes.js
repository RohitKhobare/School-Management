import express from "express";
import { verifyToken, authorize } from "../middleware/auth.js";
import {
  addStudent,
  addTeacher,
  getAllStudents,
  getAllTeachers,
  updateStudent,
  updateTeacher,
  deleteStudent,
  deleteTeacher,
} from "../controllers/adminController.js";

const router = express.Router();

// Student management routes
router.post("/students", verifyToken, authorize(["admin"]), addStudent);
router.get("/students", verifyToken, authorize(["admin"]), getAllStudents);
router.put("/students/:id", verifyToken, authorize(["admin"]), updateStudent);
router.delete("/students/:id", verifyToken, authorize(["admin"]), deleteStudent);

// Teacher management routes
router.post("/teachers", verifyToken, authorize(["admin"]), addTeacher);
router.get("/teachers", verifyToken, authorize(["admin"]), getAllTeachers);
router.put("/teachers/:id", verifyToken, authorize(["admin"]), updateTeacher);
router.delete("/teachers/:id", verifyToken, authorize(["admin"]), deleteTeacher);

export default router;
