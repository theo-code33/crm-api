const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
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
const Customer = mongoose.model("customers", customerSchema)

module.exports = Customer