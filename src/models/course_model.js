const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: false
  },
  students: {
    type: Number,
    default: 0
  },
  rate: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Course', courseSchema);

