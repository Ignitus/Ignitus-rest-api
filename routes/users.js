const express = require('express');
const router = express.Router();

const Users= require('../controllers/user');

// routes dealing with user collection

router.post('/register',Users.register);
router.post('/login',Users.login);
router.get('/verify',Users.verify);
module.exports = router;
