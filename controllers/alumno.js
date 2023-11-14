const Alumno = require('../models/alumno');
exports.selectAlumno=async(req,res,next)=>{
    const dni = req.params.dni_alumno;
    try {
        const [Alumno]= await Alumno.selectAlumno(dni);
        res.status(200).json(Alumno);
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}