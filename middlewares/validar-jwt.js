const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    // Leer Token
    const token = req.header('x-token');   
    console.log('...VALIDANDO JWT');

    if ( !token ) {
        console.log('NO EXISTE TOKEN. Acceso no Autorizado');
        return res.status(401).json({
            ok: false,
            msg: 'Acceso no Autorizado'
        });
    }

    try {
        // console.log('VALIDANDO TOKEN..');
        // Validar Token
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );        
        req.uid = uid;
        console.log('   ..Token OK');
        next();
        
    } catch (error) {
        console.log('   ..TOKEN NO VÁLIDO. Acceso no Autorizado');
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