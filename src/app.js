require("dotenv").config();
//const { ApolloServer, PubSub } = require("apollo-server-express");
const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");
const checkAuth = require("./middleware/check-auth");
// const path = require("path");
// const express = require("express");
const getMongooseDb = require("./models");
require("apollo-cache-control");

const pubsub = new PubSub();

const server = new ApolloServer({
  context: async ({ req, res, connection }) => {
    const data = await checkAuth(req, res, connection);
    if (data) {
      const { userData } = data;
      const DBs = await getMongooseDb(userData);

      return { ...data, sources: { ...DBs }, pubsub };
    }
  },
  typeDefs: typeDefs,
  resolvers: resolvers(),
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  },
  cacheControl: {
    defaultMaxAge: 5
  }
});

// const app = express();
// app.use(
//   "/uploads",
//   express.static(
//     path.join(path.dirname(process.mainModule.filename), "uploads")
//   )
// );

// server.applyMiddleware({
//   app,
//   bodyParserConfig: {
//     limit: "20mb"
//   }
// });

// server.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// );

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at${url}`);
});

const createConnections = async () => {
  try {
    const connection =
      process.env.isDBLocal === "true"
        ? `mongodb://localhost:27017/${process.env.MONGO_DB}`
        : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`;

    await mongoose.connect(connection, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.set("debug", true);
  } catch (err) {
    throw err;
  }
};
createConnections();
