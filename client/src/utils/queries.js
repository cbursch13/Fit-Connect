// Queries created in GraphQL and used for Pages/Components
// Query for all instructors/courses/users and single instructor/course
// Query for checkout is a future functionality for Stripe checkout

import { gql } from '@apollo/client';

export const QUERY_ALL_INSTRUCTORS = gql`
  {
    instructors {
      _id
      firstName
      lastName
      bio
      image
      courses {
        title
        price
        schedule
        description
        _id
        clients {
          firstName
          lastName
        }
      }
    }
  }
`;

export const QUERY_ALL_COURSES = gql`
  {
    courses {
      title
      description
      schedule
      price
      _id
      instructor {
        firstName
        lastName
        image
        bio
        _id
      }
      thoughts {
        _id
        thoughtText
        thoughtAuthor
      }
    }
  }
`;

export const QUERY_SINGLE_COURSE = gql`
query CourseById($courseId: ID) {
  courseById(courseId: $courseId) {
    _id
    title
    thoughts {
      _id
      thoughtAuthor
      thoughtText
    }
  }
}
`;

export const QUERY_INSTRUCTOR_BY_ID = gql`
  query getInstructors($id: ID) {
    instructorById(id: $id) {
      _id
      firstName
      lastName
      bio
      image
      courses {
        title
        price
        schedule
        description
        _id
        clients {
          firstName
          lastName
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;