const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async( req, res ) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email rol google img')
            .skip( desde )
            .limit( 5 ),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        total,
        usuarios
    });

}

const crearUsuario = async( req, res = response ) => {

    const { nombre, email, password  } = req.body;

    try {
        // Validar si existe el usuario a registrar
        const existeUsuario = await Usuario.findOne({ email:email });

        if ( existeUsuario ) {
            // Usuario/email ya está registrado
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya está registrado. Intenta con otro.'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
         const salt = bcrypt.genSaltSync();
         usuario.password = bcrypt.hashSync( password, salt );

        // Crear usuario
        await usuario.save();

        // Generar Token JWT
        const token = await generarJWT( usuario.id );


    
        // Respuesta de registro insertado
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        // Error inesperado
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }


}


const signup = async( req, res = response ) => {

    const { nombre, email, password  } = req.body;

    try {
        // Validar si existe el usuario a registrar
        const existeUsuario = await Usuario.findOne({ email:email });

        if ( existeUsuario ) {
            // Usuario/email ya está registrado
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya está registrado. Intenta con otro.'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
         const salt = bcrypt.genSaltSync();
         usuario.password = bcrypt.hashSync( password, salt );

        // Crear usuario
        await usuario.save();

        // Generar Token JWT
        const token = await generarJWT( usuario.id );

        // Respuesta de registro insertado
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        // Error inesperado
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }


}

const actualizarUsuario = async( req, res = response ) => { 

    // TODO: Validar token y comprobar si es usuario correcto

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findOne({ uid });

        if ( !usuarioDB ) {
            res.status(404).json({
                ok: false,
                msg: 'No existe usuario'
            });
        }

        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email != email ) {
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe usuario con ese email.'
                });
            }
        }

        campos.email = email; 

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )
        
    
        
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const borrarUsuario = async( req, res = response ) => { 

    try {

        const usuarioDB = await Usuario.findOne({ uid });

        if ( !usuarioDB ) {
            res.status(404).json({
                ok: false,
                msg: 'No existe usuario'
            });
        }

        Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario borrado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: error
        });
    }

}


module.exports = {
    getUsuarios,
    crearUsuario,
    signup,
    actualizarUsuario,
    borrarUsuario
}