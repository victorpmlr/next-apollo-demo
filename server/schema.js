const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql')
const faker = require('faker')

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    name: { type: GraphQLString },
    address: {
      type: new GraphQLObjectType({
        name: 'Address',
        fields: () => ({
          streetAddress: { type: GraphQLString },
          city: { type: GraphQLString },
          country: { type: GraphQLString },
        })
      })
    },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      name: {
        type: GraphQLString,
        resolve() {
          return faker.name.findName()
        }
      },
      people: {
        type: new GraphQLList(PersonType),
        args: {
          first: {
            type: GraphQLInt,
          },
        },
        resolve(_, args) {
          const first = args.first || 2000
          return Array.from(Array(first)).map(() => ({
            name: faker.name.findName(),
            address: {
              streetAddress: faker.address.streetAddress,
              city: faker.address.city,
              country: faker.address.country,
            },
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
          }))
        }
      }
    }
  })
})
