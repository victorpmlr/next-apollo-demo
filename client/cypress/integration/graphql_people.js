const query = `
  query People($first: Int!, $offset: Int, $name: String) {
    people(first: $first, offset: $offset, name: $name) {
      name
    }
  }
`

const fetchPeople = (variables) => cy.request({
    method: 'POST',
    url: 'http://localhost:5000/graphql',
    body: {
      query,
      variables,
    },
  })

describe('GraphQL people query', () => {

  it('fetch 20 people', () => {
    fetchPeople({ first: 20, })
      .then((res) => {
        expect(res.body.data.people.length).to.equal(20)
        expect(res.body.data.people[0].name).to.equal('Mr. Andres Abbott')
      })
  })

  it('fetch 101 people', () => {
    fetchPeople({ first: 101, })
      .then((res) => {
        expect(res.body.errors.length).to.equal(1)
        expect(res.body.errors[0].message).to.equal('Not Authorised!')
      })
  })

  it('fetch 20 people with offset', () => {
    fetchPeople({ first: 20, offset: 20 })
      .then((res) => {
        expect(res.body.data.people.length).to.equal(20)
        expect(res.body.data.people[0].name).to.equal('Eda Kuhn')
      })
  })

  it('search for "victor" - 3 results', () => {
    fetchPeople({ first: 20, name: "victor" })
      .then((res) => {
        expect(res.body.data.people.length).to.equal(3)
        expect(res.body.data.people[0].name).to.equal('Victor Krajcik')
      })
  })

  it('search for "azeae" - 0 result', () => {
    fetchPeople({ first: 20, name: "azeaze" })
      .then((res) => {
        expect(res.body.data.people.length).to.equal(0)
      })
  })

})
