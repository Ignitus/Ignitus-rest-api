import express, { Router } from 'express';
import { verifyStudent } from '../Middlewares/check-auth';
import { studentProfile } from '../Controllers/studentController';

export const studentRouter: Router = express.Router();
studentRouter.get('/student/profile', verifyStudent, studentProfile);
