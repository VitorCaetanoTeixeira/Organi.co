const Producer = require('../models/ProducerModel');

module.exports = {

    async avaliationComent(req, res){
        const { _userId, description, relevance } = req.body;
        const { _idProducer } = req.params;
        try{
            const producerFound = await Producer.findOne({ _id : _idProducer });

            producerFound.avaliation.push({
                
                user:_userId,
                description,
                relevance

            })
            await producerFound.save()

            return res.json({mensage:"Avaliação cadastrada com sucesso!"});
        
        } catch(error) {
            
            return res.json({error:'Não foi possível avaliar, produtor não encontrado'});

        }
    }

    
}