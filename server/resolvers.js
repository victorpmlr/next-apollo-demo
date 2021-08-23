const faker = require('faker')
const data = require('./data.json')
const { UserInputError } = require('apollo-server-express')

// data.json was pregenerated using faker
// still using faker for the 'name' query, random name returned every time

const resolvers = {
  Query: {
    name: () => faker.name.findName(),
    people: (_, args) => {
      const { first, offset, name } = args

      // limit the query to 100 first
      // TODO reject negative first / offset
      if (first > 100) throw new UserInputError('First is limited to 100.')

      // return an empty list if the search is too short
      if (name && name.length < 3) return []

      const people = name
        ? data.people.filter(
            (person) => person.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
          )
        : data.people
      return people.slice(offset, offset + first)
    },
  },
}

module.exports = resolvers
