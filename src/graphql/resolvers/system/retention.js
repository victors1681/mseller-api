const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    retentions: async (_, __, { sources: { Retention } }) => {
      const retention = await Retention.find({ status: true });
      return retention.map(d => ({ ...d._doc, _id: d.id }));
    },
    retention: async (_, { id }, { sources: { Retention } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const retention = await Retention.findOne({ id });
        return {
          ...retention._doc,
          _id: retention.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addRetention: async (_, { retention }, { sources: { Retention } }) => {
      try {
        if (!retention.id) {
          retention.id = shortId();
        }

        await Retention.create(retention);
        return "retention Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateRetention: async (_, { retention }, { sources: { Retention } }) => {
      try {
        const isExist = await Retention.findOne({ id: retention.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = retention;
        await Retention.updateOne({ id }, retention);
        return "retention Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeRetention: async (_, { id }, { sources: { Retention } }) => {
      try {
        await Retention.deleteOne({ id });
        return "retention Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
