require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor de Express
const app = express();

// Configurar Cors
app.use(cors());

// lectura y parseo del body
app.use( express.json() );

// Conexión a BD
dbConnection(); 

// Directorio público
app.use( express.static('public') );

// Rutas
app.use('/api/usuario',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'));

// app.get('/api/usuario', ( req, res ) => {

//     res.status(400).json({
//         ok: true,
//         usuarios: [{
//             id: 123,
//             nombre: 'Antonio'
//         }]
//     });

// });

app.listen( process.env.PORT, () => {
    console.log('Servidor de BKND corriendo en puerto ' + process.env.PORT );
} );


