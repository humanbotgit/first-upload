const db = require('../util/database');
module.exports = class Reserva{
    constructor(
        fechaRegistro,
        fechaReserva,
        inicioReserva,
        finReserva,
        cantidadLicenciasReservadas,
        idLaboratorioAsignatura,
        estado){
            this.idReserva = idReserva;
            this.fechaRegistro = fechaRegistro;
            this.fechaReserva = fechaReserva;
            this.inicioReserva = inicioReserva;
            this.finReserva = finReserva;
            this.cantidadLicenciasReservadas = cantidadLicenciasReservadas;
            this.idLaboratorioAsignatura = idLaboratorioAsignatura;
            this.estado = estado;
    }
    static reservasDocente(DNI_Docente) {
        return db.execute('CALL getReservasByDocente(?)',[DNI_Docente]);
    }
}