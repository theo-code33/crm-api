require('dotenv').config()
const express = require("express")
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const customerRouter = require('./src/routers/customer.router')
const invoiceRouter = require('./src/routers/invoice.router')
const usersRouter = require("./src/routers/users.router")
const connect = require('./config/mongoose.config')

const port = process.env.PORT || 8080

// MIDDELWARE

app.use(express.json())
app.use(morgan("dev"))
app.use(cors("*"))
app.use("/api", customerRouter)
app.use("/api", invoiceRouter)
app.use("/api", usersRouter)

connect()

app.get("/", (req, res) => {
    res.send('Api work')
})

app.listen(port, () => {
    console.log(`App listen on port ${port} ! URL => http://localhost:${port}`);
})