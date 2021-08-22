import dynamic from 'next/dynamic'
import { apolloClient } from '../lib/apollo'
import peopleQuery from '../lib/peopleQuery'

const ContactListComp = dynamic(() => import('../components/ContactList'), {
  loading: () => <span>...</span>,
})

const Contacts = ({ people }) => {
  return (
    <div>
      <ContactListComp people={people} />
    </div>
  )
}

export const getStaticProps = async () => {
  const result = await apolloClient.query({
    query: peopleQuery,
    variables: { first: 20 },
  })
  return {
    props: {
      people: result.data?.people || [],
    },
  }
}

export default Contacts
