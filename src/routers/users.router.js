const express = require("express")
const usersController = require("../controllers/users.controller")
const router = express.Router()

router.get('/users', usersController.getAll)
router.get('/user/:id', usersController.getOne)
router.get('/users/customers/:id', usersController.getAllCustomers)
router.post('/user', usersController.create)
router.put('/user/:id', usersController.update)
router.delete('/user/:id', usersController.delete)

module.exports = router