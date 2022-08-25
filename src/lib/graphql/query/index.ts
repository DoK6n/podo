import gql from 'graphql-tag';

/**
 * retrieveAllTodos: [Todo!]
 * @headers uid
 */
export const GET_USER_ALL_TODOS = gql`
  query {
    retrieveAllTodos {
      id
      content
      isInactive
      isRemoved
      userId
      createdDt
      updatedDt
      removedDt
    }
  }
`;

/**
 * retrieveTodo(id: String!): Todo
 * @headers uid
 */
export const GET_USER_TODO = gql`
  query retrieveTodo($id: String!) {
    retrieveTodo(id: $id) {
      content
      isInactive
      isRemoved
      createdDt
      updatedDt
      removedDt
    }
  }
`;

/**
 * retrieveAllRemovedTodo: [Todo!]
 * @headers uid
 */
export const GET_USER_ALL_REMOVED_TODOS = gql`
  query {
    retrieveAllRemovedTodo {
      id
      userId
      content
      isInactive
      isRemoved
      createdDt
      # updatedDt,
      removedDt
    }
  }
`;

/**
 * retrieveRemovedTodo(id: String!): Todo
 * @headers uid
 */
export const GET_USER_REMOVED_TODO = gql`
  query retrieveRemovedTodo($id: String!) {
    retrieveRemovedTodo(id: $id) {
      userId
      content
      isInactive
      isRemoved
      createdDt
      updatedDt
      removedDt
    }
  }
`;

/**
 * retrieveUserById: UserWithSnsType
 * @headers uid
 */
export const GET_USER = gql`
  query {
    retrieveUserById {
      id
      email
      name
      snsType
    }
  }
`;
