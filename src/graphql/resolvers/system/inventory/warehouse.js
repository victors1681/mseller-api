const { ApolloError } = require("apollo-server");
const shortId = require("shortid");
const getWarehouseSchema = require("../../../../models/system/inventory/Warehouse");

module.exports.resolver = {
  Query: {
    warehouseAll: async (_, __, { userData }) => {
      const Warehouse = await getWarehouseSchema(userData);

      const warehouse = await Warehouse.find();
      return warehouse.map(d => ({ ...d._doc, _id: d.id }));
    },
    warehouse: async (_, { id }, { userData }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const Warehouse = await getWarehouseSchema(userData);
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
    addWarehouse: async (_, { warehouse }, { userData }) => {
      try {
        if (!warehouse.id) {
          warehouse.id = shortId();
        }

        const Warehouse = await getWarehouseSchema(userData);

        await Warehouse.create(warehouse);
        return "Warehouse Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateWarehouse: async (_, { warehouse }, { userData }) => {
      try {
        const Warehouse = await getWarehouseSchema(userData);
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
    removeWarehouse: async (_, { id }, { userData }) => {
      try {
        const Warehouse = await getWarehouseSchema(userData);

        await Warehouse.deleteOne({ id });
        return "Warehouse Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
