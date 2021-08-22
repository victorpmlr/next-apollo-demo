import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../lib/apollo'
import './global.scss'
import Nav from '../components/Nav'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <Nav />
    </ApolloProvider>
  )
}

export default App
