const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Reserva = require('../models/reserva');
exports.reservaDocente = async (req, res, next) => {
    const dni_docente = req.params.id;
    try {
        const [[allReservas]] = await Reserva.reservasDocente(dni_docente);
        const formattedReservas = allReservas.map(reserva => ({
            ...reserva,
            Fecha_Registro: new Date(reserva.Fecha_Registro).toLocaleString(),
            Fecha_Reserva: new Date(reserva.Fecha_Reserva).toISOString().split('T')[0]
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
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'drunkducky892@gmail.com',
                pass:'olulo1456'
            }
        })
        const correoDocente=await Docente.getCorreo(ID_Asignatura);
        const mailOptions={
            from:'jarancibia@continental.edu.pe',
            to: correoDocente,
            subject: 'Reserva Realizada',
            text: 'Tu reserva fue realizada aquí las licencias'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });

        res.status(201).json({message:'Reserva realizada'})
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}