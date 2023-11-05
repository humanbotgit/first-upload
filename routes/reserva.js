const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reservaController = require('../controllers/reserva')
const auth = require('../middleware/auth');

router.get('/docente/:DNI_Docente',reservaController.reservaDocente);
router.post('/',[
    auth,
    body(Fecha_Reserva)
])