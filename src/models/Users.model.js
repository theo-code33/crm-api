const mongoose = require('mongoose')
const Users = mongoose.model("users", 
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phoneNumber: Number,
        customers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "customers"
        }]
    })
)
module.exports = Users