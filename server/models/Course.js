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
      instructor: {     //single instructor
        type: Schema.Types.ObjectId,
        ref: 'instructor'
      },
      students: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
      }]
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;