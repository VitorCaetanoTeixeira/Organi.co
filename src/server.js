require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const routes = require('./routes');
const httpServer = express();

mongoose.connect(process.env.CONECTION_STRING ,{ useNewUrlParser :true });

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);
httpServer.listen(process.env.PORT || 3333);
console.log("Conexão OK")