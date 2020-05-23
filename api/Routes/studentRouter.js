import express from 'express';
import { verifyStudent } from '../Middlewares/check-auth';
import { studentProfile } from '../Controllers/studentController.js';

const studentRouter = express.Router();
studentRouter.get('/student/profile', verifyStudent, studentProfile);
export default studentRouter;
