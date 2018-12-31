const Product = require("../../../models/system/Product");

module.exports = {
  products: async arg => {
    const { limit } = arg;
    const product = await Product.find().limit(limit);
    return product.map(d => ({ ...d._doc, _id: d.id }));
  },
  addProducts: async payload => {
    try {
      const { products } = payload;
      await Product.create(products);
      return "Products inserted!";
    } catch (err) {
      throw err;
    }
  }
};