const express = require('express');

const router = express.Router();

const Users = require('../controllers/user');

// routes dealing with user collection
// used different routes for student and professor
// student register route
router.post('/register/student', Users.studentRegister);
// professor register route
router.post('/register/professor', Users.professorRegister);

// normal login route same for both the users
router.post('/login', Users.login);
// Linkedin login for student
router.get('/student/oauth/linkedin', Users.studentlinkedlogin);
router.get('/student/oauth/linkedin/callback', Users.studentlinkedlogincallback);

// Linkedin login for professor
router.get('/professor/oauth/linkedin', Users.professorlinkedlogin);
router.get('/professor/oauth/linkedin/callback', Users.professorlinkedlogincallback);

// email verification route same for both the users
router.get('/verify', Users.verify);

router.post('/userinfofromtoken', Users.getUserInfoFromToken);
module.exports = router;
