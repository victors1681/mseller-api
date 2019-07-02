const { ApolloError } = require("apollo-server");
const shortId = require("shortid");
const getCategorySchema = require("../../../../models/system/inventory/Category");

module.exports.resolver = {
  Query: {
    categories: async (_, __, { userData }) => {
      const Category = await getCategorySchema(userData);

      const category = await Category.find();
      return category.map(d => ({ ...d._doc, _id: d.id }));
    }
  },
  Mutation: {
    addCategory: async (_, { category }, { userData }) => {
      try {
        if (!category.id) {
          category.id = shortId();
        }

        const Category = await getCategorySchema(userData);

        await Category.create(category);
        return "Category Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateCategory: async (_, { category }, { userData }) => {
      try {
        const Category = await getCategorySchema(userData);
        const isExist = await Category.findOne({ id: category.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = category;
        await Category.updateOne({ id }, category);
        return "Category Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeCategory: async (_, { id }, { userData }) => {
      try {
        const Category = await getCategorySchema(userData);

        await Category.deleteOne({ id });
        return "Category Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
