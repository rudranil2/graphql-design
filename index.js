const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    name: String!
    description: String!

    image: Image!
    cars(skip: Int!, take: Int!): [Car!]!
    hasCar(id: ID!): Boolean!
    featureSet: GroupFeatureSet   # For Automatic Group -> Value; For Manual Group -> null
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeatures {
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }

  type Image {
    id: ID!
    url: String!
  }

  input ImageInput {
    url: String!
  }

  type Mutation {
    groupDelete(groupId: ID!): GroupResponsePayload
    groupPublish(groupId: ID!): GroupResponsePayload
    groupUnPublish(groupId: ID!): GroupResponsePayload
    groupAddCars(groupId: ID!, carId: ID!): GroupCarResponsePayload
    groupRemoveCars(groupId: ID!, carId: ID!): GroupCarResponsePayload
    groupCreate(
      groupInput: GroupInput!     # We removed code repetition here, But fields are not required here which they should be
    ): GroupResponsePayload
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput!
    ): GroupResponsePayload
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureFields
  }

  type GroupResponsePayload {
    userErrors: [UserError]!
    group: Group
  }

  type UserError {
    statusCode: String!
    message: String!
    field: [String!]!
  }

  type GroupCarResponsePayload {
    userErrors: [UserError]!
    cars: [Car!]!
  }


`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
