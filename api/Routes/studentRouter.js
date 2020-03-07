import express from 'express';
import { verifyStudent } from '../Middlewares/check-auth.js';
import { viewStudentProfile } from '../Controllers/studentController.js';

const studentRouter = express.Router();
studentRouter.get('/student/profile', verifyStudent, viewStudentProfile);
export default studentRouter;
