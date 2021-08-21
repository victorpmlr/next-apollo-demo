import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'

const ContactCardComp = dynamic(() => import('../components/ContactCard'), {
  loading: () => <span>...</span>,
})

const Contacts = () => {
  const { data, loading, error } = useQuery(query, {
    variables: { first: 10 },
  })

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  if (loading) {
    return <p>...</p>
  }

  return (
    <div>
      {data.people?.map((person, i) => (
        <ContactCardComp key={i} {...person} />
      ))}
      <br />
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
  query People($first: Int) {
    people(first: $first) {
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

export default Contacts
