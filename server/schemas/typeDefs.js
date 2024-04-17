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
    instructors: [Instructor]
    courses: [Course]
    users: [User]
  }

  type Mutation {
    #Add to database
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

   #Update existing data
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

   #Add and remove clients

   addClientToInstructor(
    id: ID
    clientId: ID
   )
   removeClientFromInstructor(
    id: ID
    clientId: ID
   )
   addClientToCourse(
    id: ID
    clientId: ID
   )
   removeClientFromCourse(
    id: ID
    clientId: ID
   )

   #Add and remove courses

   addCourseToInstructor(
    id: ID
    courseId: ID
   )
   removeCourseFromInstructor(
    id: ID
    courseId: ID
   )
   addCourseToClient(
    id: ID
    courseId: ID
   )
   removeCourseFromClient(
    id: ID
    courseId: ID
   )
  }
`;

module.exports = typeDefs;
