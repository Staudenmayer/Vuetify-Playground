const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    users: [User] #return array of users
    user(uuid: String): User #return user by id
  }
  type User {
    uuid: String
    age: Int
  }
  type Mutation {
    create(uuid: String, age: Int): User
    update(uuid: String, age: Int): User
    delete(uuid: String): User
  }
`;

module.exports = { typeDefs };