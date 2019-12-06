const express = require('express');

const router = express.Router();
const Internships = require('../Controllers/internship');

router.post('/internship/add', Internships.addInternship);
router.put('/internship/:id/', Internships.updateInternship);

router.get('/internships', Internships.viewAllInternships);
router.get('/internship/:id', Internships.viewInternshipByID);

router.delete('/internship/:id', Internships.deleteInternship);
module.exports = router;
