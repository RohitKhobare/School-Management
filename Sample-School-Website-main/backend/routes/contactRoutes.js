import express from "express";
import { verifyToken, authorize } from "../middleware/auth.js";
import {
  submitContactForm,
  getAllContacts,
  getContactStats,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Public route - Contact form submission
router.post("/submit", submitContactForm);

// Admin routes - Protected
router.get("/", verifyToken, authorize(["admin"]), getAllContacts);
router.get("/stats", verifyToken, authorize(["admin"]), getContactStats);
router.put("/:id", verifyToken, authorize(["admin"]), updateContactStatus);
router.delete("/:id", verifyToken, authorize(["admin"]), deleteContact);

export default router;