require('dotenv').config()
const mongoose = require('mongoose')
const connect = async () => {
    mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`)
    const db = mongoose.connection
    db.once('open', () => console.log('MongoDB running'))
    db.on('error', (err) => console.error(err))
}
module.exports = connect