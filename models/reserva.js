const db = require('../util/database');
class Reserva{
    constructor(
        Fecha_Reserva,
        Inicio_Reserva,
        Fin_Reserva,
        Cantidad_Licencias_Reservadas,
        ID_Laboratorio,
        ID_Asignatura){
            this.Fecha_Reserva = Fecha_Reserva;
            this.Inicio_Reserva = Inicio_Reserva;
            this.Fin_Reserva = Fin_Reserva;
            this.Cantidad_Licencias_Reservadas = Cantidad_Licencias_Reservadas;
            this.ID_Laboratorio = ID_Laboratorio;
            this.ID_Asignatura = ID_Asignatura;
    }
    static reservasDocente(DNI_Docente) {
        return db.execute('CALL getReservasByDocente(?)',[DNI_Docente]);
    }
    static guardarReserva(Reserva) {
        return db.execute('CALL postReserva(?, ?, ?, ?, ?, ?);',
        [
            Reserva.Fecha_Reserva,
            Reserva.Inicio_Reserva,
            Reserva.Fin_Reserva,
            Reserva.cantidadLicenciasReservadas,
            Reserva.ID_Laboratorio,
            Reserva.ID_Asignatura
        ]);
    }
}
module.exports = Reserva;