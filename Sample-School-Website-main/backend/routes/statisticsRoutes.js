import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getStatistics } from "../controllers/statisticsController.js";

const router = express.Router();

// Get statistics for charts (all authenticated users)
router.get("/", verifyToken, getStatistics);

export default router;