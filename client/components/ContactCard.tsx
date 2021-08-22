import styles from './ContactCard.module.scss'
import { People } from 'types'

type ContactCardProps = People

const ContactCard = ({ name, address, email, phone }: ContactCardProps): JSX.Element => {
  return (
    <div className={styles.contactCard}>
      <h3>{name}</h3>
      <div>
        <p>📍 {address.streetAddress}</p>
        <p>{`\u00A0\u00A0\u00A0\u00A0\u00A0${address.city}`}</p>
        <p>{`\u00A0\u00A0\u00A0\u00A0\u00A0${address.country}`}</p>
      </div>
      <p>
        ＠{' '}
        <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
          {email}
        </a>
      </p>
      <p>📞 {phone}</p>
    </div>
  )
}

export default ContactCard
