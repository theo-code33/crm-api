const mongoose = require("mongoose");

const Invoice = mongoose.model("invoices",
    new mongoose.Schema({
        name: String,
    })
)

module.exports = Invoice