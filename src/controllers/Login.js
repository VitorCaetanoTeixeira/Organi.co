const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../../varLocal/dependencia");

module.exports = {

    async login(req, res){
        const {email, password} = req.body;

        User.find({email:email})
        .then(user =>{
            if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
                }
                if (result) {
                const token = jwt.sign(
                    {
                    email: user[0].email,
                    userId: user[0]._id
                    },
                    JWT_KEY,
                    {
                        expiresIn: "78h"
                    }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token,
                    userId:user[0]._id
                });
                }
                res.status(401).json({
                message: "Auth failed"
                });
            });
    })
    }
}