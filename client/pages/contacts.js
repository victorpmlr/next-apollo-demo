import ContactCard from '../components/ContactCard'
import Link from 'next/link'
import { gql } from '@apollo/client'
import styles from './contacts.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { apolloClient } from '../lib/apollo'

const Contacts = ({ people: prefetchedPeople }) => {
  const [people, setPeople] = useState(prefetchedPeople)
  const [searchTerm, setSearchTerm] = useState()
  const [searching, setSearching] = useState(false)
  const [searchResult, setSearchResult] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    if (!searchTerm || searchTerm?.length < 3) {
      setSearching(false)
      setSearchResult()
      return
    }
    setSearchResult([])
    setSearching(true)

    const delayDebounce = setTimeout(async () => {
      const result = await apolloClient.query({
        query,
        variables: { first: 20, name: searchTerm },
      })
      if (result.data?.people) {
        setSearchResult(result.data.people)
      }
      setError(result.error)
      setSearching(false)
    }, 300)

    return () => {
      clearTimeout(delayDebounce)
    }
  }, [searchTerm])

  const handleLoadMore = useCallback(async () => {
    setLoading(true)
    const result = await apolloClient.query({
      query,
      variables: { first: 20, after: people.length },
    })
    if (result.data?.people) {
      setPeople((ppl) => ppl.concat(result.data.people))
    }
    setError(result.error)
    setLoading(false)
  }, [people.length])

  return (
    <div className={styles.contacts}>
      <div className={styles.search}>
        <input
          type="text"
          name="search-input"
          id="search-input"
          placeholder="Search"
          onChange={(event) => setSearchTerm(event.target.value)}
          className={styles.searchInput}
        />
      </div>
      {searching ? (
        <div className={styles.searchStatus}>{`Searching for "${searchTerm}"...`}</div>
      ) : undefined}
      {searchResult?.length ? (
        <div className={styles.searchStatus}>{`Results for "${searchTerm}":`}</div>
      ) : undefined}
      {!searching && searchResult?.length === 0 && (
        <div className={styles.searchStatus}>{`No results for "${searchTerm}"`}</div>
      )}
      <div className={styles.grid}>
        {(searchResult || people).map((person, i) => (
          <ContactCard key={i} {...person} />
        ))}
      </div>
      <br />
      {!searchResult && (
        <div className={styles.loadMore}>
          <button
            disabled={loading}
            type="button"
            id="load-more"
            onClick={handleLoadMore}
            className={styles.loadMoreButton}
          >
            {loading ? 'Loading' : 'Load more'}
          </button>
        </div>
      )}
      <br />
      {error && <pre>{JSON.stringify(error)}</pre>}
      <br />
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  )
}

const query = gql`
  query People($first: Int!, $after: Int, $name: String) {
    people(first: $first, after: $after, name: $name) {
      name
      address {
        streetAddress
        city
        country
      }
      email
      phone
    }
  }
`

export const getStaticProps = async () => {
  const result = await apolloClient.query({
    query,
    variables: { first: 20 },
  })
  return {
    props: {
      people: result.data?.people || [],
    },
  }
}

export default Contacts
