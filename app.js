const users = require('./src/routes/users');
const courses = require('./src/routes/courses');
const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECT_URI)
.then(() => console.log('Conectado a mongoDB'))
.catch((err) => console.log('No se pudo conectar', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', users);
app.use('/api/courses', courses);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express node JS Database'
  })
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Api Restful Ok and executing', process.env.MONGODB_CONNECT_URI);
})