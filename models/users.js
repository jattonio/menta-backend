const  { Schema, model } = require('mongoose');


const userSchema = Schema ({
    // acount_id: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    username: {
        firstname: {
            type: String,
            required: true
        },
        lastname:{
            type: String
        }
    },
    email: {
        type: String,
        required: true,    
    },
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
        default: 'Admin'
    },
    google: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'A' //ACTIVE
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
    },
    token: {
        type: String,
        required: false
    }

});

userSchema.method('toJSON', function(){
    const { __v,_id, password, dates_log, status, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model( 'User', userSchema );