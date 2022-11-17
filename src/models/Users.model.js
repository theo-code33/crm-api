const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const UsersSchema = new mongoose.Schema({
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
const Users = mongoose.model("users", UsersSchema)

UsersSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

module.exports = Users