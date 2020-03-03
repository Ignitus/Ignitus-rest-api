const express = require('express');

const router = express.Router();

const checkAuth = require('../Middlewares/check-auth');
const professorProfile = require('../Controllers/professorProfile');
const studentProfile = require('../Controllers/studentProfile');


router.get(
  '/student/profile',
  checkAuth.verifyStudent,
  studentProfile.viewProfile,
);

router.get(
  '/professor/profile',
  professorProfile.viewProfile,
);

module.exports = router;
