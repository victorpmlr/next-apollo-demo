const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const faker = require('faker')
const data = require('./data.json')

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
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
            type: new GraphQLNonNull(GraphQLInt),
          },
          after: {
            type: GraphQLInt,
          },
        },
        resolve(_, args) {
          const first = args.first
          const after = args.after || 0
          return data.people.slice(after, after + first)
        }
      }
    }
  })
})
