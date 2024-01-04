const Alumno = require('../models/alumno');
exports.selectAlumno=async(req,res,next)=>{
    const dni = req.params.dni;
    try {
        const [[infoAlumno]]= await Alumno.selectAlumno(dni);
        const [[infoAlumnoRegistro]]= await Alumno.InsertarRegistroPorDNI(dni);
        res.status(200).json(infoAlumno);
        res.status(200).json(infoAlumnoRegistro);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            
        }
        next(err);
    }
}
