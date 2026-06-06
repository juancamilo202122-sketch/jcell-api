/**
 * tecnicoController.js
 * Controlador CRUD para el módulo de Técnicos de JCELL.
 * Maneja las operaciones: listar, buscar, crear, actualizar y eliminar técnicos.
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const db = require("../database");

// Obtener todos los técnicos
const obtenerTecnicos = async (req, res) => {
  try {
    const [tecnicos] = await db.query("SELECT * FROM tecnico");
    res.status(200).json({ exito: true, datos: tecnicos });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener técnicos.", error: error.message });
  }
};

// Obtener un técnico por ID
const obtenerTecnicoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [tecnico] = await db.query("SELECT * FROM tecnico WHERE id_tecnico = ?", [id]);
    if (tecnico.length === 0) {
      return res.status(404).json({ exito: false, mensaje: "Técnico no encontrado." });
    }
    res.status(200).json({ exito: true, datos: tecnico[0] });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener el técnico.", error: error.message });
  }
};

// Crear un nuevo técnico
const crearTecnico = async (req, res) => {
  try {
    const { nombre, trabajo_realizado, costo_final } = req.body;

    // Validar campos obligatorios
    if (!nombre) {
      return res.status(400).json({ exito: false, mensaje: "El nombre del técnico es obligatorio." });
    }

    const [resultado] = await db.query(
      "INSERT INTO tecnico (nombre, trabajo_realizado, costo_final) VALUES (?, ?, ?)",
      [nombre, trabajo_realizado, costo_final]
    );

    res.status(201).json({ exito: true, mensaje: "Técnico creado exitosamente.", id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al crear el técnico.", error: error.message });
  }
};

// Actualizar un técnico existente
const actualizarTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, trabajo_realizado, costo_final } = req.body;

    const [resultado] = await db.query(
      "UPDATE tecnico SET nombre=?, trabajo_realizado=?, costo_final=? WHERE id_tecnico=?",
      [nombre, trabajo_realizado, costo_final, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Técnico no encontrado." });
    }

    res.status(200).json({ exito: true, mensaje: "Técnico actualizado exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al actualizar el técnico.", error: error.message });
  }
};

// Eliminar un técnico
const eliminarTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query("DELETE FROM tecnico WHERE id_tecnico = ?", [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Técnico no encontrado." });
    }

    res.status(200).json({ exito: true, mensaje: "Técnico eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al eliminar el técnico.", error: error.message });
  }
};

module.exports = { obtenerTecnicos, obtenerTecnicoPorId, crearTecnico, actualizarTecnico, eliminarTecnico };