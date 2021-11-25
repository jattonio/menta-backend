const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    // Leer Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Se requiere Token para continuar.'
        });
    }

    try {
        // Validar Token
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );        
        req.uid = uid;
        next();
        
    } catch (error) {
        // Token no válido
        console.log('Error:8000: ',error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
}

module.exports = {
    validarJWT
} 