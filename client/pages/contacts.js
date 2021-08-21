import ContactCard from '../components/ContactCard'
import Link from 'next/link'
import { gql } from '@apollo/client'
import styles from './contacts.module.scss'
import { useCallback, useState } from 'react'
import { apolloClient } from '../lib/apollo'

const Contacts = ({ people: prefetchedPeople }) => {
  const [people, setPeople] = useState(prefetchedPeople)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const onChangeSearch = useCallback((event) => {
    console.log(event.target.value)
  })

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
          onChange={onChangeSearch}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.grid}>
        {people.map((person, i) => (
          <ContactCard key={i} {...person} />
        ))}
      </div>
      <br />
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
  query People($first: Int!, $after: Int) {
    people(first: $first, after: $after) {
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
