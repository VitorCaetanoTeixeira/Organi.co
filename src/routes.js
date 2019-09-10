const express = require('express');
/* Controllers */ 
const UserController = require('./controllers/UserController');
const ProducerController = require('./controllers/ProducerController');


const routes = express.Router();

routes.get('/', (req, res) => {
    return Response.send('DOC')
});

//User Routes
routes.post('/user', UserController.StorageEvent);
routes.get('/users', UserController.getAllUsers);
routes.get('/user/:_id', UserController.getUser);
routes.post('/login', UserController.login);
//Producer Routes
routes.post('/producer', ProducerController.StorageEvent);
routes.get('/producers', ProducerController.getAllProducer);
routes.get('/producer/:_id', ProducerController.getProducer);


module.exports = routes;