const db = require('../util/database');
class Asignatura {
    constructor(ID_Asignatura,NRC,Nombre_Asignatura,DNI_Docente)
    {
        this.ID_Asignatura = ID_Asignatura;
        this.NRC = NRC;
        this.Nombre_Asignatura = Nombre_Asignatura;
        this.DNI_Docente = DNI_Docente;
    }
    static getAsignaturasByDocente(DNI_Docente) {
        return db.execute('CALL getAsignaturaDocente(?)', [DNI_Docente])
    }
    
}
module.exports = Asignatura;