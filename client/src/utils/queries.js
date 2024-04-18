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
      thoughtAuthor
      thoughtText
      _id
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

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
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

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
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