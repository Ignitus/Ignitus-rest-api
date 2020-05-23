import express, { Router } from 'express';
import { professorProfile } from '../Controllers/professorController';

export const professorRouter: Router = express.Router();
professorRouter.get('/professor/profile', professorProfile);
