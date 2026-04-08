import express from 'express';
import { verifyToken, authorize } from '../middleware/auth.js';
import { 
  submitApplication, 
  getAllApplications, 
  updateApplicationStatus, 
  deleteApplication 
} from '../controllers/applicationController.js';

const router = express.Router();

// Public route - Application form submission
router.post('/submit', submitApplication);

// Admin routes - Protected
router.get('/', verifyToken, authorize(['admin']), getAllApplications);
router.put('/:id', verifyToken, authorize(['admin']), updateApplicationStatus);
router.delete('/:id', verifyToken, authorize(['admin']), deleteApplication);

export default router;