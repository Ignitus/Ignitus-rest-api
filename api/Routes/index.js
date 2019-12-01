const express = require('express');

const router = express.Router();

const checkAuth = require('../Middlewares/check-auth');
const professor_profile = require('../Controllers/professor_profile');
const student_profile = require('../Controllers/student_profile');

// student profile
router.get('/student/profile', checkAuth.checkStudentAuth, student_profile.viewProfile);
// professor profile
router.get('/professor/profile', checkAuth.checkProfessorAuth, professor_profile.viewProfile);


module.exports = router;
