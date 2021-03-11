const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'No Name', apiKey, page = 0, limit } = req.query;

  res.json({
    msg: 'GET API - Controller',
    q,
    nombre,
    apiKey,
    page,
    limit,
  });
};

const usuariosPost = (req, res = response) => {
  //   const body = req.body;
  const { nombre, edad } = req.body;

  res.json({
    msg: 'POST API - Controller',
    // body,
    nombre,
    edad,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'PUT API - Controller',
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'PATCH API - Controller',
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'DELETE API - Controller',
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
