import express, { Router } from 'express';
export const opportunityRouter: Router = express.Router();

import {
  addOppurtunity,
  updateOppurtunity,
  fetchAllOppurtunities,
  fetchOppurtunityByID,
  deleteOppurtunity,
} from '../Controllers/opportunityController';

opportunityRouter.post('/oppurtunity/add', addOppurtunity);
opportunityRouter.put('/oppurtunity/:id/', updateOppurtunity);
opportunityRouter.get('/oppurtunity', fetchAllOppurtunities);
opportunityRouter.get('/oppurtunity/:id', fetchOppurtunityByID);
opportunityRouter.delete('/oppurtunity/:id', deleteOppurtunity);
