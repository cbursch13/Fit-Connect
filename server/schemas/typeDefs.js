//REMOVED AUTHENTICATION CODE.  REFER TO ACTIVITY 23 IN 22-STATE


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

type Query {
  instructorById(id: ID): Instructor
  courseById(courseId: ID): Course
  instructors: [Instructor]
  courses: [Course]
  users: [User]
}

type Mutation {
  addUser(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    instructors: [ID]
    courses: [ID]  
  ): User

  addInstructor(
    firstName: String!
    lastName: String!
    image: String
    bio: String
    courses: [ID]
    clients: [ID]
  ): Instructor

  addCourse(
    title: String!
    schedule: String
    price: Int
    description: String
    instructor: [ID]
    clients: [ID]
  ): Course
  
  updateUser(
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String 
  ): User

  updateInstructor(
    id: ID
    firstName: String
    lastName: String
    image: String
    bio: String
  ): Instructor

  updateCourse(
    id: ID
    title: String
    schedule: String
    price: Int
    description: String
  ): Course

  # Add and remove clients

  addClientToInstructor(
    id: ID
    clientId: ID
  ): Instructor

  removeClientFromInstructor(
    id: ID
    clientId: ID
  ): Instructor

  addClientToCourse(
    id: ID
    clientId: ID
  ): Course

  removeClientFromCourse(
    id: ID
    clientId: ID
  ): Course

  # Add and remove courses

  addCourseToInstructor(
    id: ID
    courseId: ID
  ): Instructor

  removeCourseFromInstructor(
    id: ID
    courseId: ID
  ): Instructor

  addCourseToClient(
    id: ID
    courseId: ID
  ): User

  removeCourseFromClient(
    id: ID
    courseId: ID
  ): User

  addThoughtToCourse(courseId: ID!, thoughtText: String!, thoughtAuthor: String!): Course
  removeThoughtFromCourse(courseId: ID!, thoughtId: ID!): Course
}

type Thought {
  _id: ID
  thoughtText: String
  thoughtAuthor: String
}
`;

module.exports = typeDefs;
