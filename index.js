const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Establish the MongoDB connection
mongoose.connect("mongodb://localhost:27017/graphql", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    insertIntoNewCollection(id: ID!, name: String!, email: String!): User
  }
`);

const root = {
  Query: {
    // Resolver function for retrieving data from the "newcollection" collection
    newcollection: () => {
      // Query the collection and return the result
      return db.collection("newcollection").find().toArray();
    },
  },
  Query: {
    getUser: async (args) => {
      const user = await db.collection("newcollection").findOne({ id: args.id });
      return user;
    },
  },
  Mutation: {
    insertIntoNewCollection(id, name, email) {
      id
      name
      email
    }
  }
};


// Set up the GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});
