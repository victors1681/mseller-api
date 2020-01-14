const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    taxes: async (_, __, { sources: { Taxes } }) => {
      const tax = await Taxes.find({ status: true });
      return tax.map(d => ({ ...d._doc, _id: d.id }));
    },
    tax: async (_, { id }, { sources: { Taxes } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const tax = await Taxes.findOne({ id });
        return {
          ...tax._doc,
          _id: tax.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addTax: async (_, { tax }, { sources: { Taxes } }) => {
      try {
        if (!tax.id) {
          tax.id = shortId();
        }

        await Taxes.create(tax);
        return "Tax Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateTax: async (_, { tax }, { sources: { Taxes } }) => {
      try {
        const isExist = await Taxes.findOne({ id: tax.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = tax;
        await Taxes.updateOne({ id }, tax);
        return "Tax Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeTax: async (_, { id }, { sources: { Taxes } }) => {
      try {
        await Taxes.deleteOne({ id });
        return "Tax Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
