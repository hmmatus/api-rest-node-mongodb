const express = require("express");
const route = express.Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

route.post('/', (req, res) => {
  User.findOne({email: req.body.email})
  .then((data) => {
    const passwordValid = bcrypt.compareSync(req.body.password, data.password);
    if (data && passwordValid) {
      res.json(data);
    } else {
      res.status(400).json({
        error: 'ok',
        msg: 'Incorrect user or password',
      })
    }
  }).catch((error) => {
    res.status(400).json({
      error: 'ok',
      msg: `Error in service ${error}`
    })
  })
})

module.exports = route;