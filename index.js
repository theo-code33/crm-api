require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const models = require('./models')
const Customer = models.Customer
const Invoice = models.Invoice
const port = process.env.PORT || 8080

app.use(express.json())

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`)
const db = mongoose.connection
db.once('open', () => console.log('MongoDB running'))
db.on('error', (err) => console.error(err))

app.get("/", (req, res) => {
    res.send('Api work')
})

app.get('/customers', (req, res) => {
    Customer.find({})
        .populate("invoices")
        .exec((err, customers) => {
            if(err) throw err
            res.send(customers)
        })
})
app.get('/customer/:id', (req, res) => {
    const { id } = req.params
    Customer.findById(id, (err, customer) => {
        if(err) throw err
        if(!customer) return res.status(404).send('Customer not found')
        res.send(customer)
    })
})

app.post('/customer', (req, res) => {
    const newCustomer = new Customer(req.body)
    newCustomer.save()
        .then((dataDb) => res.send(dataDb))
        .catch((err) => res.status(500).send(err))
})
app.put('/customer/:id', (req, res) => {
    const { id } = req.params
    Customer.findByIdAndUpdate( id, req.body, (err, customer) => {
        if(err) throw err
        if(!customer) return res.status(404).send('Customer not found')
        res.send(customer)
    })
})
app.delete('/customer/:id', (req, res) => {
    const { id } = req.params
    Customer.findByIdAndDelete(id , (err, customer) => {
        if(err) throw err
        if(!customer) return res.status(404).send('Customer not found')
        res.send("Customer deleted => " + customer)
    })
})
app.get('/invoices', (req, res) => {
    Invoice.find({})
        .populate("customer")
        .exec((err, invoices) => {
            if(err) throw err
            res.send(invoices)
        })
})
app.get('/invoice/:id', (req, res) => {
    const { id } = req.params
    Invoice.findById(id)
        .populate("customer")
        .exec((err, invoice) => {
            if(err) throw err
            if(!invoice) return res.status(404).send("Invoice not found")
            res.send(invoice)
        })
})
app.post('/invoice', (req, res) => {
    Customer.findById(req.body.customer, (err, customer) => {
        if(err) throw err
        if(!customer) return res.status(404).send("Customer not found")
        new Invoice(req.body)
            .save()
            .then(invoice => {
                customer.update(
                    {
                        $push: {"invoices": invoice._id }
                    },
                    (err, customer) => {
                        if(err) throw err
                        res.send(invoice)
                    }
                )
            })
            .catch(err => res.status(500).send(err))
    })
})
app.put('/invoice/:id', (req, res) => {
    const { id } = req.params
    Invoice.findByIdAndUpdate(id, req.body, (err, invoice) => {
        if(err) throw err
        if(!invoice) return res.status(404).send("Invoice not found")
        res.send(invoice)
    })
})
app.delete('/invoice/:id', (req, res) => {
    const { id } = req.params
    Invoice.findByIdAndDelete(id, (err, invoice) => {
        if(err) throw err
        if(!invoice) return res.status(404).send('Invoice not found')
        res.send("Invoice deleted => " + invoice)
    })
})

app.listen(port, () => {
    console.log(`App listen on port ${port} ! URL => http://localhost:${port}`);
})