require('dotenv').config()
const express = require("express")
const app = express()
const morgan = require('morgan')
const customerRouter = require('./src/routers/customer.router')
const invoiceRouter = require('./src/routers/invoice.router')
const connect = require('./config/mongoose.config')

const port = process.env.PORT || 8080

// MIDDELWARE

app.use(express.json())
app.use(morgan("dev"))
app.use("/api", customerRouter)
app.use("/api", invoiceRouter)

connect()

app.get("/", (req, res) => {
    res.send('Api work')
})

app.listen(port, () => {
    console.log(`App listen on port ${port} ! URL => http://localhost:${port}`);
})