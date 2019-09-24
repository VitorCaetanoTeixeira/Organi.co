const express = require('express');
/* Controllers */ 
const UserController = require('./controllers/UserController');
const ProducerController = require('./controllers/ProducerController');
const Avaliation = require('./controllers/Avaliation');
const Login = require('./controllers/Login');


const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send(`<h1>Vitor Caetano Teixeira</h1><br>
                        <p>Desenvolvedor</p><br>
                        <p>Api de aplicação com consulta e avaliação de pequenos e médios produtores de organico</p>
                    ` )
});

//User Routes
routes.post('/user', UserController.StorageEvent);
routes.get('/users', UserController.getAllUsers);
routes.get('/user/:_id', UserController.getUser);
routes.put('/user/:_id', UserController.Update);

//Login
routes.post('/login', Login.login);

//Producer Routes
routes.post('/producer', ProducerController.StorageEvent);
routes.get('/producers', ProducerController.getAllProducer);
routes.get('/producer/:_id', ProducerController.getProducer);
routes.put('/producer/:_id', ProducerController.Update);

//Avaliation 
routes.post('/avaliation/:_idProducer', Avaliation.avaliationComent);
//routes.get('/avaliations/:_idProducer', Avaliation.getAvaliations);

module.exports = routes;