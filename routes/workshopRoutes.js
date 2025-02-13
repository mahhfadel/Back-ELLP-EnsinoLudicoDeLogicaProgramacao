const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
const workshopController = require('../controllers/workshopController');

router.get('/workshop/', authenticateToken, workshopController.getWorkshops);

router.post('/workshop/', authenticateToken, workshopController.createWorkshop);

router.post('/workshop/:id/students', authenticateToken, workshopController.addStudentsToWorkshop);

router.get('/workshop/:id/students', authenticateToken, workshopController.getStudentsForWorkshop);

router.put('/workshop/:workshopId/students/:studentId/completed', authenticateToken, workshopController.markStudentAsCompleted);

module.exports = router;
