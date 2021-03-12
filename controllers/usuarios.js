const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = 'No Name', apiKey, page = 0, limit } = req.query; // REFERENCIA DE EJEMPLO
  const { limit = 5, desde = 0 } = req.query;

  // const usuarios = await Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limit));
  // const total = await Usuario.countDocuments({ estado: true });

  // const resp = await Promise.all([Usuario.countDocuments({ estado: true }), Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limit))]);
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limit)),
  ]);

  res.json({
    total,
    usuarios,
    // resp,
  });
};

const usuariosPost = async (req, res = response) => {
  //   const body = req.body;
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //   Verificar si el Correo existe
  // const isEmail = await Usuario.findOne({ correo: correo });
  // if (isEmail) {
  //   return res.status(400).json({
  //     msg: 'El correo ingresado ya existe',
  //   });
  // }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.json({ usuario });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // ENCRIPTAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'PATCH API - Controller',
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // Eliminar físicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  // Cambiar estado del usuario
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
