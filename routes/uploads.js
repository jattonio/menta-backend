/*
    ruta: '/api/uploads'
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );

router.post( '/:tipo/:id', validarJWT, fileUpload );

router.get( '/:tipo/:img', retornaImagen );

module.exports = router;