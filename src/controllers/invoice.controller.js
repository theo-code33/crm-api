const { default: mongoose } = require('mongoose')
const models = require('../models')
const Customer = models.Customer
const Invoice = models.Invoice

const invoiceController = {
    create: (req, res) => {
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
    },
    update: (req, res) => {
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
    },
    delete: (req, res) => {
        const { id } = req.params
        Invoice.findByIdAndDelete(id, (err, invoice) => {
            if(err) throw err
            if(!invoice) return res.status(404).send('Invoice not found')
            Customer.findByIdAndUpdate(invoice.customer, {$pull: {"invoices": invoice._id}}, (err, customer) => {
                if(err) throw err
                res.send("Invoice deleted => " + invoice)
            })
        })
    },
    getAll: (req, res) => {
        Invoice.find({})
        .populate("customer")
        .exec((err, invoices) => {
            if(err) throw err
            res.send(invoices)
        })
    },
    getOne: (req, res) => {
        const { id } = req.params
        Invoice.findById(id)
            .populate("customer")
            .exec((err, invoice) => {
                if(err) throw err
                if(!invoice) return res.status(404).send("Invoice not found")
                res.send(invoice)
            })
    },
    getAllInvoicesByCustomer: async (req, res) => {
        const { id } = req.params
        
        const customer = await Customer.findById(id)

        if(!customer) return res.status(404).send("Customer not found")

        const invoices = await Invoice.find({customer: id})
        if(invoices.length === 0) return res.status(404).send("Customer doesn't have invoices")
        res.send(invoices)
        
    },
    getAllCustomers: async (req, res) => {
        const { id } = req.params
        const user = await Users.findById(id)
        if(!user) return res.status(404).send('User not found')
        
        const customers = await Customer.find({user: id})
        if(customers.length === 0) return res.status(404).send('User doesn\'t have customer ')
        res.send(customers)
    }
}

module.exports = invoiceController