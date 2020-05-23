import express, { Router } from 'express';

import {
  register,
  getUserInfoFromToken,
  login,
} from '../Controllers/userController';

export const userRouter: Router = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/userinfofromtoken', getUserInfoFromToken);

/* Disabled atm.
    router.get('/student/oauth/linkedin', User.studentlinkedlogin);
    router.get(
      '/student/oauth/linkedin/callback',
      User.studentlinkedlogincallback,
    );
*/

/* Disabled atm.
    router.get('/professor/oauth/linkedin', User.professorlinkedlogin);
    router.get(
      '/professor/oauth/linkedin/callback',
      User.professorlinkedlogincallback,
    );
*/

/* Disabled atm.
    router.get('/verify', User.verify);
*/

/* Disabled atm.
  router.post('/forgotPassword', User.forgotPassword);
  router.get('/reset', User.resetPassword);
  router.put('/updatePasswordViaMail', User.updatePassword);
*/
