const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Docente = require('../models/docente'); 
const jwt =  require('jsonwebtoken');
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(422).json({ errors: errors.array() }); 
    }
    const DNI_Docente = req.body.DNI_Docente;
    const Apellidos = req.body.Apellidos;
    const Nombres = req.body.Nombres;
    const Correo = req.body.Correo;
    const Pass = req.body.Pass;
try {
    const hashedpassword = await bcrypt.hash(Pass, 12);
    const docenteDetails = {
        DNI_Docente: DNI_Docente,
        Apellidos: Apellidos,
        Nombres: Nombres,
        Correo: Correo,
        Pass: hashedpassword 
    }
    const result = await Docente.save(docenteDetails);
    res.status(201).json({ message: 'User registered!' });
} catch (err) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}
};
exports.login = async (req, res, next) => {
    const correo = req.body.Correo;
    const pass = req.body.Pass;
    try {
        const docente = await Docente.find(correo);
        if (docente[0].length !== 1) {
            return res.status(401).json({ error: 'Un docente con este correo no pudo ser encontrado' });
        }
        const storedDocente = docente[0][0];
        const isEqual = await bcrypt.compare(pass, storedDocente.Pass);
        if (!isEqual) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const token = jwt.sign(
            {
                correo: storedDocente.Correo,
                docenteid: storedDocente.DNI_Docente
            },
            'secretfortoken',
            { expiresIn: '2h' }
        );
        res.status(200).json({ token: token, docenteid: storedDocente.DNI_Docente });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getDNI = async (req, res, next) => {
    const correo = req.params.Correo;
    try {
        const dni = await Docente.getDNI(correo);
        res.status(201).json(correo);
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}