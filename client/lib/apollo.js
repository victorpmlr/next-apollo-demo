import { ApolloClient, InMemoryCache } from "@apollo/client"

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || `http://localhost:${process.env.PORT || 5000}/graphql`,
  cache: new InMemoryCache(),
})
