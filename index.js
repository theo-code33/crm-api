require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 8080

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`)

app.get("/", (req, res) => {
    res.send('Api work')
})

app.get('/customers', (req, res) => {
    res.send('customers route')
})
app.get('/customer/:id', (req, res) => {
    const { id } = req.params
    res.send(`customer with id => ${id} `)
})

app.post('/customer', (req, res) => {
    res.send("post customer route")
})
app.put('/customer/:id', (req, res) => {
    const { id } = req.params
    res.send(`Update route to update customer with id => ${id}`)
})
app.delete('/customer/:id', (req, res) => {
    const { id } = req.params
    res.send(`Delete route to delete customer with id => ${id}`)
})
app.get('/invoices', (req, res) => {
    res.send('invoices route')
})
app.get('/invoice/:id', (req, res) => {
    const { id } = req.params
    res.send(`invoice with id => ${id} `)
})

app.post('/invoice', (req, res) => {
    res.send("post invoice route")
})
app.put('/invoice/:id', (req, res) => {
    const { id } = req.params
    res.send(`Update route to update invoice with id => ${id}`)
})
app.delete('/invoice/:id', (req, res) => {
    const { id } = req.params
    res.send(`Delete route to delete invoice with id => ${id}`)
})

app.listen(port, () => {
    console.log(`App listen on port ${port} ! URL => http://localhost:${port}`);
})