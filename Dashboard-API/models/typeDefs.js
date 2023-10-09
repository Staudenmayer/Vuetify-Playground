const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    users: [User] #return array of users
    user(uuid: String!): User #return user by id
  }
  type User {
    uuid: String!
    age: Int
    img: String
    imgFormat: String
  }
  type Mutation {
    create(uuid: String!, age: Int, img: String, imgFormat: String): User
    update(uuid: String!, age: Int, img: String, imgFormat: String): User
    delete(uuid: String!): User
  }
`;

module.exports = { typeDefs };