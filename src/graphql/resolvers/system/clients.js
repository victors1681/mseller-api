const getClientSchema = require("../../../models/system/Client");
const clc = require("cli-color");
const { ApolloError } = require("apollo-server");

module.exports.resolver = {
  Query: {
    clients: async (_, { limit, sellerCode }, { userData }) => {
      const Client = await getClientSchema(userData);

      let client;
      if (sellerCode) {
        client = await Client.find({ sellerCode });
      } else {
        client = await Client.find().limit(limit);
      }

      return client.map(d => ({ ...d._doc, _id: d.id }));
    },
    client: async (_, { code }, { userData }) => {
      if (!code) return { error: `invalid client code: ${code}` };
      const Client = await getClientSchema(userData);

      const client = await Client.findOne({ code });
      console.log("Client", client);
      return client;
    }
  },
  Mutation: {
    addClient: async (_, { client }, { userData }) => {
      try {
        const Client = await getClientSchema(userData);
        await Client.create(client);
        return client;
      } catch (err) {
        console.log("Error inserting client", clc.red(err));
        throw new ApolloError(
          "Client code already exist, Please use another CODE",
          416, //Duplicate
          { code: client.code }
        );
      }
    },
    addClients: async (_, { clients }, { userData }) => {
      try {
        const Client = await getClientSchema(userData);

        await Client.remove();
        await Client.create(clients);
        return "Clients inserted!";
      } catch (err) {
        console.log("Error inserting clients", clc.red(err));
        throw err;
      }
    }
  }
};
