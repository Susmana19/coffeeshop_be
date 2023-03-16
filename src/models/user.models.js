
const db = require("../../helper/connection")
const { v4: uuidv4 } = require('uuid')

const userModel = {
    
    get: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * from users', 
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
            });
        })
    },

    getById: (id)=> {
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT * from users WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                    return reject(err.message)
                    } else {
                    return resolve(result.rows[0])
                    }
            });
        })
    },

    add: ({name, email, address, phone, dob, gender})=> {
        return new Promise((resolve, reject)=> {
            db.query(
                `INSERT INTO users (id, name, email, address, phone, dob, gender) VALUES('${uuidv4()}','${name}','${email}', '${address}', '${phone}', '${dob}', '${gender}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({name, email, address, phone, dob, gender})
                    }
            });
        })
    },

    update: ({id, name, email, address, phone, dob, gender})=> {
        return new Promise((resolve, reject)=> {
            db.query(`SELECT * FROM users WHERE id='${id}'`,(err, result)=>{
                if(err) {
                    return reject(err.message)
                }else {
                    db.query(
                        `UPDATE users SET name='${name || result.rows[0].name}', email='${email || result.rows[0].email}', address='${address || result.rows[0].address}', phone='${phone || result.rows[0].phone}', dob='${dob || result.rows[0].dob}', gender='${gender || result.rows[0].gender}' WHERE id='${id}'`,
                        (err, result) => {
                            if (err) {
                            return reject(err.message)
                            } else {
                            return resolve({id, name, email, address, phone, dob, gender})
                            }
                        }
                    );
                }
            })
        })
    },

    remove: (id)=> {
        return new Promise((resolve, reject)=> {
                    db.query(
                        `DELETE from users WHERE id='${id}'`,
                        (err, result) => {
                        if (err) {
                            return reject(err.message);
                        } else {
                            return resolve('success delete')
                        }
                    });
        })
    } 
}

module.exports = userModel;