const sql = require("mssql");

const config = {
    user: "java",
    password: "java",
    database: "agencia_5502",
    server: "localhost",
    options: {
        encrypt: false,
        trustServerCertificate: false
    }

};

const connection = sql.connect(config).then(done => {
    console.log("Conectado a la base de datos de la agencia");
}).catch(error=>{
    console.log(error);
});

module.exports = sql;