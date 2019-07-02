const { ApolloError } = require("apollo-server");
const shortId = require("shortid");
const getTaxSchema = require("../../../../models/system/inventory/Taxes");

module.exports.resolver = {
  Query: {
    taxes: async (_, __, { userData }) => {
      const Tax = await getTaxSchema(userData);

      const tax = await Tax.find({ status: true });
      return tax.map(d => ({ ...d._doc, _id: d.id }));
    },
    tax: async (_, { id }, { userData }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const Tax = await getTaxSchema(userData);
        const tax = await Tax.findOne({ id });
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
    addTax: async (_, { tax }, { userData }) => {
      try {
        if (!tax.id) {
          tax.id = shortId();
        }
        const Tax = await getTaxSchema(userData);

        await Tax.create(tax);
        return "Tax Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateTax: async (_, { tax }, { userData }) => {
      try {
        const Tax = await getTaxSchema(userData);
        const isExist = await Tax.findOne({ id: tax.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = tax;
        await Tax.updateOne({ id }, tax);
        return "Tax Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeTax: async (_, { id }, { userData }) => {
      try {
        const Tax = await getTaxSchema(userData);

        await Tax.deleteOne({ id });
        return "Tax Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
