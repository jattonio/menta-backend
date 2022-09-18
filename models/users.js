const  { Schema, model } = require('mongoose');


const userSchema = Schema ({

    username: {
        type: String,
        required: true
    },
    contact:[{
        email: {
            type: String,
            required: true,    
        }
    }],
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'ADMIN'
    },
    google: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true,
        default: 'A' //ACTIVE
    },
    dates_log: [{
        create_date: {
            type: Date,
            required: true,
            default: Date.now()
        },
        update_date: {
            type: Date,
            required: false
        },
        delete_date: {
            type: Date,
            required: false
        }
    }],
    token: {
        type: String,
        required: false
    }

});

userSchema.method('toJSON', function(){
    const { __v,_id, password, create_date, update_date, delete_date, status, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model( 'User', userSchema );