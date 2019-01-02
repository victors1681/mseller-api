const getProductSchema = require("../../../models/system/Product");
var clc = require("cli-color");

module.exports = () => {
  return {
    products: async (arg, { userData }) => {
      const Product = await getProductSchema(userData.dbName);

      const { limit } = arg;
      const product = await Product.find().limit(limit);
      return product.map(d => ({ ...d._doc, _id: d.id }));
    },
    addProducts: async (payload, { userData }) => {
      try {
        if (userData.userMode === "S") {
          const Product = await getProductSchema(userData.dbName);

          const { products } = payload;
          await Product.create(products);
          return "Products inserted!";
        }
        const error = `ERROR: Only synchronizator user has access to this resource, db: ${
          userData.dbName
        }, email: ${userData.email}`;
        console.log(clc.red(error));

        throw error;
      } catch (err) {
        throw err;
      }
    }
  };
};
