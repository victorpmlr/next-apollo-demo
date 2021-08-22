const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Address {
    streetAddress: String
    city: String
    country: String
  }
  type Person {
    id: ID!
    name: String!
    address: Address
    email: String
    phone: String
  }
  type Query {
    name: String!
    people(first: Int!, after: Int = 0, name: String): [Person]
  }
`

module.exports = typeDefs
