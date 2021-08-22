import ContactCard from './ContactCard'
import styles from './ContactList.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { apolloClient } from '../lib/apollo'
import peopleQuery from '../lib/peopleQuery'
import Button from './Button'

const ContactList = ({ people: prefetchedPeople }) => {
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
      try {
        const result = await apolloClient.query({
          query: peopleQuery,
          variables: { first: 20, name: searchTerm },
        })
        if (result.data?.people) {
          setSearchResult(result.data.people)
        }
        setError(result.error)
      } catch (e) {
        setError(e)
      } finally {
        setSearching(false)
      }
    }, 300)

    return () => {
      clearTimeout(delayDebounce)
    }
  }, [searchTerm])

  const handleLoadMore = useCallback(async () => {
    setLoading(true)
    try {
      const result = await apolloClient.query({
        query: peopleQuery,
        variables: { first: 20, after: people.length },
      })
      if (result.data?.people) {
        setPeople((ppl) => ppl.concat(result.data.people))
      }
      setError(result.error)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
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
          <Button
            loading={loading}
            id="load-more"
            onClick={handleLoadMore}
            label={loading ? 'Loading' : 'Load more'}
          />
        </div>
      )}
      <br />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  )
}

export default ContactList
