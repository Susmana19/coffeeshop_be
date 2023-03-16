
//import eksternal
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_PRIVATE_KEY} = process.env

//import internal
const authModel = require('../models/auth.models')

const authController = {
    login: (req, res)=> {
        return authModel.login(req.body)
            .then((result)=> {
                jwt.sign({id: result.id, role: result.role}, JWT_PRIVATE_KEY, {expiresIn: "1d"}, (err, token)=> {
                    return res.status(201).send({ message: "succes", data: {
                        token,
                        user:  {
                            id: result.id,
                            fullname: result.fullname,
                            email: result.email,
                            image: result.image,
                            role: result.role,
                            username: result.username
                        },
                        
                    }})
                })                  

            }).catch((error)=> {
                return res.status(500).send({ message: error })
            })
    },
    register: (req, res)=> {
            //validasi: username dan password tidak boleh kosong dan jumlah kakarekter minimum
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                //store hash in your password DB
                if(err){
                    return res.status(500).send({ message: err.message })
                } else {
                    const request = {
                        email: req.body.email,
                        password: hash,
                        phone: req.body.phone
                    }
                    return authModel.register(request)
                        .then((result)=> {
                            return res.status(201).send({ message: "succes", data: result })
                        }).catch((error)=> {
                            return res.status(500).send({ message: error })
                        })  
                }
            })
    }

}

module.exports = authController;











//import internal
// const authModel = require('../models/auth.models')

// const authController = {
//     login: (req, res)=> {
//         return authModel.login(req.body)
//             .then((result)=> {
//                 return res.status(201).send({ message: "succes", data: {
//                     user: result,
//                     token: 'abc'
//                 }})
//             }).catch((error)=> {
//                 return res.status(500).send({ message: error })
//             })
//     },
//     register: (req, res)=> {
//         return authModel.register(req.body)
//             .then((result)=> {
//                 return res.status(201).send({ message: "succes", data: result })
//             }).catch((error)=> {
//                 return res.status(500).send({ message: error })
//             })
//     }

// }

// module.exports = authController;
