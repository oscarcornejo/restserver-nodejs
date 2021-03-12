const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');
const { isRolValid, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

// GET
router.get('/', usuariosGet);

// POST
router.post(
  '/',
  [
    check('nombre', 'El campo Nombre es obligatorio').not().isEmpty(),
    check('password', 'La campo Contraseña debe ser más de 6 caracteres').isLength({ min: 6 }),
    // check('correo', 'El campo Correo ingresado no es válido').isEmail(),
    check('correo').custom(existeEmail),
    // check('rol', 'El campo Rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom((rol) => isRolValid(rol)),
    check('rol').custom(isRolValid),
    validarCampos,
  ],
  usuariosPost
);

// PUT
router.put(
  '/:id',
  [check('id', 'No es un ID válido').isMongoId(), check('id').custom(existeUsuarioPorId), check('rol').custom(isRolValid), validarCampos],
  usuariosPut
);

// PATCH
router.patch('/', usuariosPatch);

// DELETE
router.delete('/:id', [check('id', 'No es un ID válido').isMongoId(), check('id').custom(existeUsuarioPorId), validarCampos], usuariosDelete);

module.exports = router;
