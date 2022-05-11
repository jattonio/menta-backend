
const mongoose = require('mongoose');

const dbConnection = async() => {


    try {
        
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log('Conexión con BD exitosa!');

    } catch ( err ) {
        // console.error ( err );
        const mnsjError = 'Error[00005]: NO SE PUDO ESTABLECER CONEXION CON LA BBDD.'; 
        console.error( mnsjError );
        throw new Error( mnsjError );
    }

}

module.exports = {
    dbConnection
}


