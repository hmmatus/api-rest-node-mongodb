const express = require("express");
const route = express.Router();
const User = require("../models/user_model");

route.get("/", (req, res) => {
  let data = getUsers();
  data
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.log("🚀 ~ file: users.js:10 ~ data.then ~ error:", error);
      res.status(400).json({
        error,
      });
    });
});

route.post("/", (req, res) => {
  let body = req.body;
  let result = createUser(body);
  result
    .then((user) => {
      res.json({
        value: user,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ file: users.js:17 ~ result.then ~ error:", error);
      res.status(400).json({
        error,
      });
    });
});

route.put("/:email", (req, res) => {
  let result = updateUser(req.params.email, req.body);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ file: users.js:32 ~ result.then ~ error:", error);
      res.status(400).json({
        error,
      });
    });
});
route.delete("/:email", (req, res) => {
  let result = disableUser(req.params.email);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ file: users.js:47 ~ result.then ~ error:", error);
      res.status(400).json({
        error,
      });
    });
});

async function getUsers() {
  let users = await User.find({ status: true });
  return users;
}

async function createUser(body) {
  let user = new User({
    email: body.email,
    name: body.name,
    password: body.password,
  });
  return await user.save();
}

async function updateUser(email, body) {
  let user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        name: body.name,
        password: body.password,
      },
    },
    { new: true }
  );
  return user;
}
async function disableUser(email) {
  let user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        status: false,
      },
    },
    { new: true }
  );
  return user;
}

module.exports = route;
