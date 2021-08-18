const mongoose = require('mongoose')

var groupMessage = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    body: {type: String},
    name: {type: String},
    userImage: {type: String, default:'defaultPic.png'},
    createAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('GroupMessage',groupMessage)