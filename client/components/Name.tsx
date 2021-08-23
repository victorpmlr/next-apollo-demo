import { useQuery } from '@apollo/client'
import nameQuery from 'lib/nameQuery'
import { NameData } from 'types'
import Loading from './Loading'

// Using @apollo/client's useQuery for simple GraphQL fetch

const Name = (): JSX.Element => {
  const { data, loading, error } = useQuery<NameData>(nameQuery)

  if (error) {
    return <p>{error.message}</p>
  }

  if (loading) {
    return <Loading />
  }

  return <span>{data?.name}</span>
}

export default Name
