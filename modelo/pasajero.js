const sql = require("./Database.js");

class Pasajero {
    constructor() {}

    async agregarPasajero(correo, nombres, apellidos, edad, ciudad) {
        try {
            const request = new sql.Request();

            // Agregar el parámetro 'ciudad' a la consulta
            request.input('ciudad', sql.NVarChar, ciudad);

            // Obtener el id de la ciudad
            const ciudadQuery = `SELECT id_ciudad FROM CIUDAD WHERE nombre = @ciudad`;
            const ciudadResult = await request.query(ciudadQuery);

            if (ciudadResult.recordset.length === 0) {
                throw new Error("Ciudad no encontrada");
            }
            let id_ciudad = ciudadResult.recordset[0].id_ciudad;

            // Obtener el próximo id_pasajero
            const idQuery = `SELECT ISNULL(MAX(id_pasajero), 0) + 1 AS nextId FROM PASAJERO`;
            const idResult = await request.query(idQuery);
            let id_pasajero = idResult.recordset[0].nextId;

            // Agregar los parámetros para la consulta de inserción
            request.input('id_pasajero', sql.Int, id_pasajero);
            request.input('correo', sql.NVarChar, correo);
            request.input('nombres', sql.NVarChar, nombres);
            request.input('apellidos', sql.NVarChar, apellidos);
            request.input('edad', sql.Int, edad);
            request.input('id_ciudad', sql.Int, id_ciudad);

            // Insertar el nuevo pasajero
            const insertQuery = `
                INSERT INTO PASAJERO (id_pasajero, correo, nombres, apellidos, edad, id_ciudad)
                VALUES (@id_pasajero, @correo, @nombres, @apellidos, @edad, @id_ciudad)
            `;

            const result = await request.query(insertQuery);

            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}

module.exports = Pasajero;
