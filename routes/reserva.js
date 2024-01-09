const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reservaController = require('../controllers/reserva')
const auth = require('../middleware/auth');

router.get('/:id',reservaController.reservaDocente);
router.post('/',[
    auth,
    body('Fecha_Reserva'),
    body('Inicio_Reserva'),
    body('Fin_Reserva'),
    body('Cantidad_Licencias_Reservadas'),
    body('ID_Laboratorio'), 
    body('ID_Asignatura')
], reservaController.postReserva
);

module.exports = router;