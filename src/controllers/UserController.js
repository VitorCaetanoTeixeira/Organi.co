const User = require('../models/UserModel');
const bcrypt = require("bcrypt");

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
    async StorageEvent(req, res){
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email : email});

        if(userExists){
            return res.status(409).json({
                message: "Email já cadastrado"
              });
        }
        
       await bcrypt.hash(password, 10, async (err, hash) => {
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
       
    },

    async Update(req, res){
        const { name, email, password } = req.body;
        const { _id } = req.params;
        
        const user = await User.findOne({ _id : _id});
        if(user.email !== email){
            const userExists = await User.findOne({ email : email});

            if(userExists){
                return res.status(409).json({
                    message: "Email já cadastrado"
                });
            }
        }

        await bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            }else{
                user.name = name;
                user.email = email;
                user.password = hash;
                user.save();
                }
            });
                
        return res.json({mensage:"Update com sucesso!"});
        
    }


}