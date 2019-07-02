const { ApolloError } = require("apollo-server");
const shortId = require("shortid");
const getPriceListSchema = require("../../../../models/system/inventory/PriceList");

module.exports.resolver = {
  Query: {
    priceListAll: async (_, __, { userData }) => {
      const PriceList = await getPriceListSchema(userData);

      const priceList = await PriceList.find();
      return priceList.map(d => ({ ...d._doc, _id: d.id }));
    },
    priceList: async (_, { id }, { userData }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const PriceList = await getPriceListSchema(userData);
        const priceList = await PriceList.findOne({ id });
        return {
          ...priceList._doc,
          _id: priceList.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addPriceList: async (_, { priceList }, { userData }) => {
      try {
        if (!priceList.id) {
          priceList.id = shortId();
        }

        const PriceList = await getPriceListSchema(userData);
        await PriceList.create(priceList);
        return "PriceList Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updatePriceList: async (_, { priceList }, { userData }) => {
      try {
        const PriceList = await getPriceListSchema(userData);
        const isExist = await PriceList.findOne({ id: priceList.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = priceList;
        await PriceList.updateOne({ id }, priceList);
        return "PriceList Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removePriceList: async (_, { id }, { userData }) => {
      try {
        const PriceList = await getPriceListSchema(userData);

        await PriceList.deleteOne({ id });
        return "PriceList Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
