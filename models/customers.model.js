const mongoose = require("mongoose")
const Customer = mongoose.model("customers", 
    new mongoose.Schema({
        firstName: String,
        lastName: String
    })
)

module.exports = Customer