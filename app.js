// const express = require("express");
// const bodyParser = require("body-parser");
// const graphqlHttp = require("express-graphql");
const { ApolloServer, gql } = require("apollo-server");

const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");
const checkAuth = require("./middleware/check-auth");
// const { SubscriptionServer } = require("subscriptions-transport-ws");
// const { execute, subscribe } = require("graphql");
// const { createServer } = require("http");
const { getUserById } = require("./graphql/resolvers/admin/users");

//const app = express();

//app.use(bodyParser.json({ limit: "50mb" }));
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//if (process.env.NODE_ENV !== "development") {
//app.use(checkAuth);
//}

const server = new ApolloServer({
  context: async ({ req, res }) => {
    const data = await checkAuth(req, res);
    console.log("MYDATA", data);
    return { ...data };
  },
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers: resolvers()
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// app.use(
//   "/api",
//   graphqlHttp(req => {
//     return {
//       schema,
//       context: {
//         userData: req.userData
//       },
//       rootValue: rootValue(),
//       graphiql: true
//     };
//   })
// );

//const server = createServer(app);

const createConnections = async () => {
  try {
    const main = await mongoose.connect(
      `mongodb://${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`,
      { useNewUrlParser: true, useCreateIndex: true }
    );

    //const { business } = await getUserById("5c271b0e98fb216d0f5feaa2");
    const business = "testDB";

    const businessCon = await mongoose.createConnection(
      `mongodb://${process.env.MONGO_SERVER}/${business}`,
      { useNewUrlParser: true, useCreateIndex: true }
    );

    console.log("BusinessId", business);
  } catch (err) {
    throw err;
  }
};

createConnections();
