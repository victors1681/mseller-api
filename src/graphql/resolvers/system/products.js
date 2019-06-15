const getProductSchema = require("../../../models/system/Product");
const clc = require("cli-color");

module.exports.resolver = {
  Query: {
    products: async (_, { limit = 10, code }, { userData }) => {
      const Product = await getProductSchema(userData);

      const product = await Product.find().limit(limit);
      return product.map(d => ({ ...d._doc, _id: d.id }));
    }
  },
  Mutation: {
    addProducts: async (_, { products }, { userData }) => {
      try {
        const Product = await getProductSchema(userData);

        await Product.remove();
        await Product.create(products);
        return "Products inserted!";
      } catch (err) {
        console.log("Error inserting products", clc.red(err));
        throw err;
      }
    }
  }
};
