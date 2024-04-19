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

  type Auth {
    token: ID
    user: User
  }
  
  type Query {
    instructorById(id: ID): Instructor
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
   ):User

   addInstructor(
    firstName: String!
    lastName: String!
    image: String
    bio: String
    courses: [ID]
    clients: [ID]
   ):Instructor

   addCourse(
    title: String!
    schedule: String
    price: Int
    description: String
    instructor: [ID]
    clients: [ID]
   ):Course
   
   updateUser(
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String 
   ):User

   updateInstructor(
    id: ID
    firstName: String
    lastName: String
    image: String
    bio: String
   ):Instructor

   updateCourse(
    id: ID
    title: String
    schedule: String
    price: Int
    description: String
   ):Course

   login(
    email: String!, 
    password: String!
  ):Auth

   #Add and remove clients

   addClientToInstructor(
    id: ID
    clientId: ID
   ):Instructor

   removeClientFromInstructor(
    id: ID
    clientId: ID
   ):Instructor

   addClientToCourse(
    id: ID
    clientId: ID
   ):Course

   removeClientFromCourse(
    id: ID
    clientId: ID
   ):Course

   #Add and remove courses

   addCourseToInstructor(
    id: ID
    courseId: ID
   ):Instructor

   removeCourseFromInstructor(
    id: ID
    courseId: ID
   ):Instructor

   addCourseToClient(
    id: ID
    courseId: ID
   ):User
   
   removeCourseFromClient(
    id: ID
    courseId: ID
   ):User
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
  }

  type Query {
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
  }

  type Mutation {
    addThoughtToCourse(thoughtText: String!, thoughtAuthor: String!): Thought
    removeThoughtFromCourse(thoughtId: ID!): Thought
  }
`;


module.exports = typeDefs;
