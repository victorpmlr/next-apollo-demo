import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'

const apolloConfig = {
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || `http://localhost:${process.env.PORT || 5000}/graphql`
  })
}

export default withData(apolloConfig)
