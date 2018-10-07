const express = require('express');

const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const professor_profile = require('../controllers/professor_profile');
const student_profile = require('../controllers/student_profile');

// student profile
router.get('/student/profile', checkAuth.checkStudentAuth, student_profile.viewProfile);
// professor profile
router.get('/professor/profile', checkAuth.checkProfessorAuth, professor_profile.viewProfile);


module.exports = router;
