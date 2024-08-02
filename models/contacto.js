const  { Schema, model } = require('mongoose');



const contactoSchema = Schema ({
    firstName: {
        type: String,
        required: true
    },    
    middleName: {
        type: String
    },
    lastName:{
        type: String
    },
    position:{
        type: String
    },
    street_address:{
        type: String
    },
    number_address:{
        type: String
    },
    cp_address:{
        type: String
    },
    city_address:{
        type: String
    },
    state_address:{
        type: String
    },
    country:{
        type: String
    },
    cellphone:{
        type: String
    },
    officephone:{
        type: String
    },
    email: {
        type: String
    },
    id_owner:{
        type:String
    },
    avatar: {
        type: String
    },
    status: {
        type: String,
        default: 'A' // {'A':Active, 'I':Inactive}
    },
    dates_log: {
        created_at: {
            type: Date,
            required: true,
            default: Date.now()
        },
        updated_at: {
            type: Date,
            required: false
        },
        deleted_at: {
            type: Date,
            required: false
        }
    }

});

contactoSchema.method('toJSON', function(){
    const { __v,_id, dates_log, status, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model( 'Contacto', contactoSchema );