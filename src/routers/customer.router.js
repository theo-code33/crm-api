const express = require('express')
const customerController = require('../controllers/customer.controller')
const router = express.Router()

router.get('/customers', customerController.getAll)

router.get('/customer/:id', customerController.getOne)

router.post('/customer', customerController.create)

router.put('/customer/:id', customerController.update)

router.delete('/customer/:id', customerController.delete)

module.exports = router;