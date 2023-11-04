const db = require('../util/database');
class Reserva{
    constructor(
        fechaRegistro,
        fechaReserva,
        inicioReserva,
        finReserva,
        cantidadLicenciasReservadas,
        idLaboratorio,
        idAsignatura,
        estado){
            this.idReserva = idReserva;
            this.fechaRegistro = fechaRegistro;
            this.fechaReserva = fechaReserva;
            this.inicioReserva = inicioReserva;
            this.finReserva = finReserva;
            this.cantidadLicenciasReservadas = cantidadLicenciasReservadas;
            this.idLaboratorio = idLaboratorio;
            this.idAsignatura = idAsignatura;
            this.estado = estado;
    }
    static reservasDocente(DNI_Docente) {
        return db.execute('CALL getReservasByDocente(?)',[DNI_Docente]);
    }
    static guardarReserva(Reserva) {
        return db.execute('CALL postReserva(?, ?, ?, ?, ?, ?);',
        [
            Reserva.fechaRegistro,
            Reserva.fechaReserva,
            Reserva.inicioReserva,
            Reserva.finReserva,
            Reserva.cantidadLicencias,
            Reserva.idLaboratorio,
            Reserva.idAsignatura
        ]);
    }
}
module.exports = Reserva;