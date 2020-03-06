import express from 'express';
const router = express.Router();

import { verifyStudent } from '../Middlewares/check-auth.js';
import { viewProfessorProfile } from '../Controllers/professorProfile.js';
import { viewStudentProfile } from '../Controllers/studentProfile.js';

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
