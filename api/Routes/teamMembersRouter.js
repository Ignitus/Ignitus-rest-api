const express = require('express');

const router = express.Router();
const TeamMember = require('../Controllers/teamMembersController');

router.post('/team-member/add', TeamMember.createTeamMember);
router.put('/team-member/:id', TeamMember.updateTeamMember);

router.get('/team-members', TeamMember.getAllTeamMembers);
router.get('/team-member/:id', TeamMember.getTeamMember);

router.delete('/team-member/:id', TeamMember.deleteTeamMember);

module.exports = router;
