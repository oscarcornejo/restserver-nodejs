const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// POST
router.post(
  '/login',
  [
    check('correo', 'El campo Correo es obligatorio').isEmail(),
    check('password', 'El campo Contraseña es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
