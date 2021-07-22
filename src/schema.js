const mongoose = require("mongoose");

const { Schema } = mongoose ;
var validator = require("email-validator");

const productsSchema = new Schema ({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    email: {
        type: String,
        minlength: 2,
        required: true
    },
    
    starred: {
        type: Boolean,
        default: false
    }
})

module.exports = productsSchema