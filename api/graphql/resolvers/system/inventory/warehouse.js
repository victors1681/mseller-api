const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    warehouseAll: async (_, __, { sources: { Warehouse } }) => {
      const warehouse = await Warehouse.find();
      return warehouse.map(d => ({ ...d._doc, _id: d.id }));
    },
    warehouse: async (_, { id }, { sources: { Warehouse } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const warehouse = await Warehouse.findOne({ id });
        return {
          ...warehouse._doc,
          _id: warehouse.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addWarehouse: async (_, { warehouse }, { sources: { Warehouse } }) => {
      try {
        if (!warehouse.id) {
          warehouse.id = shortId();
        }

        await Warehouse.create(warehouse);
        return "Warehouse Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateWarehouse: async (_, { warehouse }, { sources: { Warehouse } }) => {
      try {
        const isExist = await Warehouse.findOne({ id: warehouse.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = warehouse;
        await Warehouse.updateOne({ id }, warehouse);
        return "Warehouse Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeWarehouse: async (_, { id }, { sources: { Warehouse } }) => {
      try {
        await Warehouse.deleteOne({ id });
        return "Warehouse Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
