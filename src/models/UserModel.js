const { Schema, model } = require('mongoose');

const UserModel = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:false,
    },
},{
 timestamps:true,    
})

module.exports = model('User', UserModel);