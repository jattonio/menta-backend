const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const User = require('../models/users');
const { generarJWT } = require('../helpers/jwt');




const signup = async( req, res = response ) => {

    const { username, email, password  } = req.body;

    console.log("Entrando a Signup Component");

    console.log(email);

    try {
        // Validar si existe el usuario a registrar
        const userExist = await User.findOne({ email:email, status:'A' });

        console.log(userExist);

        if ( userExist ) {
            // Usuario/email ya está registrado
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya está registrado. Intenta con otro.'
            });
        }

        const user = new User( req.body );

        console.log(user);

        // Encriptar contraseña
         const salt = bcrypt.genSaltSync();
         user.password = bcrypt.hashSync( password, salt );

        // Crear usuario
        await user.save();

        // Generar Token JWT
        const token = await generarJWT( user.id );

        // Respuesta de registro insertado
        res.json({
            ok: true,
            user,
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


module.exports = {
    signup
}