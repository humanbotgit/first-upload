const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumno');
router.get('/:dni',alumnoController.selectAlumno);
module.exports = router;