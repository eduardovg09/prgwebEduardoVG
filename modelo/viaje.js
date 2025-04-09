const sql = require("./Database.js");
class Viaje {
    constructor() {
    }
    async registros() {
        try {
            let c = `
            SELECT 
                V.id_viaje,
                CO.nombre AS ciudad_origen,
                CD.nombre AS ciudad_destino,
                V.fecha_salida,
                V.hora_salida,
                V.fecha_llegada,
                V.hora_llegada
            FROM 
                VIAJE V
            INNER JOIN 
                CIUDAD CO ON V.id_ciudad_origen = CO.id_ciudad
            INNER JOIN 
                CIUDAD CD ON V.id_ciudad_destino = CD.id_ciudad
        `;

            let registros = await sql.query(c);
            return registros;
        } catch (error) {
            console.log(error);
        }
        return [];

    }
    
}
module.exports = Viaje