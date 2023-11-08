const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const laboratorioController = require('../controllers/laboratorio');

router.get('/cantlicencia/:id_laboratorio', laboratorioController.cantidadLicencias);
router.get('/licencias/:id_laboratorio', laboratorioController.licenciasLaboratorio);
router.get('/labas/:id_asignatura',laboratorioController.laboratoriosByAsignatura);
module.exports = router;
