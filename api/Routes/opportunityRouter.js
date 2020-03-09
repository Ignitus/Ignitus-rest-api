import express from 'express';
const opportunityRouter = express.Router();

import {
  addOppurtunity,
  updateOppurtunity,
  fetchAllOppurtunities,
  fetchOppurtunityByID,
  deleteOppurtunity
} from '../Controllers/opportunityController.js';

opportunityRouter.post('/oppurtunity/add', addOppurtunity);
opportunityRouter.put('/oppurtunity/:id/', updateOppurtunity);

opportunityRouter.get('/oppurtunity', fetchAllOppurtunities);
opportunityRouter.get('/oppurtunity/:id', fetchOppurtunityByID);

opportunityRouter.delete('/oppurtunity/:id', deleteOppurtunity);
export default opportunityRouter;
