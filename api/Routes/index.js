const express = require('express');

const router = express.Router();

const checkAuth = require('../Middlewares/check-auth');
const professor_profile = require('../Controllers/professorProfile');
const student_profile = require('../Controllers/studentProfile');

// student profile
router.get('/student/profile', checkAuth.checkStudentAuth, student_profile.viewProfile);
// professor profile
router.get('/professor/profile', checkAuth.checkProfessorAuth, professor_profile.viewProfile);


module.exports = router;
