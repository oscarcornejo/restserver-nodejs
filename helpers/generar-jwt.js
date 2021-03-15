const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
  return new Promise((resolve, recject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRET_TO_PRIVATE_KEY, { expiresIn: '4h' }, (err, token) => {
      if (err) {
        console.log(err);
        recject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generarJWT,
};
