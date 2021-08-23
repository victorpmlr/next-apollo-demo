import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'lib/apollo'
import './global.scss'
import Nav from 'components/Nav'

// NextJS App entry point
// importing global css
// Add <title> and nav to all pages
// ApolloProvider needed to use hooks (useQuery / useLazyQuery / useMutation)

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>NextJS - Apollo demo</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <Nav />
      </ApolloProvider>
    </>
  )
}

export default App
