const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema')

// Starting Express with ApolloServer endpoint on /graphql
// and a GraphQL express playground on /playground

const startApolloServer = async () => {
  const server = new ApolloServer({ schema })
  await server.start()

  const app = express()
  server.applyMiddleware({ app })
  app.get('/playground', expressPlayground({ endpoint: server.graphqlPath }))

  const port = process.env.PORT || 5000
  await new Promise((resolve) => app.listen({ port }, resolve))

  console.log(`Graphql Server started on: http://localhost:${port}${server.graphqlPath}`)
  console.log(`Graphql Playground: http://localhost:${port}/playground`)

  return { server, app }
}

startApolloServer()
