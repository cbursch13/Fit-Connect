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
  mutation addThought($courseId: ID, $thoughtText: String!, $thoughtAuthor: String!) {
    addThought(courseId: $courseId, thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
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

export const DELETE_THOUGHT = gql`
  mutation deleteThought($courseId: ID!, $thoughtId: ID!) {
    deleteThought(courseId: $courseId, thoughtId: $thoughtId) {
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