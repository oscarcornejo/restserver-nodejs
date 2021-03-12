const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isRolValid = async (rol = '') => {
  const isRol = await Role.findOne({ rol });

  if (!isRol) {
    throw new Error(`El rol ingresado: ${rol} no esta registrado en la Base de Datos`);
  }
};

const existeEmail = async (correo = '') => {
  const isEmail = await Usuario.findOne({ correo: correo });

  if (isEmail) {
    throw new Error(`El correo ingresado: ${correo} ya esta registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const isUserId = await Usuario.findById(id);

  if (!isUserId) {
    throw new Error(`El id ingresado: ${id} no existe`);
  }
};

module.exports = {
  isRolValid,
  existeEmail,
  existeUsuarioPorId,
};
