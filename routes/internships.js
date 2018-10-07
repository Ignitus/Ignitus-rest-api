const express = require('express');

const router = express.Router();

const Internships = require('../controllers/internship');

// Routes handling internship pages:

// add internship
router.post('/internship/add', Internships.addInternship);

// update internship
router.put('/internship/:id/', Internships.updateInternship);

// View all internships...for carousel to display internship on front-end
router.get('/internships', Internships.viewAllInternships);

// view internship by id
router.get('/internship/:id', Internships.viewInternshipByID);

// delete internship (using id)
router.delete('/internship/:id', Internships.deleteInternship);

module.exports = router;
