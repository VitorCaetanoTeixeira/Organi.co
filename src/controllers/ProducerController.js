const axios = require('axios');
const Producer = require('../models/ProducerModel');

module.exports = {
    async getProducer(req, res){
        const {_id} = req.params;
        console.log(_id);
        try{
            const producerFound = await Producer.findOne({ _id : _id });

            return res.json(producerFound);

        } catch(error) {

            console.log(`Produtor não encontrado, parametro de busca: ${_id}
            \nRequisição: /produtor/:_id`);

            return res.json({error:'Produtor não encontrado'});
        }
    },
    async getAllProducer(req, res){

        const producerFound = await Producer.find();
        return res.json(producerFound);

    },

    async StorageEvent(req, res){
        const { nameFarm, contacts, address, location, products } = req.body;

        
        const producerExists = await Producer.findOne({ 'contacts.email' : contacts.email});
      
        if(producerExists){
            console.log(`Produtor já está cadastrado com o mesmo email
                        \nRquest: /produtor POST`);
            return res.json(producerExists);
        }
        
        const producer = await Producer.create({
            nameFarm,
            contacts,
            address,
            location,
            products
        });

        producer.save();
        
        return res.json(producer);
    },

    async Update(req, res){
        const { nameFarm, contacts, address, location, products } = req.body;
        const { _id } = req.params;

        const producerFind = await Producer.findOne({ '_id' : _id });
      console.log(producerFind);

        if(producerFind.contacts.email != contacts.email){
            const producerExists = await Producer.findOne({ 'contacts.email' : contacts.email});
        
            if(producerExists){
                console.log(`Email já cadastrado
                            \nRquest: /produtor PUT`);
                return res.json({mensage:"Email já cadastrado"});
            }
        }
        
        producerFind.nameFarm = nameFarm;
        producerFind.contacts = contacts;
        producerFind.address = address;
        producerFind.location = location;
        producerFind.products = products;
        

        await producerFind.save();
        
        return res.json({mensage:"Update com sucesso!"});
    }
};