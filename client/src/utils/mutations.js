// Create mutations for CRUD functionality
// Login/Adding Users and Add/Remove/Update thoughts

import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
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
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
mutation AddThoughtToCourse($courseId: ID!, $thoughtText: String!, $thoughtAuthor: String!) {
  addThoughtToCourse(courseId: $courseId, thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
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

export const DELETE_THOUGHT = gql`
mutation RemoveThoughtFromCourse($courseId: ID!, $thoughtId: ID!) {
  removeThoughtFromCourse(courseId: $courseId, thoughtId: $thoughtId) {
    _id
    title
    thoughts {
      _id
      thoughtText
      thoughtAuthor
    }
  }
}
`;

export const UPDATE_THOUGHT = gql`
mutation UpdateThoughtInCourse($courseId: ID!, $thoughtId: ID!, $updatedThought: String!) {
  updateThoughtInCourse(courseId: $courseId, thoughtId: $thoughtId, updatedThought: $updatedThought) {
    _id
    thoughts {
      _id
      thoughtText
    }
  }
}
`;