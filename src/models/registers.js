const mongoose = require("mongoose");

const user = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    gender : {
        type : String,
        required : true,
    },
    phone :{
        type : Number,
        required : true,
        unique : true,
    },
    age : {
        type : Number,
        rquired : true,
    },
    password : {
        type : String,
        required : true,
    },
    confirmpassword : {
        type : String,
        required : true,
    },
    person : {
        type : String,
        required : true,
    }
})


const Register = new mongoose.model("Register", user)

module.exports = Register