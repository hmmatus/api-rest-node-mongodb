const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/APi-Rest-Demo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Conectado a mongoDB'))
.catch((err) => console.log('No se pudo conectar', err));

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Api Restful Ok and executing');
})