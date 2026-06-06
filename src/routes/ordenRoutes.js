/**
 * ordenRoutes.js
 * Define las rutas del módulo de Órdenes de Servicio de JCELL.
 *
 * GET    /api/ordenes          → Obtener todas las órdenes
 * GET    /api/ordenes/:id      → Obtener orden por ID
 * POST   /api/ordenes          → Crear nueva orden
 * PUT    /api/ordenes/:id      → Actualizar orden
 * DELETE /api/ordenes/:id      → Eliminar orden
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const express = require("express");
const router = express.Router();
const {
  obtenerOrdenes,
  obtenerOrdenPorId,
  crearOrden,
  actualizarOrden,
  eliminarOrden,
} = require("../controllers/ordenController");

router.get("/", obtenerOrdenes);
router.get("/:id", obtenerOrdenPorId);
router.post("/", crearOrden);
router.put("/:id", actualizarOrden);
router.delete("/:id", eliminarOrden);

module.exports = router;