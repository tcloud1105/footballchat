const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{type:String,unique:true},
    fullname:{type:String,unique:true,default:''}, 
    email:{type:String,unique:true},
    password:{type:string,default:''},
    userImage:{type:String,unique:true,default:'default.png'},
    facebook:{type:String,default:''},
    fbTokens:Array,
    google:{type:String,default:''},
    googleTokens:Array,
    
});

module.exports = mongoose.module("User",userSchema);