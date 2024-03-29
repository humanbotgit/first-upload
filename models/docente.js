const db = require('../util/database');

class Docente {
    constructor(DNI_Docente, Apellidos, Nombres, Correo, Pass) {
        this.DNI_Docente = DNI_Docente;
        this.Apellidos = Apellidos;
        this.Nombres = Nombres;
        this.Correo = Correo;
        this.Pass = Pass; 
    };
    static find(Correo) {
        return db.execute("CALL postFindDocente(?)", [Correo])
            .then(([rows, fields]) => {
                if (rows.length === 0) {
                    const error = new Error('No se encontró ningún docente con este correo');
                    error.statusCode = 404;
                    throw error;
                }
                return rows; 
            })
            .catch(error => {
                error.message = `Error al buscar docente por correo (${Correo}): ${error.message}`;
                throw error;
            });
    };

    static save(Docente) {
        return db.execute(
            'CALL postNewDocente(?,?,?,?,?)', 
            [Docente.DNI_Docente, Docente.Apellidos, Docente.Nombres, Docente.Correo, Docente.Pass]
        );
    }
    static getCorreo(ID_Asignatura){
        return db.execute(
            'CALL getCorreoDocente(?)',
            [ID_Asignatura]
        )
    }
    static getDNI(Correo){
        return db.execute(
            'CALL getDniByCorreo(?)',
            [Correo]
        )
    }
    static getDNIDocente(Correo){
        return db.execute(
            'CALL getDocenteDNI(?)',
            [Correo]
        )
    }
}

module.exports = Docente;