//import eksternal
const express = require('express')
const router = express()

//import controller internal
const userController = require('../controllers/user.controllers')

//route users
router.get('/', userController.get)
router.get('/:id', userController.getById)
router.post('/', userController.add)
router.patch('/:id', userController.update)
router.delete('/:id', userController.remove)

//export
module.exports = router;