import ContactCard from './ContactCard'
import styles from './ContactList.module.scss'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { apolloClient } from 'lib/apollo'
import peopleQuery from 'lib/peopleQuery'
import Button from './Button'
import { People, PeopleData, PeopleVars } from 'types'

type ContactListProps = {
  people: People[]
}

// Fetch people from apolloClient
const fetchPeople = async (
  variables: PeopleVars,
  resultHandler: (people: People[]) => void,
  loadingHandler: (loading: boolean) => void,
  errorHandler: (error: { message: string }) => void,
) => {
  loadingHandler(true)
  try {
    const result = await apolloClient.query<PeopleData, PeopleVars>({
      query: peopleQuery,
      variables,
    })
    if (result.data?.people) {
      resultHandler(result.data.people)
    }
    errorHandler(result.error)
  } catch (e) {
    errorHandler(e)
  } finally {
    loadingHandler(false)
  }
}

const ContactList = ({ people: prefetchedPeople }: ContactListProps): JSX.Element => {
  const [people, setPeople] = useState(prefetchedPeople)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [searching, setSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<People[] | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ message: string }>()

  useEffect(() => {
    if (!searchTerm || searchTerm?.length < 3) {
      setSearching(false)
      setSearchResult(undefined)
      return
    }
    setSearchResult([])
    setSearching(true)

    // Debounce so we don't fetch on every char typed (would raise rate limit)
    const delayDebounce = setTimeout(async () => {
      await fetchPeople({ first: 20, name: searchTerm }, setSearchResult, setSearching, setError)
    }, 300)

    return () => {
      clearTimeout(delayDebounce)
    }
  }, [searchTerm])

  const handleLoadMore = useCallback(async () => {
    await fetchPeople({ first: 20, offset: people.length }, setPeople, setLoading, setError)
  }, [people.length])

  const searchStatus = useMemo(
    () =>
      searching
        ? `Searching for "${searchTerm}"...`
        : searchResult?.length
        ? `Results for "${searchTerm}":`
        : !searching && searchResult?.length === 0
        ? `No results for "${searchTerm}"`
        : undefined,
    [searchTerm, searching, searchResult?.length],
  )

  return (
    <div className={styles.contacts} id="contact-list">
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
      {searchStatus && (
        <div id="search-status" className={styles.searchStatus}>
          {searchStatus}
        </div>
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
      {error && (
        <p id="error" className={styles.error}>
          {error.message}
        </p>
      )}
    </div>
  )
}

export default ContactList
