// Import models and tokens (authenticate)
const { User, Instructor, Course } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// Create custom resolvers for front-end display
// Query instructors/courses/users/user and instructorById/courseById
// Mutations for login, adding user and adding/removing/updating thoughts
const resolvers = {
  Query: {
    instructors: async () => {
      return await Instructor.find().populate('courses');
    },
    courses: async () => {
      return await Course.find().populate('clients').populate('instructor');
    },
    users: async () => {
      return await User.find()
    },
    instructorById: async (parent, { id }, context) => {
      try {
        const instructor = await Instructor.findById(id);
        return instructor;
      } catch (error) {
        console.error("Error fetching instructor by ID:", error);
        throw new Error("Failed to fetch instructor by ID");
      }
    },
    courseById: async (parent, { courseId }, context) => {
      try {
        const course = await Course.findById(courseId);
        return course;
      } catch (error) {
        console.error("Error fetching course by ID:", error);
        throw new Error("Failed to fetch course by ID");
      }
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        return user;
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },

    // Add and remove thoughts to courses //
    addThoughtToCourse: async (parent, { courseId, thoughtText, thoughtAuthor }) => {
      return Course.findOneAndUpdate(
        { _id: courseId },
        { $addToSet: { thoughts: { thoughtText, thoughtAuthor } }, },
        { new: true, }
      );
    },

    removeThoughtFromCourse: async (parent, { courseId, thoughtId }) => {
      return Course.findOneAndUpdate(
        { _id: courseId },
        { $pull: { thoughts: { _id: thoughtId } } },
        { new: true }
      );
    },

    updateThoughtInCourse: async (parent, { courseId, thoughtId, updatedThought }) => {
      const updatedCourse = await Course.findOneAndUpdate(
        { _id: courseId, "thoughts._id": thoughtId },
        {
          $set: {
            "thoughts.$.thoughtText": updatedThought,
          },
        },
        { new: true }
      );
      return updatedCourse;
    },
  }
};

module.exports = resolvers;
