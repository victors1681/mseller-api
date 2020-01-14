const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    sellers: async (_, __, { sources: { Seller } }) => {
      const seller = await Seller.find({ status: true });
      return seller.map(d => ({ ...d._doc, _id: d.id }));
    },
    seller: async (_, { id }, { sources: { Seller } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const seller = await Seller.findOne({ id });
        return {
          ...seller._doc,
          _id: seller.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addSeller: async (_, { seller }, { sources: { Seller } }) => {
      try {
        if (!seller.id) {
          seller.id = shortId();
        }

        await Seller.create(seller);
        return "seller Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    addSellers: async (_, { sellers }, { sources: { Seller } }) => {
      try {
        await Seller.deleteMany({ fromSync: true });
        await Seller.insertMany(sellers);
        return "Sellers inserted!";
      } catch (err) {
        console.log("Error inserting sellers", err);
        throw new ApolloError("Error inserting sellers", 417);
      }
    },
    updateSeller: async (_, { seller }, { sources: { Seller } }) => {
      try {
        const isExist = await Seller.findOne({ id: seller.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = seller;
        await Seller.updateOne({ id }, seller);
        return "seller Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeSeller: async (_, { id }, { sources: { Seller } }) => {
      try {
        await Seller.deleteOne({ id });
        return "seller Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
