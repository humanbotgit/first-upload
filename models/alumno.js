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
            return db.execute('SELECT * FROM alumno WHERE dni_alumno = ?', [dni_alumno]);
    }
}
module.exports=Alumno;
