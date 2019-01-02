const getProductSchema = require("../../../models/system/Product");

module.exports = () => {
  return {
    products: async (arg, { userData }) => {
      const Product = await getProductSchema(userData);

      const { limit } = arg;
      const product = await Product.find().limit(limit);
      return product.map(d => ({ ...d._doc, _id: d.id }));
    },
    addProducts: async (payload, { userData }) => {
      try {
        const Product = await getProductSchema(userData);

        const { products } = payload;
        await Product.create(products);
        return "Products inserted!";
      } catch (err) {
        throw err;
      }
    }
  };
};
