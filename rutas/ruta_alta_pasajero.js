const express = require('express');
const router = express.Router();
const Pasajero = require('../modelo/pasajero.js');

router.post('/', async (req, res) => {
    try {
        const { correo, nombres, apellidos, edad, ciudad } = req.body;
        const pasajero = new Pasajero();
        await pasajero.agregarPasajero(correo, nombres, apellidos, edad, ciudad);
        res.status(201).send({ message: 'Pasajero registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un error al registrar el pasajero' });
    }
});

module.exports = router;
