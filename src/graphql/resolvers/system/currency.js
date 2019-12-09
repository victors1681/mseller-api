const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    currencies: async (_, __, { sources: { Currency } }) => {
      const currency = await Currency.find({ status: true });
      return currency.map(d => ({ ...d._doc, _id: d.id }));
    },
    currency: async (_, { id }, { sources: { Currency } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const currency = await Currency.findOne({ id });
        return {
          ...currency._doc,
          _id: currency.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addCurrency: async (_, { currency }, { sources: { Currency } }) => {
      try {
        if (!currency.id) {
          currency.id = shortId();
        }

        await Currency.create(currency);
        return "currency Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateCurrency: async (_, { currency }, { sources: { Currency } }) => {
      try {
        const isExist = await Currency.findOne({ id: currency.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = currency;
        await Currency.updateOne({ id }, currency);
        return "currency Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeCurrency: async (_, { id }, { sources: { Currency } }) => {
      try {
        await Currency.deleteOne({ id });
        return "currency Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
