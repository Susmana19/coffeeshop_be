
//import internal
const userModel = require('../models/user.models')


const userController = {
    get:(req, res)=> {
        return userModel.get()
        .then((result)=> {
            // explorasi
            // return formResponse("succes", result, 200)
            // formResponse({ message: "succes", data: result, status: 200 })
            return res.status(200).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },

    getById: (req, res)=> {
        return userModel.getById(req.params.id)
        .then((result) => {
            return res.status(200).send({ message: "succes", data: result })
        })
    },

    add: (req, res)=> {
        return userModel.add(req.body)
            .then((result)=> {
                return res.status(201).send({ message: "succes", data: result })
            }).catch((error)=> {
                return res.status(500).send({ message: error })
            })
    },

    update: (req, res)=> {
        const request = {
            ...req.body,
            id: req.params.id,
        }
        return userModel.update(request)
            .then((result)=> {
                return res.status(201).send({ message: "succes", data: result })
            }).catch((error)=> {
                return res.status(500).send({ message: error })
            })
    },
    remove: (req, res)=> {
        return userModel.remove(req.params.id)
        .then((result) => {
            return res.status(200).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    }
}

module.exports = userController;