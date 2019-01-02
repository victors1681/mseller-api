const getClientSchema = require("../../../models/system/Client");

module.exports = connection => {
  const Client = getClientSchema(connection);

  return {
    clients: async () => {
      const client = await Client.find();
      return client.map(d => ({ ...d._doc, _id: d.id }));
    },
    addClients: async payload => {
      try {
        const { clients } = payload;
        await Client.create(clients);
        return "Clients inserted!";
      } catch (err) {
        throw err;
      }
    }
  };
};
