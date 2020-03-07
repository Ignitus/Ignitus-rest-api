import express from 'express';
const router = express.Router();

import { verifyStudent } from '../Middlewares/check-auth.js';
import { viewProfessorProfile } from '../Controllers/professorController.js';
import { viewStudentProfile } from '../Controllers/studentController.js';

router.get(
  '/student/profile',
  verifyStudent,
  viewStudentProfile,
);

router.get(
  '/professor/profile',
  viewProfessorProfile,
);

export default router;
