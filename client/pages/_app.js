import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../lib/apollo'
import './global.scss'
import Nav from '../components/Nav'

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <Nav />
    </ApolloProvider>
  )
}

export default App
