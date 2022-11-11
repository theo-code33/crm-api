const mongoose = require("mongoose")
const Customer = mongoose.model("customers", 
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        company: String,
        invoices: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "invoices"
        }]
    })
)

module.exports = Customer