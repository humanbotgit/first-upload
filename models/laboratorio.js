const db = require('../util/database');
class Laboratorio{
    constructor(
        ID_Laboratorio,
        Nombre_Laboratorio,
        Cantidad_Licencias
    ){
        this.ID_Laboratorio = ID_Laboratorio;
        this.Nombre_Laboratorio = Nombre_Laboratorio;
        this.Cantidad_Licencias = Cantidad_Licencias;
    }
    static getCantidadLicencias(ID_Laboratorio) {
        return db.execute(
            'CALL getCantidadLicencias(?)',
            [ID_Laboratorio]
        );
    } 
    static getLicencias(ID_Laboratorio) {
        return db.execute(
            'CALL getLicenciasLaboratorio(?)',
            [ID_Laboratorio]
        );
    }
    static getLaboratoriosByAsignatura( ID_Asignatura) {
        return db.execute(
            'Call getLaboratoriosAsignatura(?);',
            [ID_Asignatura]
        );
    }
}
module.exports = Laboratorio;