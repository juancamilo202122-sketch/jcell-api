/**
 * tecnicoRoutes.js
 * Define las rutas del módulo de Técnicos de JCELL.
 *
 * GET    /api/tecnicos         → Obtener todos los técnicos
 * GET    /api/tecnicos/:id     → Obtener técnico por ID
 * POST   /api/tecnicos         → Crear nuevo técnico
 * PUT    /api/tecnicos/:id     → Actualizar técnico
 * DELETE /api/tecnicos/:id     → Eliminar técnico
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const express = require("express");
const router = express.Router();
const {
  obtenerTecnicos,
  obtenerTecnicoPorId,
  crearTecnico,
  actualizarTecnico,
  eliminarTecnico,
} = require("../controllers/tecnicoController");

router.get("/", obtenerTecnicos);
router.get("/:id", obtenerTecnicoPorId);
router.post("/", crearTecnico);
router.put("/:id", actualizarTecnico);
router.delete("/:id", eliminarTecnico);

module.exports = router;