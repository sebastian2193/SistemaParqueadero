const mysql = require("mysql2");
require("dotenv").config();

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexion.connect((error) => {
  if (error) {
    console.log("Error de conexión:", error);
  } else {
    console.log("Base de datos conectada");
  }
});

module.exports = conexion;