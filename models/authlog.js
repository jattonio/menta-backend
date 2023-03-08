const  { Schema, model } = require('mongoose');
const { schema } = require('./usuario');


const authLogSchema = Schema ({
    // acount_id: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    user: {
        type: Schema.objectId,
        ref:"User",
        required: true,    
    }
});

authLogSchema.method('toJSON', function(){
    const { __v,_id, ...object } = this.toObject();
    //object.uid = _id;
    return object;
});

module.exports = model( 'AuthLog', userSchema );