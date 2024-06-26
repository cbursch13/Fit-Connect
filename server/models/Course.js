// Course Model
// Imports Thought schema (no longer a separate model)
const mongoose = require('mongoose');
const { Schema } = mongoose;
const thoughtSchema = require('./Thought');

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  schedule: {
    type: String
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'instructor'
  },
  thoughts: [thoughtSchema],
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;