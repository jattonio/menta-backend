const { response } = require('express');
// const bcrypt = require('bcryptjs');

const Contact = require('../models/contacto');
const { generarJWT } = require('../helpers/jwt');


const getContactos = async( req, res ) => {

    // const desde = Number(req.query.desde) || 0;

    const [ contacts, total ] = await Promise.all([ 
        Contact
            .find({}, 'firstName lastName cellphone email')
            // .skip( desde )
            .limit( 5 ),
        Contact.countDocuments()
    ]);

    console.log("getContacto",contacts);



    res.json({
        ok: true,
        total,
        contacts
    });

}

module.exports = {
    getContactos
}