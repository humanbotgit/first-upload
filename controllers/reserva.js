const { validationResult } = require('express-validator');
const Reserva = require('../models/reserva');
exports.reservaDocente = async (req, res, next) => {
    const dni_docente = req.params.id;
    try {
        const [[allReservas]] = await Reserva.reservasDocente(dni_docente);
        const formattedReservas = allReservas.map(reserva => ({
            ...reserva,
            Fecha_Registro: new Date(reserva.Fecha_Registro).toLocaleString(),
            Fecha_Reserva: new Date(reserva.Fecha_Reserva).toLocaleString()
        }));
        res.status(200).json(formattedReservas);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postReserva =async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const {
        Fecha_Reserva,
        Inicio_Reserva,
        Fin_Reserva,
        Cantidad_Licencias_Reservadas,
        ID_Laboratorio,
        ID_Asignatura
    } = req.body;
    try{
        const reservaDetails ={
            Fecha_Reserva: Fecha_Reserva,
            Inicio_Reserva: Inicio_Reserva,
            Fin_Reserva: Fin_Reserva,
            Cantidad_Licencias_Reservadas: Cantidad_Licencias_Reservadas,
            ID_Laboratorio: ID_Laboratorio,
            ID_Asignatura: ID_Asignatura
        }
        const result=await Reserva.guardarReserva(reservaDetails)
        res.status(201).json({message:'Reserva realizada'})
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}