import express, { Router } from 'express';
export const opportunityRouter: Router = express.Router();

import {
  addOpportunity,
  updateOpportunity,
  fetchAllOppurtunities,
  fetchOpportunityByID,
  deleteOpportunity,
} from '../Controllers/opportunityController';

opportunityRouter.post('/Opportunity/add', addOpportunity);
opportunityRouter.put('/Opportunity/:id/', updateOpportunity);
opportunityRouter.get('/Opportunity', fetchAllOppurtunities);
opportunityRouter.get('/Opportunity/:id', fetchOpportunityByID);
opportunityRouter.delete('/Opportunity/:id', deleteOpportunity);
