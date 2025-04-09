const Viaje = require("../modelo/viaje.js");
const express = require("express");
const router = express.Router();


router.get("/",async (request, response) =>{
    let viaje = new Viaje();
    let res = await viaje.registros();
    response.json({
        result:res
    })
});

module.exports = router;
