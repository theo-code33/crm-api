const express = require('express')
const invoiceController = require('../controllers/invoice.controller')
const router = express.Router()

router.get('/invoices', invoiceController.getAll)
router.get('/invoice/:id', invoiceController.getOne)
router.get('/invoices/customer/:id', invoiceController.getAllInvoicesByCustomer)
router.post('/invoice', invoiceController.create)
router.put('/invoice/:id', invoiceController.update)
router.delete('/invoice/:id', invoiceController.delete)

module.exports = router