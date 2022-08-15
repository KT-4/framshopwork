const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{type:String,required:true,trim:true},
    lastname:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    // password_confirmation:{type:String,required:true,trim:true}
})

//user model

const UserModel = mongoose.model('user',userSchema)

module.exports = UserModel