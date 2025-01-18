const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshopController');

router.get('/', workshopController.getWorkshops);

router.post('/', workshopController.createWorkshop);

router.post('/:id/students', workshopController.addStudentsToWorkshop);

module.exports = router;
