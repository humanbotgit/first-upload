const express = require('express');
const router = express.Router();
const asignaturaController = require('../controllers/asignatura');
router.get('/:dni',asignaturaController.asignaturasByDocente);
module.exports = router;