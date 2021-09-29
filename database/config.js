
const mongoose = require('mongoose');

const dbConnection = async() => {


    try {
        
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log('Conexión con BD exitosa!');

    } catch ( err ) {
        console.error ( err );
        throw new Error( 'Error al conectarse con la BD' );
    }

}

module.exports = {
    dbConnection
}


