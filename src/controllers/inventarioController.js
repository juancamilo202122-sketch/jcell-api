/**
 * inventarioController.js
 * Controlador CRUD para el módulo de Inventario de JCELL.
 * Maneja las operaciones sobre la tabla inventario_partes.
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const db = require("../database");

// Obtener todas las partes del inventario
const obtenerPartes = async (req, res) => {
  try {
    const [partes] = await db.query("SELECT * FROM inventario_partes");
    res.status(200).json({ exito: true, datos: partes });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener inventario.", error: error.message });
  }
};

// Obtener una parte por ID
const obtenerPartePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [parte] = await db.query("SELECT * FROM inventario_partes WHERE id_parte = ?", [id]);
    if (parte.length === 0) {
      return res.status(404).json({ exito: false, mensaje: "Parte no encontrada." });
    }
    res.status(200).json({ exito: true, datos: parte[0] });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener la parte.", error: error.message });
  }
};

// Crear una nueva parte
const crearParte = async (req, res) => {
  try {
    const { nombre, precio, costo, stock } = req.body;

    // Validar campos obligatorios
    if (!nombre || precio === undefined || costo === undefined || stock === undefined) {
      return res.status(400).json({ exito: false, mensaje: "Nombre, precio, costo y stock son obligatorios." });
    }

    const [resultado] = await db.query(
      "INSERT INTO inventario_partes (nombre, precio, costo, stock) VALUES (?, ?, ?, ?)",
      [nombre, precio, costo, stock]
    );

    res.status(201).json({ exito: true, mensaje: "Parte creada exitosamente.", id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al crear la parte.", error: error.message });
  }
};

// Actualizar una parte existente
const actualizarParte = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, costo, stock } = req.body;

    const [resultado] = await db.query(
      "UPDATE inventario_partes SET nombre=?, precio=?, costo=?, stock=? WHERE id_parte=?",
      [nombre, precio, costo, stock, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Parte no encontrada." });
    }

    res.status(200).json({ exito: true, mensaje: "Parte actualizada exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al actualizar la parte.", error: error.message });
  }
};

// Eliminar una parte
const eliminarParte = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query("DELETE FROM inventario_partes WHERE id_parte = ?", [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Parte no encontrada." });
    }

    res.status(200).json({ exito: true, mensaje: "Parte eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al eliminar la parte.", error: error.message });
  }
};

module.exports = { obtenerPartes, obtenerPartePorId, crearParte, actualizarParte, eliminarParte };