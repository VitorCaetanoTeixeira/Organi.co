require('dotenv').load();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dep = require('../varLocal/dependencia');

const routes = require('./routes');
const httpServer = express();
//console.log("string de conexão: " + dep.conectionString)
mongoose.connect(process.env.CONECTION_STRING ,{ useNewUrlParser :true });

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);
httpServer.listen(3333);
console.log("Conexão OK")