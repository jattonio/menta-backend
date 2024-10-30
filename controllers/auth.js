const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email, status:'A' });

        console.log('LOGIN CON USER: ' + user);

        // Verificar email
        if ( !user ) {
            console.log("Usuario NO existe");
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o email no válidos. '
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            console.log("Contraseña no coincide");
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o email no válidos. '
            });
        }

        // Generar Token JWT
        const token = await generarJWT( user.id );
        // user.token = token;

        res.json({
            ok: true,
            token,
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el Administrador.'
        });
    }

}

const googleSignIn = async ( req, res = response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await User.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // Si no existe el usuario
            usuario = new User({
                nombre: name,
                email,
                password: '@@@',
                avatar: picture,
                google: true
            });
        } else {
            // Existe usuario
            usuario =  usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
            usuario.avatar = picture;
        }

        // Guardar en BBDD
        await usuario.save();

        // Generar Token JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no válido' 
        });
        
    }

}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    console.log('[RENEWTOKEN]: Inicando.. [UID]: ', uid);

    const token = await generarJWT( uid );

    console.log("[RENEWTOKEN]: Token renovado ", token);

    // Obtener usuario UID 
    const usuario = await User.findById( uid );

    console.log("[RENEWTOKEN]: Usuario: ", usuario);

    res.json({
        ok: true,
        token,
        usuario
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}

