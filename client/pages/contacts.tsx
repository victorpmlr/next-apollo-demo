import Loading from 'components/Loading'
import dynamic from 'next/dynamic'
import { apolloClient } from 'lib/apollo'
import peopleQuery from 'lib/peopleQuery'
import { People, PeopleData, PeopleVars } from 'types'
import { GetStaticProps } from 'next'

const ContactListComp = dynamic(() => import('../components/ContactList'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />,
})

type ContactsProps = {
  people: People[]
}

const Contacts = ({ people }: ContactsProps): JSX.Element => {
  return (
    <div>
      <ContactListComp people={people} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<ContactsProps> = async () => {
  const result = await apolloClient.query<PeopleData, PeopleVars>({
    query: peopleQuery,
    variables: { first: 20 },
  })
  return {
    props: {
      people: result.data.people || [],
    },
  }
}

export default Contacts
