const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');

router.post('/register', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Por favor incluye un correo válido').isEmail(),
  check('password', 'La contraseña debe tener 6 o más caracteres').isLength({ min: 6 }),
], userController.register);

router.post('/login', [
  check('email', 'Por favor incluye un correo válido').isEmail(),
  check('password', 'La contraseña es requerida').exists(),
], userController.login);

module.exports = router;
