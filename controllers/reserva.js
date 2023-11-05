const { validationResult } = require('express-validator');
const Reserva = require('../models/reserva');
exports.reservaDocente = async (req,res,next) => {
    const dni_docente=req.param.DNI_Docente;
    try {
        const[[allReservas]]=await Reserva.reservasDocente(dni_docente);
        res.status(200).json(allReservas);
    } catch (err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}
exports.postReserva =async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
   const fechaReserva= req.body.Fecha_Reserva;
   const inicioReserva = req.body.Inicio_Reserva;
   const finReserva = req.body.Fin_Reserva;
   const cantidadLicencias = req.body.Cantidad_Licencias_Reservadas;
   const idLaboratorio = req.body.ID_Laboratorio;
   const idAsignatura = req.body.ID_Asignatura;
    try{
        const reservaDetails ={
            Fecha_Reserva: fechaReserva,
            Inicio_Reserva: inicioReserva,
            Fin_Reserva: finReserva,
            Cantidad_Licencias_Reservadas: cantidadLicencias,
            ID_Laboratorio: idLaboratorio,
            ID_Asignatura: idAsignatura

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