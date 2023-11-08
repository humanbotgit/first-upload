const { validationResult } = require('express-validator');
const Laboratorio = require('../models/laboratorio');
exports.cantidadLicencias = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const id_laboratorio = req.params.id_laboratorio;
    try {
        const [[[cantidadLicencias]]] = await Laboratorio.getCantidadLicencias(id_laboratorio);
        res.status(200).json(cantidadLicencias);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.licenciasLaboratorio = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const id_laboratorio = req.params.id_laboratorio;
    try {
        const [[licencias]]= await Laboratorio.getLicencias(id_laboratorio);
        res.status(200).json(licencias);
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.laboratoriosByAsignatura = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const {
        id_asignatura,
        dni_docente
    } = req.body;
    try {
        const [[laboratorios]] = await Laboratorio
        .getLaboratoriosByAsignatura(id_asignatura, dni_docente);
        res.status(200).json(laboratorios );
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
