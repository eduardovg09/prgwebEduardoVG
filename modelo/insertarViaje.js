const sql = require("./Database.js");

class insertarViaje {
    constructor() { }

    async obtenerCiudades() {
        try {
            let query = `SELECT id_ciudad, nombre FROM CIUDAD`;
            let ciudades = await sql.query(query);
            return ciudades;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async obtenerPasajeros() {
        try {
            let query = `SELECT id_pasajero, CONCAT(nombres, ' ', apellidos) AS nombre_completo FROM PASAJERO`;
            let pasajeros = await sql.query(query);
            return pasajeros;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async obtenerUltimoIdViaje() {
        try {
            let query = `SELECT MAX(id_viaje) AS ultimo_id FROM VIAJE`;
            let result = await sql.query(query);
            return result.recordset[0].ultimo_id || 0; // Si no hay registros, retorna 0
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async agregarViaje(id_viaje, id_pasajero, id_ciudad_origen, id_ciudad_destino, fecha_salida, hora_salida, fecha_llegada, hora_llegada) {
        try {
            // Formatear las horas añadiendo segundos
            const horaSalidaFormatted = `${hora_salida}`;
            const horaLlegadaFormatted = `${hora_llegada}`;

            // Utilizar una transacción para asegurar la consistencia de los datos
            const pool = await sql.connect();
            const transaction = new sql.Transaction(pool);

            await transaction.begin();

            const request = new sql.Request(transaction);
            request.input('id_viaje', sql.Int, id_viaje);
            request.input('id_pasajero', sql.Int, id_pasajero);
            request.input('id_ciudad_origen', sql.Int, id_ciudad_origen);
            request.input('id_ciudad_destino', sql.Int, id_ciudad_destino);
            request.input('fecha_salida', sql.Date, fecha_salida);
            request.input('hora_salida', horaSalidaFormatted);
            request.input('fecha_llegada', sql.Date, fecha_llegada);
            request.input('hora_llegada', horaLlegadaFormatted);

            

            let query = `INSERT INTO VIAJE (id_viaje, id_pasajero, id_ciudad_origen, id_ciudad_destino, fecha_salida, hora_salida, fecha_llegada, hora_llegada) 
                         VALUES (@id_viaje, @id_pasajero, @id_ciudad_origen, @id_ciudad_destino, @fecha_salida, @hora_salida, @fecha_llegada, @hora_llegada)`;

           

            await request.query(query);

            await transaction.commit();
        } catch (error) {
            console.error("Error al agregar viaje: ", error); // Log detallado del error
            throw error;
        }
    }
}

module.exports = insertarViaje;
