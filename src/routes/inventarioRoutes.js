/**
 * inventarioRoutes.js
 * Define las rutas del módulo de Inventario de JCELL.
 *
 * GET    /api/inventario       → Obtener todas las partes
 * GET    /api/inventario/:id   → Obtener parte por ID
 * POST   /api/inventario       → Crear nueva parte
 * PUT    /api/inventario/:id   → Actualizar parte
 * DELETE /api/inventario/:id   → Eliminar parte
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const express = require("express");
const router = express.Router();
const {
  obtenerPartes,
  obtenerPartePorId,
  crearParte,
  actualizarParte,
  eliminarParte,
} = require("../controllers/inventarioController");

router.get("/", obtenerPartes);
router.get("/:id", obtenerPartePorId);
router.post("/", crearParte);
router.put("/:id", actualizarParte);
router.delete("/:id", eliminarParte);

module.exports = router;