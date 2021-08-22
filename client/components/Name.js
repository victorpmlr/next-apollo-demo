import { useQuery, gql } from '@apollo/client'

const Name = () => {
  const { data, loading, error } = useQuery(query)

  if (error) {
    return <p>{error.message}</p>
  }

  return <span>{loading ? '..' : data?.name}</span>
}

const query = gql`
  query name {
    name
  }
`

export default Name
