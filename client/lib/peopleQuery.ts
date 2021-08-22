import { gql } from '@apollo/client'

const peopleQuery = gql`
  query People($first: Int!, $offset: Int, $name: String) {
    people(first: $first, offset: $offset, name: $name) {
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

export default peopleQuery
