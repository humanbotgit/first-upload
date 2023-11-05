const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reservaController = require('../controllers/reserva')
const auth = require('../middleware/auth');

router.get('/:id',reservaController.reservaDocente);
router.post('/',[
    auth,
    body('Fecha_Reserva').trim().not().isEmpty(),
    body('Inicio_Reserva').trim().not().isEmpty(),
    body('Fin_Reserva').trim().not().isEmpty(),
    body('Cantidad_Licencias_Reservadas').trim().not().isEmpty(),
    body('ID_Laboratorio').trim().not().isEmpty(), 
    body('ID_Asignatura').trim().not().isEmpty()
], reservaController.postReserva
);
module.exports = router;