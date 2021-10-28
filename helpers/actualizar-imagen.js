const fs = require('fs');
const Usuario = require('../models/usuario');


const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // Borrar imagen
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo  ) => {


    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if ( !usuario ) {
                console.log('No se encontró usuario.');
                return false;
            }
            const pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo ); 

            // actualizar nueva imagen
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    
        default:
            break;
    }


}

module.exports = {
    actualizarImagen
}