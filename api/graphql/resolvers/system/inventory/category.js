const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    categories: async (_, __, { sources: { Category } }) => {
      const category = await Category.find();
      return category.map(d => ({ ...d._doc, _id: d.id }));
    }
  },
  Mutation: {
    addCategory: async (_, { category }, { sources: { Category } }) => {
      try {
        if (!category.id) {
          category.id = shortId();
        }

        await Category.create(category);
        return "Category Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateCategory: async (_, { category }, { sources: { Category } }) => {
      try {
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
    removeCategory: async (_, { id }, { sources: { Category } }) => {
      try {
        await Category.deleteOne({ id });
        return "Category Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
