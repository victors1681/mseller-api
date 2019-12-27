const getClientSchema = require("../../../models/system/Client/Client");
const clc = require("cli-color");
const { ApolloError } = require("apollo-server");

module.exports.resolver = {
  Query: {
    clients: async (
      _,
      { limit, sellerCode, name },
      { sources: { Client } }
    ) => {
      try {
        let client;
        if (sellerCode) {
          client = await Client.find({ sellerCode })
            .populate("priceList")
            .populate("internalContactsDetail")
            .populate("geoLocation")
            .populate("seller");
        } else if (name) {
          client = await Client.find({
            name: { $regex: new RegExp(name, "i") }
          })
            .populate("priceList")
            .populate("internalContactsDetail")
            .populate("geoLocation")
            .populate("seller")
            .limit(15);
        } else {
          client = await Client.find()
            .populate("priceList")
            .populate("internalContactsDetail")
            .populate("geoLocation")
            .populate("seller")
            .limit(limit);
        }

        return client.map(d => ({
          ...d._doc,
          _id: d.id,
          internalContacts: d.internalContactsDetail,
          geoLocation: d.geoLocation,
          priceList: d.priceList,
          seller: d.seller
        }));
      } catch (err) {
        throw new ApolloError("Error getting clients");
      }
    },
    client: async (_, { code }, { sources: { Client } }) => {
      try {
        if (!code) return { error: `invalid client code: ${code}` };

        const client = await Client.findOne({ code });
        console.log("Client", client);
        return client;
      } catch (err) {
        throw new ApolloError("Error getting client");
      }
    }
  },
  Mutation: {
    addClient: async (_, { client }, { sources: { Client } }) => {
      try {
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
    addClients: async (_, { clients }, { sources: { Client } }) => {
      try {
        await Client.deleteMany({ fromSync: true });
        await Client.insertMany(clients);
        return "Clients inserted!";
      } catch (err) {
        console.log("Error inserting clients", clc.red(err));
        throw new ApolloError("Error inserting clients", 417);
      }
    }
  }
};
