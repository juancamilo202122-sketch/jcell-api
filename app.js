/**
 * app.js
 * Punto de entrada de la API REST de JCELL.
 * Configura Express, middlewares y todas las rutas del sistema.
 *
 * Módulos disponibles:
 *  /api/clientes    → Gestión de clientes
 *  /api/tecnicos    → Gestión de técnicos
 *  /api/inventario  → Gestión de inventario de partes
 *  /api/ordenes     → Gestión de órdenes de servicio
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importar rutas de cada módulo
const clienteRoutes = require("./src/routes/clienteRoutes");
const tecnicoRoutes = require("./src/routes/tecnicoRoutes");
const inventarioRoutes = require("./src/routes/inventarioRoutes");
const ordenRoutes = require("./src/routes/ordenRoutes");

// Inicializar la aplicación Express
const app = express();
const PUERTO = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use("/api/clientes", clienteRoutes);
app.use("/api/tecnicos", tecnicoRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/ordenes", ordenRoutes);

// Ruta raíz: verifica que el servidor está corriendo
app.get("/", (req, res) => {
  res.json({
    mensaje: "JCELL API corriendo correctamente.",
    version: "1.0",
    modulos: {
      clientes: "/api/clientes",
      tecnicos: "/api/tecnicos",
      inventario: "/api/inventario",
      ordenes: "/api/ordenes",
    },
  });
});

// Iniciar el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor JCELL API corriendo en http://localhost:${PUERTO}`);
});