const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const Docente = require('../models/docente');
const docenteController = require('../controllers/docente');

router.post(
    '/signup',
    [
        body('DNI_Docente').trim().not().isEmpty(),
        body('Apellidos').trim().not().isEmpty(),
        body('Nombres').trim().not().isEmpty(),
        body('Correo').isEmail().withMessage('Ingrese un correo válido')
            .custom(async (Correo) => {
                try {
                    const docente = await Docente.findOne({ Correo: Correo });
                    if (docente) {
                        return Promise.reject('El correo ya está registrado');
                    }
                } catch (err) {
                
                }
            })
            .normalizeEmail(),
            body('Pass').trim().isLength({ min: 7 }),
    ],
    docenteController.signup
);
router.post('/login',docenteController.login)
router.get('/correo/:correo',docenteController.getDNI)//reservas
router.get('/correodocente/:correo',docenteController.getDNIDocente)
module.exports = router;
