/*
    ruta: '/api/signup'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { signup } = require('../controllers/signup');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', 
            [
                check('username', 'El nombre es obligatorio.').not().isEmpty(),
                check('password', 'El password es obligatorio.').not().isEmpty(),
                check('email', 'El email es obligatorio.').isEmail(),
                validarCampos
            ],
            signup 
);


module.exports = router;