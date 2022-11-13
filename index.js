// INIT CONSTANT

require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const models = require('./models')
const Customer = models.Customer
const Invoice = models.Invoice
const port = process.env.PORT || 8080

// MIDDELWARE

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`)
const db = mongoose.connection
db.once('open', () => console.log('MongoDB running'))
db.on('error', (err) => console.error(err))

app.get("/", (req, res) => {
    res.send('Api work')
})

// ROUTES CUSTOMERS

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
        customer.invoices.map(invoice => {
            Invoice.findByIdAndDelete(invoice._id, (err, invoice) => {
                if(err) throw err
                res.send("Customer deleted => " + customer)
            })
        })
    })
})

// ROUTES INVOICES

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
                customer.updateOne(
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
    if(req.body.customer){
        Customer.findById(req.body.customer, (err, customer) => {
            if(err) throw err
            if(!customer) return res.status(404).send('Customer not found')
            Invoice.findById(id)
                .then(invoice => {
                    const lastCustomer = invoice.customer
                    invoice.updateOne(req.body, (err, invoiceUpdate) => {
                        if(err) throw err
                        customer.updateOne({
                            $push: {"invoices": invoice._id}
                        }, (err, newCustomer) => {
                            if(err) throw err
                            Customer.findByIdAndUpdate(lastCustomer, {
                                $pull: {"invoices": invoice._id}
                            }, (err, customer) => {
                                if(err) throw err
                                res.send(invoiceUpdate)
                            })
                        })
                    })
                })
                .catch(err => res.status(500).send(err))
        })
    }else{
        Invoice.findByIdAndUpdate(id, req.body, (err, invoice) => {
            if(err) throw err
            if(!invoice) return res.status(404).send("Invoice not found")
            res.send(invoice)
        })
    }
})
app.delete('/invoice/:id', (req, res) => {
    const { id } = req.params
    Invoice.findByIdAndDelete(id, (err, invoice) => {
        if(err) throw err
        if(!invoice) return res.status(404).send('Invoice not found')
        Customer.findByIdAndUpdate(invoice.customer, {$pull: {"invoices": invoice._id}}, (err, customer) => {
            if(err) throw err
            res.send("Invoice deleted => " + invoice)
        })
    })
})

// LISTEN API

app.listen(port, () => {
    console.log(`App listen on port ${port} ! URL => http://localhost:${port}`);
})