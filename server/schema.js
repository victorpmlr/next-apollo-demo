const { gql } = require('apollo-server-express')
const { createRateLimitRule } = require('graphql-rate-limit')
const { applyMiddleware } = require('graphql-middleware')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { shield } = require('graphql-shield')
const resolvers = require('./resolvers')

// GraphQL Type definitions

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
    people(first: Int!, offset: Int = 0, name: String): [Person]
  }
`

// Setting a rate limit to avoid too many queries
// using graphql-rate-limit & graphql-shield

const rateLimitRule = createRateLimitRule({ identifyContext: (ctx) => ctx.id })

const permissions = shield({
  Query: {
    people: rateLimitRule({ window: '1s', max: 5 }),
  },
})

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions,
)

module.exports = schema
