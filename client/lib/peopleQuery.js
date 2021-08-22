import { gql } from '@apollo/client'

const peopleQuery = gql`
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

export default peopleQuery
