import gql from 'graphql-tag';

/**
 * addUser(data: CreateUserInput!): User!
 */
export const CREATE_TEST_USER = gql`
  mutation {
    addUser(data: { email: "test@test.com", name: "tester", snsTypeName: "google", createDt: "2022-08-15 16:46:00" }) {
      id
      email
      name
      snsTypeId
    }
  }
`;

/**
 * addUser(data: CreateUserInput!): User!
 */
export const CREATE_USER = gql`
  mutation addUser($data: CreateUserInput!) {
    addUser(data: $data) {
      id
      email
      name
      snsTypeId
    }
  }
`;
