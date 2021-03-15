const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero',
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede realizar esta acción`,
    });
  }

  next();
};

const isRole = (...resto) => {
  return (req, res = response, next) => {
    // console.log(resto);
    // console.log(req.usuario.rol);

    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero',
      });
    }

    if (!resto.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${resto}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  isRole,
};
