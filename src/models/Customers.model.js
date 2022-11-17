const mongoose = require("mongoose")
const Customer = mongoose.model("customers", 
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        company: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        invoices: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "invoices"
        }]
    })
)

module.exports = Customer