require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");
const checkAuth = require("./middleware/check-auth");
const path = require("path");
const express = require("express");
const getMongooseDb = require("./models");

const server = new ApolloServer({
  context: async ({ req, res }) => {
    const data = await checkAuth(req, res);

    const { userData } = data; 
    const DBs = await getMongooseDb(userData);

    return { ...data, sources: { ...DBs } };
  },
  typeDefs: typeDefs,
  resolvers: resolvers(),
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

const app = express();
app.use(
  "/uploads",
  express.static(
    path.join(path.dirname(process.mainModule.filename), "uploads")
  )
);

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

const createConnections = async () => {
  try {
    const connection =
      process.env.isDBLocal === "true"
        ? "mongodb://localhost:27017/mseller"
        : `mongodb+srv://${process.env.MONGO_USER}:${
            process.env.MONGO_PASSWORD
          }@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`;

    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  } catch (err) {
    throw err;
  }
};

createConnections();
