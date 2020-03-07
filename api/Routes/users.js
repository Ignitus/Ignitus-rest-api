import express from 'express';

const router = express.Router();
const Users = require('../Controllers/user');

import {
  studentRegister,
  professorRegister,
  getUserInfoFromToken,
  login
} from '../Controllers/user.js';

router.post('/login', login);
router.post('/register/student', studentRegister);
router.post('/register/professor', professorRegister);
router.post('/userinfofromtoken', getUserInfoFromToken);

/* Disabled atm.
    router.get('/student/oauth/linkedin', Users.studentlinkedlogin);
    router.get(
      '/student/oauth/linkedin/callback',
      Users.studentlinkedlogincallback,
    );
*/

/* Disabled atm.
    router.get('/professor/oauth/linkedin', Users.professorlinkedlogin);
    router.get(
      '/professor/oauth/linkedin/callback',
      Users.professorlinkedlogincallback,
    );
*/

/* Disabled atm.
    router.get('/verify', Users.verify);
*/

/* Disabled atm.
  router.post('/forgotPassword', Users.forgotPassword);
  router.get('/reset', Users.resetPassword);
  router.put('/updatePasswordViaMail', Users.updatePassword);
*/

module.exports = router;
