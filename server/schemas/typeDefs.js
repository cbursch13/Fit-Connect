// Create the typeDefs
// Type for User/Course/Instructor/Thought and Auth
// Query for Users/Courses/Instructors and CourseByID/InstructorByID
// Mutations for AddUser/Login and Add/Remove/Update thought from course

const typeDefs = `

type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  password: String
  instructors: [Instructor]
  courses: [Course]
}

type Course {
  _id: ID
  title: String
  schedule: String
  price: Int
  description: String
  instructor: Instructor
  thoughts: [Thought]
  clients: [User]
}

type Instructor {
  _id: ID
  firstName: String
  lastName: String
  image: String
  bio: String
  courses: [Course]
  clients: [User]
}

type Thought {
  _id: ID
  thoughtText: String
  thoughtAuthor: String
}

type Auth {
    token: ID
    user: User
  }

type Query {
  instructorById(id: ID): Instructor
  courseById(courseId: ID): Course
  instructors: [Instructor]
  courses: [Course]
  users: [User]
  user: User
}

type Mutation {

   addUser(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    instructors: [ID]
    courses: [ID]  
  ): Auth

   login(
    email: String!, 
    password: String!
  ):Auth

  addThoughtToCourse(
    courseId: ID!,
    thoughtText: String!,
    thoughtAuthor: String!
  ): Course

  removeThoughtFromCourse(
    courseId: ID!,
    thoughtId: ID!
  ): Course

  updateThoughtInCourse(
    courseId: ID!,
    thoughtId: ID!,
    updatedThought: String!
  ): Course
}
`;

module.exports = typeDefs;
