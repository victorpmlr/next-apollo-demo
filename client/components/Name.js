import { useQuery, gql } from '@apollo/client'

const Name = () => {
  const { data, loading, error } = useQuery(query)

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  return <span>{loading ? '..' : data?.name}</span>
}

const query = gql`
  query name {
    name
  }
`

export default Name
