import express from 'express';
import {
  createTeamMember,
  updateTeamMember,
  fetchAllTeamMembers,
  fetchTeamMemberByID,
  deleteTeamMember
} from '../Controllers/teamMembersController.js';

const teamMembersrouter = express.Router();

teamMembersrouter.get('/team-members', fetchAllTeamMembers);
teamMembersrouter.get('/team-member/:id', fetchTeamMemberByID);
teamMembersrouter.post('/team-member/add', createTeamMember);
teamMembersrouter.put('/team-member/:id', updateTeamMember);
teamMembersrouter.delete('/team-member/:id', deleteTeamMember);

export default teamMembersrouter;
