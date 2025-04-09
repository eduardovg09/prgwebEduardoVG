const express = require('express');
const router = express.Router();
const insertarViaje = require('../modelo/insertarViaje');

router.get('/ciudades', async (req, res) => {
    try {
        const viaje = new insertarViaje();
        const ciudades = await viaje.obtenerCiudades();
        res.send({ result: ciudades });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener las ciudades' });
    }
});

router.get('/pasajeros', async (req, res) => {
    try {
        const viaje = new insertarViaje();
        const pasajeros = await viaje.obtenerPasajeros();
        res.send({ result: pasajeros });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener los pasajeros' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { id_pasajero, id_ciudad_origen, id_ciudad_destino, fecha_salida, hora_salida, fecha_llegada, hora_llegada } = req.body;
        const viaje = new insertarViaje();
        const ultimoIdViaje = await viaje.obtenerUltimoIdViaje();
        const nuevoIdViaje = ultimoIdViaje + 1;
        await viaje.agregarViaje(nuevoIdViaje, id_pasajero, id_ciudad_origen, id_ciudad_destino, fecha_salida, hora_salida, fecha_llegada, hora_llegada);
        res.status(201).send({ message: 'Viaje registrado exitosamente' });
    } catch (error) {
        console.error("Error al registrar el viaje: ", error); // Log detallado del error
        res.status(500).send({ message: 'Error al registrar el viaje', error: error.message });
    }
});

module.exports = router;
