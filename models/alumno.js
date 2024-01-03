const db = require('../util/databaseestudiantes');
class Alumno{
    constructor(
        idalumno,
        dni_alumno,
        nombres_alumno,
        apellidos_alumno
    ){
        this.idalumno=idalumno;
        this.dni_alumno=dni_alumno;
        this.nombres_alumno=nombres_alumno;
        this.apellidos_alumno=apellidos_alumno;
    }
    static async selectAlumno(dni_alumno){
        try {
            // Realizar el SELECT en la tabla alumno
            const [alumnos, fields] = await db.execute('SELECT * FROM alumno WHERE dni_alumno = ?', [dni_alumno]);
            // Verificar si se encontraron resultados en la tabla alumno
            if (alumnos.length > 0) {
              const alumno = alumnos[0];
              // Insertar un registro en la tabla registro con la hora actual y otros datos del alumno
              await db.execute('INSERT INTO registro (dni_alumno, hora_escaneo, nombres_alumno, apellidos_alumno) VALUES (?, NOW(), ?, ?)',
                [alumno.dni_alumno, alumno.nombres_alumno, alumno.apellidos_alumno]);
            }
    
            return alumnos;
          } catch (error) {
            throw error;
          }
    }
}
module.exports=Alumno;