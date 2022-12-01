const models = require('../models')
const Customer = models.Customer
const Invoice = models.Invoice
const Users = models.Users
const customerController = {
    create: async (req, res) => {
        const newCustomer = new Customer(req.body)
        newCustomer.save()
            .then((dataDb) => res.send(dataDb))
            .catch((err) => res.status(500).send(err))
    },
    update: async (req, res) => {
        const { id } = req.params
        Customer.findByIdAndUpdate( id, req.body, (err, customer) => {
            if(err) throw err
            if(!customer) return res.status(404).send('Customer not found')
            res.send(customer)
        })
    },
    delete: async (req, res) => {
        const { id } = req.params
        Customer.findByIdAndDelete(id , (err, customer) => {
            if(err) throw err
            if(!customer) return res.status(404).send('Customer not found')
            if(customer.invoices.length > 0){
                customer.invoices.map(invoice => {
                    Invoice.findByIdAndDelete(invoice._id, (err, invoice) => {
                        if(err) throw err
                        if(!invoice) return res.send('Invoice not found')
                    })
                })
            }
            res.send("Customer deleted => " + customer)
        })
    },
    getAll: async (req, res) => {
        Customer.find({})
        .populate("invoices")
        .populate("user")
        .exec((err, customers) => {
            if(err) throw err
            res.send(customers)
        })
    },
    getOne: async (req, res) => {
        const { id } = req.params
        Customer.findById(id, (err, customer) => {
            if(err) throw err
            if(!customer) return res.status(404).send('Customer not found')
            res.send(customer)
        })
    }
}

module.exports = customerController