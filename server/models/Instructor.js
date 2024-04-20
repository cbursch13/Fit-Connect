// Instructor Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  image: {
    type: String,
  },
  bio: {
    type: String
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'course'
    }
  ],
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
});

const Instructor = mongoose.model('instructor', instructorSchema);

module.exports = Instructor;