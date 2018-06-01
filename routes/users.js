const express = require('express');
const router = express.Router();

const Users= require('../controllers/user');

// routes dealing with user collection
// used different routes for student and professor
//student register route
router.post('/register/student',Users.studentRegister);
//professor register route
router.post('/register/professor',Users.professorRegister);

//normal login route same for both the users
router.post('/login',Users.login);

//email verification route same for both the users
router.get('/verify',Users.verify);

module.exports = router;
