const Asignatura = require('../models/asignatura');
exports.asignaturasByDocente=async(req,res,next)=>{
    const dni = req.params.dni;
    try{
        const [[allAsignaturas]] = await Asignatura.getAsignaturasByDocente(dni);
        res.status(200).json(allAsignaturas);
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
