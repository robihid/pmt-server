const { GraphQLScalarType } = require('graphql');
const moment = require('moment');
const { User } = require('./models');
const resolvers = {
  Query: {
    test(_, args, context) {
      return 'Hello There';
    }
  },
  Mutation: {
    async captureEmail(_, { email }) {
      const isEmailTaken = await User.findOne({ email });
      if (isEmailTaken) {
        throw new Error('This email is already taken');
      }
      const user = await User.create({
        email,
        role: 'Owner',
        status: 'Pending'
      });
      return user;
    },
    async signup(_, { id, firstName, lastName, password }) {},
    async login(_, { email, password }) {}
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: value => moment(value).toDate(),
    serialize: value => value.getTime(),
    parseLiteral: ast => ast
  })
};

module.exports = resolvers;
