const express = require('express');

const router = express.Router();

const checkAuth = require('../Middlewares/check-auth');
const professorProfile = require('../Controllers/professorProfile');
const studentProfile = require('../Controllers/studentProfile');


router.get(
  '/student/profile',
  checkAuth.checkStudentAuth,
  studentProfile.viewProfile,
);

router.get(
  '/professor/profile',
  checkAuth.checkProfessorAuth,
  professorProfile.viewProfile,
);

module.exports = router;
