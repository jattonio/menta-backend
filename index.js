require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor de Express
const app = express();

// Configurar Cors
app.use(cors())

// Conexión a BD
dbConnection(); 

// Rutas
app.get('/', ( req, res ) => {

    res.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    });

});

app.listen( process.env.PORT, () => {
    console.log('Servidor de BKND corriendo en puerto ' + process.env.PORT );
} );


