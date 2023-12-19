const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  res.json('Get Users');
});

module.exports = route;
