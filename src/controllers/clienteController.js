/**
 * clienteController.js
 * Controlador CRUD para el módulo de Clientes de JCELL.
 * Maneja las operaciones: listar, buscar, crear, actualizar y eliminar clientes.
 *
 * @author  Camilo
 * @version 1.0
 * @project JCELL API
 */

const db = require("../database");

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
  try {
    const [clientes] = await db.query("SELECT * FROM cliente");
    res.status(200).json({ exito: true, datos: clientes });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener clientes.", error: error.message });
  }
};

// Obtener un cliente por ID
const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [cliente] = await db.query("SELECT * FROM cliente WHERE id = ?", [id]);
    if (cliente.length === 0) {
      return res.status(404).json({ exito: false, mensaje: "Cliente no encontrado." });
    }
    res.status(200).json({ exito: true, datos: cliente[0] });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener el cliente.", error: error.message });
  }
};

// Crear un nuevo cliente
const crearCliente = async (req, res) => {
  try {
    const { nombre, apellido, telefono, correo, direccion } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !telefono || !correo) {
      return res.status(400).json({ exito: false, mensaje: "Nombre, apellido, teléfono y correo son obligatorios." });
    }

    const [resultado] = await db.query(
      "INSERT INTO cliente (nombre, apellido, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, telefono, correo, direccion]
    );

    res.status(201).json({ exito: true, mensaje: "Cliente creado exitosamente.", id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al crear el cliente.", error: error.message });
  }
};

// Actualizar un cliente existente
const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, telefono, correo, direccion } = req.body;

    const [resultado] = await db.query(
      "UPDATE cliente SET nombre=?, apellido=?, telefono=?, correo=?, direccion=? WHERE id=?",
      [nombre, apellido, telefono, correo, direccion, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Cliente no encontrado." });
    }

    res.status(200).json({ exito: true, mensaje: "Cliente actualizado exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al actualizar el cliente.", error: error.message });
  }
};

// Eliminar un cliente
const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query("DELETE FROM cliente WHERE id = ?", [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ exito: false, mensaje: "Cliente no encontrado." });
    }

    res.status(200).json({ exito: true, mensaje: "Cliente eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al eliminar el cliente.", error: error.message });
  }
};

module.exports = { obtenerClientes, obtenerClientePorId, crearCliente, actualizarCliente, eliminarCliente };