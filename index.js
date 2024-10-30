require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

var fs = require('fs');

// Crear servidor de Express
const app = express();

// Configurar Cors
app.use(cors());


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//   });

 
 
  // var DIR = 'uploads1/';
    
    
  // var storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, DIR);
  //   },
  //   filename: (req, file, cb) => {
  //     var temp_file_arr = file.originalname.split(".");
  //     var temp_file_name = temp_file_arr[0];
  //       var temp_file_extension = temp_file_arr[1];
  //     cb(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
  //     // cb(null, file.fieldname + '-' + Date.now())
  //   },
  
  // });
  
  // var upload = multer({
  //   storage: storage
  // }).single('filename')

  // upload = multer({
  //   storage: storage
  // });

  

// lectura y parseo del body
app.use( express.json() );

// Conexión a BD
dbConnection()
    .then( () => {
        console.log('¡Conexión Confirmada!');
    })
    .catch(() => {
        console.log('Error en Conexión de BBDD, consulte al Administrador.');
    });

// Directorio público
app.use( express.static('public') );



// Rutas
app.use('/api/usuario',require('./routes/usuarios'));
app.use('/api/signup',require('./routes/signup'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'));
app.use('/api/file-uploads',require('./routes/file-uploads'));
app.use('/api/contacto',require('./routes/contactos'));



// app.post('/api/file-uploads', upload.single('filename'), function (req, res) {
//   if (!req.file) {
//     console.log("No file is available!");
//     return res.send({
//       success: false
//     });
//   } else {
//     console.log('File is available!',req.file);
//     return res.send({
//       success: true
//     })
//   }
// });


// app.post('/api/file-uploads', function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       console.log('Error[0001]: ', err);
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       console.log('Error[0002]: ', err);
//     }
//     // Everything went fine.
//     console.log('File Uploaded Successfully...!! ', req.file);

//   })
// })



  // app.post('/api/file-uploads/', function (req, res) {
  //   // console.log(req);
   
  //   console.log('File is uploaded', req.file);
  //     res.end('File is uploaded');
  // });

app.listen( process.env.PORT, () => {
    console.log('Servidor de BKND corriendo en puerto ' + process.env.PORT );
} );
