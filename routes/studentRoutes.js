const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
const studentController = require('../controllers/studentController');

router.get('/student/', authenticateToken, studentController.getStudents);

router.post('/student/', authenticateToken, studentController.createStudent);

module.exports = router;
