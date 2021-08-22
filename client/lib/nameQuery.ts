import { gql } from '@apollo/client'

const nameQuery = gql`
  query name {
    name
  }
`

export default nameQuery
