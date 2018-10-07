const express = require('express');

const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const professorProfile = require('../controllers/professor_profile');
const studentProfile = require('../controllers/student_profile');

// student profile
router.get('/student/profile', checkAuth.checkStudentAuth, studentProfile.viewProfile);
// professor profile
router.get('/professor/profile', checkAuth.checkProfessorAuth, professorProfile.viewProfile);


module.exports = router;
