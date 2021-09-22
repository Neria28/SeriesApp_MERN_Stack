const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fullName:{type:String , required:true},
    userName:{type:String , required:true},
    pwd:{type:String , required:true},
})

module.exports=mongoose.model('users' , usersSchema)