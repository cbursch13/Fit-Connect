const mongoose = require('mongoose');

const { Schema } = mongoose;
const Instructor = require('./Instructor');

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
      instructor: {     //single instructor
        type: Schema.Types.ObjectId,
        ref: 'instructor'
      },
      clients: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
      }]
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;