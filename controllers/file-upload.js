const path = require('path');
const fs = require('fs');
var multer = require('multer');

const csvtojson = require("csvtojson");
const Contacto = require('../models/contacto');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const { dbConnection } = require('../database/config');
const { Contact } = require('./contacto');
// const contact = require('../models/contact');

const fileUpload = ( req, res = response, next  ) => {

    // const tipo = req.params.tipo;
    // const id   = req.params.id;

    // console.log('parámetros: ',tipo);

    var DIR = 'uploads/';
  
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, DIR);
      },
      filename: (req, file, cb) => {
        var temp_file_arr = file.originalname.split(".");
        var temp_file_name = temp_file_arr[0];
          var temp_file_extension = temp_file_arr[1];
        cb(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
        // cb(null, file.fieldname + '-' + Date.now())
      },
    
    });
    
    var upload = multer({
      storage: storage
    });
  
    // return upload.single('filename')(req, res, () => {
    //   console.log('File Uploaded successfully', req.file)
  
    //   if (!req.file) 
    //     return res.json({ error: ErrorMessages.invalidFiletype })
    //   next()
    // })
  
    upload.single('filename')(req, res, function (err) {
    
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('Error[0001]: ', err);
            return res.send({
                success: false
            });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log('Error[0002]: ', err);
            return res.send({
                  success: false
            });
        }
        // Everything went fine.
        console.log('File Uploaded Successfully...!! ', req.file);

        var ContactoArrray = [];
        csvtojson({trim:true})
            .fromFile(req.file.path)
            .then(csvData => {
               console.log("CSV FINAL: ",csvData);

            // Fetching the all data from each row
            for (var i = 0; i < csvData.length; i++) {
                var oneRow = {
                    firstName: csvData[i]['nombre'],
                    middleName: csvData[i]['segundo_nombre'],
                    lastName: csvData[i]['apellidos'],
                    position: csvData[i]['cargo'],
                    street_address: csvData[i]['calle_domicilio'],
                    number_address: csvData[i]['num_exterior_domicilio'],
                    cp_address: csvData[i]['cp_domicilio'],
                    city_address: csvData[i]['ciudad_domicilio'],
                    state_address: csvData[i]['estado_provincia_domicilio'],
                    country: csvData[i]['pais_domicilio'],
                    cellphone: csvData[i]['tel_celular_domicilio'],
                    officephone: csvData[i]['tel_oficina_domicilio'],
                    eMail: csvData[i]['email'],
                    id_owner: csvData[i]['id_propietario'],
                    avatar_url: csvData[i]['url_fotografia'],
                };
                ContactoArrray.push(oneRow);
            }
            console.log("Array Contacto: ",ContactoArrray);

            console.log("cbConnection: ",dbConnection);

            const result = Contacto.insertMany(ContactoArrray);

            // const contacts = new Contact;           
                
        //    console.log(contacts.getContacts());
 
            // inserting into the table “employees”
            // var collectionName = "contact";
            // var collection = dbConnection.collection(collectionName);
            // collection.insertMany(Contacto, (err, result) => {
            //     if (err) console.log(err);
            //     if(result){
            //         console.log("Import CSV into database successfully.");
            //     }
            // });               
        });

        return res.json({
            ok: true,
            msg: '¡Archivo cargado con éxito!',
            archivo: req.file.filename
        });
        // next();

    });

}



const saveCsv = ( req, res = response, next  ) => {

}

module.exports = {
    fileUpload,
    // retornaImagen
}
