const mongoose = require('mongoose');


//User schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})
module.exports = User = mongoose.model('user', userSchema);