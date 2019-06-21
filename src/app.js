require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");
const checkAuth = require("./middleware/check-auth");

const server = new ApolloServer({
  context: async ({ req, res }) => {
    const data = await checkAuth(req, res);
    return { ...data };
  },
  typeDefs: typeDefs,
  resolvers: resolvers(),
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const createConnections = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${
        process.env.MONGO_SERVER
      }/${process.env.MONGO_DB}`,
      { useNewUrlParser: true, useCreateIndex: true }
    );
  } catch (err) {
    throw err;
  }
};

createConnections();
