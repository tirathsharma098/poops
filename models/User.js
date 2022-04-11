const mongoose = require('mongoose');
const {Schema , model} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = Schema({
    fullName : {
        type : String,
        required : true
    },
    userAddress : {
        country : String,
        state : String,
        city : String,
        street : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = model('User', userSchema)