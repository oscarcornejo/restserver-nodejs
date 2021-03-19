const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/auth');
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

// POST - GOOGLE
router.post('/google', [check('id_token', 'El id_token es necesario').not().isEmpty(), validarCampos], googleSignin);

module.exports = router;
