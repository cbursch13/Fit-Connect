const mongoose = require('mongoose');

const { Schema } = mongoose;
const Course = require('./Course')

const instructorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      bio: {
        type: String
      },
      courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'course'
        }
      ]
});

const Instructor = mongoose.model('instructor', instructorSchema);

module.exports = Instructor;