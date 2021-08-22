const faker = require('faker')
const data = require('./data.json')
const { UserInputError } = require('apollo-server-express')

const resolvers = {
  Query: {
    name: () => faker.name.findName(),
    people: (_, args) => {
      const { first, after, name } = args
      if (first > 100) throw new UserInputError('First is limited to 100.')
      if (name && name.length < 3) return []
      const people = name
        ? data.people.filter(
            (person) => person.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
          )
        : data.people
      return people.slice(after, after + first)
    },
  },
}

module.exports = resolvers
