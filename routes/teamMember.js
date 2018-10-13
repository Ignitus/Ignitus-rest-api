const express = require('express');

const router = express.Router();

const TeamMember = require('../controllers/team_member');

// TeamMember routes:

// create TeamMember

router.post('/team-member/add', TeamMember.createTeamMember);

// update TeamMemer

router.put('/team-member/:id', TeamMember.updateTeamMember);

// Fetch all TeamMembers

router.get('/team-members', TeamMember.getAllTeamMembers);

// delete TeamMember

router.delete('/team-member/:id', TeamMember.deleteTeamMember);

module.exports = router;
