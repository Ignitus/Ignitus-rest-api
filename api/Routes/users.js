const express = require('express');

const router = express.Router();
const Users = require('../Controllers/user');

router.post('/login', Users.login);

router.post('/register/student', Users.studentRegister);
router.get('/student/oauth/linkedin', Users.studentlinkedlogin);
router.get(
  '/student/oauth/linkedin/callback',
  Users.studentlinkedlogincallback,
);

router.post('/register/professor', Users.professorRegister);
router.get('/professor/oauth/linkedin', Users.professorlinkedlogin);
router.get(
  '/professor/oauth/linkedin/callback',
  Users.professorlinkedlogincallback,
);

/**
 * User verification disabled for now.
 * router.get('/verify', Users.verify);
 */

router.post('/forgotPassword', Users.forgotPassword);
router.get('/reset', Users.resetPassword);

router.put('/updatePasswordViaMail', Users.updatePassword);
router.post('/userinfofromtoken', Users.getUserInfoFromToken);
module.exports = router;
