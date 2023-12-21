const express = require("express");
const route = express.Router();
const Course = require("../models/course_model");
const verifiedToken = require("../middlewares/auth");

route.get("/", verifiedToken, (req, res) => {
  let data = getCourses();
  data
    .then((courses) => {
      res.json(courses);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
});

route.post("/", verifiedToken, (req, res) => {
  let result = createCourse(req);
  result
    .then((course) => {
      res.json({
        value: course,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ file: users.js:17 ~ result.then ~ error:", error);
      res.status(400).json({
        error,
      });
    });
});

route.put("/:id", verifiedToken, (req, res) => {
  let result = updateCourse(req.params.id, req.body);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ file: users.js:17 ~ result.then ~ error:", error);
      res.status(400).json({
        error,
      });
    });
});

route.delete("/:id", verifiedToken, (req, res) => {
  let result = disableCourse(req.params.id);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
});

async function getCourses() {
  let courses = await Course.find({ status: true }).populate("author", "name -_id");
  return courses;
}

async function createCourse(req) {
  const body = req.body;
  let course = new Course({
    title: body.title,
    description: body.description,
    author: req.user._id,
  });
  return await course.save();
}

async function updateCourse(id, body) {
  let course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        title: body.title,
        description: body.description,
      },
    },
    { new: true }
  );
  return course;
}

async function disableCourse(id) {
  let course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        status: false,
      },
    },
    { new: true }
  );
  return course;
}

module.exports = route;
