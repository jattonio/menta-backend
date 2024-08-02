/*
    ruta: '/api/file-uploads'
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
// const expressFileUpload = require('express-fileupload');

const { fileUpload } = require('../controllers/file-upload');
// const { cargarMulter } = require('../middlewares/cargar-multer');

const router = Router();



router.post('/', fileUpload );
// router.post('/:tipo/:id', validarJWT, fileUpload );

// router.get( '/:tipo/:img', retornaImagen );

module.exports = router;