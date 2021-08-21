const ContactCard = ({ name, address, email, phone }) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <p>{name}</p>
      <p>{address.streetAddress}</p>
      <p>{address.city}</p>
      <p>{address.country}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  )
}

export default ContactCard
