require("dotenv").config();
const { ApolloServer, PubSub } = require("apollo-server-express");
//const { ApolloServer, PubSub } = require("apollo-server");
const { createConnections } = require("./dbconnection");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");
const checkAuth = require("./middleware/check-auth");
const path = require("path");
const express = require("express");
const getMongooseModels = require("./models");

require("apollo-cache-control");

const pubsub = new PubSub();

const databases = createConnections();
const models = getMongooseModels(databases);

const server = new ApolloServer({
  context: async ({ req, res, connection }) => {
    const userData = await checkAuth(req, res, connection, models);
    if (userData) {
      return {
        ...userData,
        sources: { ...models },
        pubsub
      };
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

const app = express();
// app.use(
//   "/uploads",
//   express.static(
//     path.join(path.dirname(process.mainModule.filename), "uploads")
//   )
// );

server.applyMiddleware({
  app,
  bodyParserConfig: {
    limit: "20mb"
  }
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

// server.listen({ port: 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at: ${url}`);
// });

const config = {
  api: {
    bodyParser: false
  }
};
module.exports.config = config;
module.exports = app;

//export default server.createHandler({ path: "/graphql" });
// module.exports = server.createHandler();
