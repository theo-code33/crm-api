const mongoose = require('mongoose')
const Users = mongoose.model("users", 
    new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            min: 2
        },
        lastName: {
            type: String,
            required: true,
            min: 2
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        phoneNumber: Number,
        customers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "customers"
        }]
    })
)
module.exports = Users