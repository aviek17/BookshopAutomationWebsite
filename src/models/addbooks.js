const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookid : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        required : true,
    },
    publisher : {
        type : String,
        required : true,
    },
    
    pages : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
})

const Book = new mongoose.model("BookCollection",bookSchema)

module.exports = Book