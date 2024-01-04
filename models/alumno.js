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
            await db.execute('SELECT * FROM alumno WHERE dni_alumno = ?', [dni_alumno]);
              await db.execute('INSERT INTO registro (dni_alumno, hora_escaneo, nombres_alumno, apellidos_alumno) VALUES (?, NOW(), ?, ?)',
                [Alumno.dni_alumno, Alumno.nombres_alumno, Alumno.apellidos_alumno]);
    }
}
module.exports=Alumno;