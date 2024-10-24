const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    // Leer Token
    const token = req.header('x-token') || '';   
    console.log('[VALIDARJWT]: Iniciando], ', token);

    if ( !token ) {
        console.log('[VALIDARJWT][JWT0001] NO EXISTE TOKEN. Acceso no Autorizado ');
        return res.status(401).json({
            ok: false,
            msg: 'Acceso no Autorizado [JWT0001]'
        });
    }

    try {
        // console.log('VALIDANDO TOKEN..');
        // Validar Token
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );        
        req.uid = uid;
        console.log('[VALIDARJWT][JWT0002].Token OK');
        next();
        
    } catch (error) {
        console.log('[VALIDARJWT][JWT0003]Token NO VÁLIDO. Acceso no Autorizado',error);
        // Token no válido
        return res.status(401).json({
            ok: false,
            msg: '[VALIDARJWT][JWT0004] Acceso no Autorizado'
        });
    }
}

module.exports = {
    validarJWT
} 