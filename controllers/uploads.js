const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = ( req, res = response  ) => {


    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tiposValidos = ['usuarios'];

    if ( !tiposValidos.includes(tipo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo es inválido '
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe archivo'
        });
    }

    // Procesar imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extensión
    const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ];

    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida.'
        });
    }

    // Generar nombre del archivo 
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar archivo
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path, (err) => {
        if (err){
            console.log( err );
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen. '
            });
        }
    
    // Actualizar BBDD
    actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido.',
            nombreArchivo
        });
    });
}



const retornaImagen = ( req, res = response ) => {
    const tipo = req.params.tipo;
    const avatar  = req.params.avatar;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ avatar }` );

    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/noimage.jpg` );
        res.sendFile( pathImg );
    }
}


module.exports = {
    fileUpload,
    retornaImagen
}
