const Alumno = require('../models/alumno');
exports.selectAlumno=async(req,res,next)=>{
    const dni = req.params.dni;

  try {
    // Llamar a la función para obtener información del alumno por su DNI
    const [[infoAlumno]] = await Alumno.selectAlumno(dni);

    // Llamar a la función para insertar un registro por DNI
    await Alumno.insertRegistro(dni);

    res.status(200).json({ infoAlumno, message: 'Registro insertado correctamente.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
