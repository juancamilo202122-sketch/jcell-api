/**
 * ordenController.js
 * Controlador CRUD para el módulo de Órdenes de Servicio de JCELL.
 * Maneja las operaciones sobre la tabla orden_servicio.
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const db = require("../database");

// Obtener todas las órdenes de servicio
const obtenerOrdenes = async (req, res) => {
  try {
    const [ordenes] = await db.query(`
      SELECT os.*, 
        c.nombre AS nombre_cliente, c.apellido AS apellido_cliente,
        t.nombre AS nombre_tecnico,
        e.nombre_estado AS estado,
        eq.marca, eq.modelo
      FROM orden_servicio os
      JOIN cliente c ON os.id_cliente = c.id
      JOIN tecnico t ON os.id_tecnico = t.id_tecnico
      JOIN estado e ON os.id_estado = e.id_estado
      JOIN equipo eq ON os.id_equipo = eq.id_equipo
    `);
    res.status(200).json({ exito: true, datos: ordenes });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener órdenes.", error: error.message });
  }
};

// Obtener una orden por ID
const obtenerOrdenPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [orden] = await db.query(`
      SELECT os.*, 
        c.nombre AS nombre_cliente, c.apellido AS apellido_cliente,
        t.nombre AS nombre_tecnico,
        e.nombre_estado AS estado,
        eq.marca, eq.modelo
      FROM orden_servicio os
      JOIN cliente c ON os.id_cliente = c.id
      JOIN tecnico t ON os.id_tecnico = t.id_tecnico
      JOIN estado e ON os.id_estado = e.id_estado
      JOIN equipo eq ON os.id_equipo = eq.id_equipo
      WHERE os.id_orden = ?
    `, [id]);

    if (orden.length === 0) {
      return res.status(404).json({ exito: false, mensaje: "Orden no encontrada." });
    }
    res.status(200).json({ exito: true, datos: orden[0] });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener la orden.", error: error.message });
  }
};

// Crear una nueva orden de servicio
const crearOrden = async (req, res) => {
  try {
    const { fecha_ingreso, descripcion_falla, costo_estimado, id_cliente, id_equipo, id_tecnico, id_estado } = req.body;

    // Validar campos obligatorios
    if (!fecha_ingreso || !descripcion_falla || !id_cliente || !id_equipo || !id_tecnico || !id_estado) {
      return res.status(400).json({ exito: false, mensaje: "Todos los campos son obligatorios." });
    }

    const [resultado] = await db.query(
      `INSERT INTO orden_servicio 
        (fecha_ingreso, descripcion_falla, costo_estimado, id_cliente, id_equipo, id_tecnico, id_estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fecha_ingreso, descripcion_falla, costo_estimado, id_cliente, id_equipo, id_tecnico, id_estado]
    );

    res.status(201).json({ exito: true, mensaje: "Orden creada exitosamente.", id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al crear la orden.", error: error.message });
  }
};

// Actualizar una orden existente
const actualizarOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_ingreso, descripcion_falla, costo_estimado, id_cliente, id_equipo, id_tecnico, id_estado } = req.body;

    const [resultado] = await db.query(
      `UPDATE orden_servicio SET 
        fecha_ingreso=?, descripcion_falla=?, costo_estimado=?,
        id_cliente=?, id_equipo=?, id_tecnico=?, id_estado=?
       WHERE id_orden=?`,
      [fecha_ingreso, descripcion_falla, costo_estimado, id_cliente, id_equipo, id_tecnico, id_estado, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Orden no encontrada." });
    }

    res.status(200).json({ exito: true, mensaje: "Orden actualizada exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al actualizar la orden.", error: error.message });
  }
};

// Eliminar una orden
const eliminarOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query("DELETE FROM orden_servicio WHERE id_orden = ?", [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Orden no encontrada." });
    }

    res.status(200).json({ exito: true, mensaje: "Orden eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al eliminar la orden.", error: error.message });
  }
};

module.exports = { obtenerOrdenes, obtenerOrdenPorId, crearOrden, actualizarOrden, eliminarOrden };
