import express from 'express';
const opportunityRouter = express.Router();

import {
  addOppurtunity,
  updateOppurtunity,
  fetchAllOpportunities,
  fetchOppurtunityById,
  deleteOppurtunity
} from '../Controllers/opportunityController.js';

opportunityRouter.post('/oppurtunity/add', addOppurtunity);
opportunityRouter.put('/oppurtunity/:id/', updateOppurtunity);

opportunityRouter.get('/oppurtunity', fetchAllOpportunities);
opportunityRouter.get('/oppurtunity/:id', fetchOppurtunityById);

opportunityRouter.delete('/oppurtunity/:id', deleteOppurtunity);
export default opportunityRouter;
