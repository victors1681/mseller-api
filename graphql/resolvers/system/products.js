const getProductSchema = require("../../../models/system/Product");
const clc = require("cli-color");

module.exports = () => {
  return {
    products: async (payload, { userData }) => {
      const Product = await getProductSchema(userData);

      const { limit } = payload;
      const product = await Product.find().limit(limit);
      return product.map(d => ({ ...d._doc, _id: d.id }));
    },
    addProducts: async (payload, { userData }) => {
      try {
        const Product = await getProductSchema(userData);

        const { products } = payload;
        await Product.remove();
        await Product.create(products);
        return "Products inserted!";
      } catch (err) {
        console.log("Error inserting products", clc.red(err));
        throw err;
      }
    }
  };
};
