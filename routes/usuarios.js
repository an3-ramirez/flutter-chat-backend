/**
 * path: api/login
 */

const { Router} = require('express');
const { getUsuarios } = require('../controllers/usuarios');
 
const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = Router();
 
router.get('/', validarJWT, getUsuarios);
 
module.exports = router;