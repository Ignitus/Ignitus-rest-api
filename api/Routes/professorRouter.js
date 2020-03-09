import express from 'express';
import { professorProfile } from '../Controllers/professorController.js';

const professorRouter = express.Router();
professorRouter.get('/professor/profile', professorProfile);
export default professorRouter;
