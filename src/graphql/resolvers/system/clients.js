const getClientSchema = require("../../../models/system/Client");
const clc = require("cli-color");

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
    }
  },
  Mutation: {
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
