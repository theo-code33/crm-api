const mongoose = require("mongoose");

const Invoice = mongoose.model("invoices",
    new mongoose.Schema({
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customers"
        },
        sendingAt: Date,
        status: String,
        amount: Number
    })
)

module.exports = Invoice