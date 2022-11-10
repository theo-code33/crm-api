require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const models = require('./models')
const Customer = models.customer
const Invoice = models.invoice
const port = process.env.PORT || 8080

app.use(express.json())

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`)

app.get("/", (req, res) => {
    res.send('Api work')
})

app.get('/customers', (req, res) => {
    customer.find({}, (err, customers) => {
        if(err) throw err
        res.send(customers)
    })
})
app.get('/customer/:id', (req, res) => {
    const { id } = req.params
    customer.findById(id, (err, customer) => {
        if(err) throw err
        res.send(customer)
    })
})

app.post('/customer', (req, res) => {
    const newCustomer = new customer(req.body)
    newCustomer.save()
        .then((dataDb) => {
            res.send(dataDb)
        })
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