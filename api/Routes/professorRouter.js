import express from 'express';
import { viewProfessorProfile } from '../Controllers/professorController.js';

const professorRouter = express.Router();
professorRouter.get('/professor/profile', viewProfessorProfile);
export default professorRouter;
