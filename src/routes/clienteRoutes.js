/**
 * clienteRoutes.js
 * Define las rutas del módulo de Clientes de JCELL.
 *
 * GET    /api/clientes         → Obtener todos los clientes
 * GET    /api/clientes/:id     → Obtener cliente por ID
 * POST   /api/clientes         → Crear nuevo cliente
 * PUT    /api/clientes/:id     → Actualizar cliente
 * DELETE /api/clientes/:id     → Eliminar cliente
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const express = require("express");
const router = express.Router();
const {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} = require("../controllers/clienteController");

router.get("/", obtenerClientes);
router.get("/:id", obtenerClientePorId);
router.post("/", crearCliente);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);

module.exports = router;