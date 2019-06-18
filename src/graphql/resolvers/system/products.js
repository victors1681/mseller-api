const { ApolloError } = require("apollo-server");
const getProductSchema = require("../../../models/system/Product");
const clc = require("cli-color");

module.exports.resolver = {
  Query: {
    products: async (_, { limit = 10, code }, { userData }) => {
      const Product = await getProductSchema(userData);

      const product = await Product.find().limit(limit);
      return product.map(d => ({ ...d._doc, _id: d.id }));
    },
    product: async (_, { code }, { userData }) => {
      try {
        if (!code) return { error: `invalid user id: ${code}` };
        const Product = await getProductSchema(userData);
        const product = await Product.findOne({ code });
        return {
          ...product._doc,
          _id: product.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addProduct: async (_, { product }, { userData }) => {
      try {
        const Product = await getProductSchema(userData);

        const isExist = await Product.findOne({ code: product.code });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }

        await Product.create(product);
        return "Product Inserted";
      } catch (err) {
        console.log("Error inserting product", clc.red(err));
        throw new ApolloError(
          "Product code already exist, Please use another CODE",
          416, //Duplicate
          { product: product.code }
        );
      }
    },
    addProducts: async (_, { products }, { userData }) => {
      try {
        const Product = await getProductSchema(userData);

        await Product.remove();
        await Product.create(products);
        return "Products inserted!";
      } catch (err) {
        console.log("Error inserting products", clc.red(err));
        throw new ApolloError(err);
      }
    },
    updateProduct: async (_, { product }, { userData }) => {
      try {
        const Product = await getProductSchema(userData);
        const isExist = await Product.findOne({ code: product.code });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { code } = product;
        await Product.updateOne({ code }, product);
        return "Product Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
