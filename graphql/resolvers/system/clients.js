const getClientSchema = require("../../../models/system/Client");
const clc = require("cli-color");

module.exports = () => {
  return {
    clients: async (payload, { userData }) => {
      const Client = await getClientSchema(userData);

      const { limit, sellerCode } = payload;

      let client;
      if (sellerCode) {
        client = await Client.find({ sellerCode });
      } else {
        client = await Client.find().limit(limit);
      }

      return client.map(d => ({ ...d._doc, _id: d.id }));
    },
    addClients: async (payload, { userData }) => {
      try {
        const Client = await getClientSchema(userData);

        const { clients } = payload;
        await Client.remove();
        await Client.create(clients);
        return "Clients inserted!";
      } catch (err) {
        console.log("Error inserting clients", clc.red(err));
        throw err;
      }
    }
  };
};
