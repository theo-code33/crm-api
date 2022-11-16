const models = require('../models')
const Users = models.Users

const userController = {
    create: async (req, res) => {
        const newUser = new Users(req.body)
        newUser.save()
            .then((dataDb => res.send(dataDb)))
            .catch(err => res.status(500).send(err))
    },
    update: async (req, res) => {
        const { id } = req.params
        Users.findByIdAndUpdate(id, req.body, (err, user) => {
            if(err) throw err
            if(!user) return res.status(404).send('User not found')
            res.send(user)
        })
    },
    delete: async (req, res) => {
        const { id } = req.params
        Users.findByIdAndDelete(id, (err, user) => {
            if(err) throw err
            res.send(user)
        })
    },
    getAll: async (req, res) => {
        Users.find({})
            .populate('customers')
            .exec((err, users) => {
                if(err) throw err
                res.send(users)
            })
    },
    getOne: async (req, res) => {
        const { id } = req.params
        Users.findById(id)
            .populate("customers")
            .exec((err, user) =>{
                if(err) throw err
                if(!user) res.status(404).send('User not Found')
                res.send(user)
            })
    }
}

module.exports = userController