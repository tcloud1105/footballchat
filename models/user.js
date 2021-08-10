const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username:{type:String,unique:true},
    fullname:{type:String,unique:true,default:''}, 
    email:{type:String,unique:true},
    password:{type:String,default:''},
    userImage:{type:String,unique:true,default:'default.png'},
    facebook:{type:String,default:''},
    fbTokens:Array,
    google:{type:String,default:''},
    sendRequest:[{
        username:{type:String,default:''}
    }],
    request: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        username:{type:String,default:''}
    }],
    friendsList:[{
        friendId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        friendName: {type:String,default:''}
    }],
    totalRequest:{type:Number, default:0}
    
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User",userSchema);