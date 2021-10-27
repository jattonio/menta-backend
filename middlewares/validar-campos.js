const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res = response, next ) => {

    const errores = validationResult(req);

    // Validación de existencia de email
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            error: errores.mapped()
        });
    }
    next(); 

}

module.exports = {
    validarCampos
}
