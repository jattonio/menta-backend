const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    // Leer Token
    const token = req.header('x-token');   
    console.log('HEADERS BKND', token);

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Acceso no Autorizado'
        });
    }

    try {
        // Validar Token
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );        
        req.uid = uid;
        next();
        
    } catch (error) {
        // Token no válido
        return res.status(401).json({
            ok: false,
            msg: 'Acceso no Autorizado'
        });
    }
}

module.exports = {
    validarJWT
} 