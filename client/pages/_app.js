import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../lib/apollo'

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
