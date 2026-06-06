/**
 * database.js
 * Configura y exporta la conexión a la base de datos MySQL de JCELL.
 * Usa un pool de conexiones para manejar múltiples peticiones simultáneas.
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const mysql = require("mysql2");
require("dotenv").config();

// Pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Exporta el pool con soporte para promesas
module.exports = pool.promise();