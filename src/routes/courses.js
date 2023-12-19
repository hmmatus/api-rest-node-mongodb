const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  res.json('Get Courses');
});

module.exports = route;
