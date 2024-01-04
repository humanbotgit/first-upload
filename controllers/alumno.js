const Alumno = require('../models/alumno');
exports.selectAlumno=async(req,res,next)=>{
    const dni = req.params.dni;
    try {
        const [[infoAlumno]]= await Alumno.selectAlumno(dni);
        res.status(200).json(infoAlumno);
        console.log(dni);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(dni);
        }
        next(err);
    }
}
