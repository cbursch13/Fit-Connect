//REMOVED AUTHENTICATION CODE.  REFER TO ACTIVITY 23 IN 22-STATE


const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    instructors: [Instructor]
  }

  type Course {
    _id: ID
    title: String
    schedule: String
    price: Int
    clients: [User]
    instructor: Instructor
  }

  type Instructor {
    _id: ID
    firstName: String
    lastName: String
    bio: String
    courses: [Course]
  }

  type Query {
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
    instructor: [ID]  
   ):User

   addInstructor(
    firstName: String!
    lastName: String!
    bio: String
    courses: [ID]
   ):Instructor

   addCourse(
    title: String!
    schedule: String
    price: Int
    instructor: ID
    students: [ID]
   ):Course
   
   updateUser(
    firstName: String
    lastName: String
    email: String
    password: String
    instructor: [ID]  
   ):User

   updateInstructor(
    firstName: String
    lastName: String
    bio: String
    courses: [ID]
   ):Instructor

   updateCourse(
    title: String
    schedule: String
    price: Int
    instructor: ID
    students: [ID]
   ):Course
  }
`;

module.exports = typeDefs;
