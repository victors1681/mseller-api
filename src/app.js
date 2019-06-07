const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");
const checkAuth = require("./middleware/check-auth");
const { getUserById } = require("./graphql/resolvers/admin/users");

const server = new ApolloServer({
  context: async ({ req, res }) => {
    const data = await checkAuth(req, res);
    console.log("MYDATA", data);
    return { ...data };
  },
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers: resolvers(),
  engine: {
    apiKey: "service:mseller-9969:C2mEj1NISHIqrK8xtM-sYg"
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

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
