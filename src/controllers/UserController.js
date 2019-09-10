const axios = require('axios');
const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../../varLocal/dependencia");

module.exports = {
    async getUser(req, res){
        
        const {_id} = req.params;
        console.log(_id);
        try {

            const userFound = await User.findOne({ _id: _id });
            

            
            return res.json(userFound);
            
        } catch (error) {

            console.log(`Usuario não encontrado, parametro de busca: ${_id} 
                        \nRequisição: /user/:id`);

            return res.json({error:'Usuário não encontrado'});

        }
    },
    async getAllUsers(req, res){

        const usersFound = await User.find();
        return res.json(usersFound);

    },
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
                    token: token
                  });
                }
                res.status(401).json({
                  message: "Auth failed"
                });
              });
    })
},

    async StorageEvent(req, res){
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email : email});

        if(userExists){
            return res.status(409).json({
                message: "Email já cadastrado"
              });
        }
        
       const hashedPassword = await bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            }else{
                const user = await User.create({
                    name,
                    email,
                    password: hash
                }).catch(error =>{
                    return res.status(500).json(error);
                });
                
                return res.json(user);
             }
        })
       
    }
}