const express  = require("express");
const db = require("./modelo/Database.js");
const path = require("path");
const body_parser = require("body-parser");

const app = express();
app.use(body_parser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

//RUTAS
app.use("/viajes",require("./rutas/ruta_viajes.js"));
app.use("/pasajeros",require("./rutas/ruta_alta_pasajero.js"));
app.use("/nuevo-viaje", require("./rutas/ruta_insertar_viaje.js"));

app.listen(8080,function(){
    console.log("Servidor iniciado en el puerto 8080");
});