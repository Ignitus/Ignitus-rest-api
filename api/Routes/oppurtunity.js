import express from 'express';
const careerRouter = express.Router();

import {
  addOppurtunity,
  updateOppurtunity,
  fetchAllOpportunities,
  fetchOppurtunityById,
  deleteOppurtunity
} from '../Controllers/oppurtunity.js';

careerRouter.post('/oppurtunity/add', addOppurtunity);
careerRouter.put('/oppurtunity/:id/', updateOppurtunity);

careerRouter.get('/oppurtunity', fetchAllOpportunities);
careerRouter.get('/oppurtunity/:id', fetchOppurtunityById);

careerRouter.delete('/oppurtunity/:id', deleteOppurtunity);
export default careerRouter;
