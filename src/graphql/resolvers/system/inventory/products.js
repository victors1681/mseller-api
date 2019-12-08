const { ApolloError } = require("apollo-server"); 
const processUpload = require("../../utils/upload");
const clc = require("cli-color");

module.exports.resolver = {
  Query: {
    products: async (
      _,
      { limit = 10, code },
      { userData, sources: { Product } }

    ) => {
     // const ProductSchema = getProductSchema(userData);
     
      const product = await Product.find()
        .populate("taxDetail")
        .populate("warehouseDetail")
        .populate("categoryDetail")
        .populate("priceListDetail")
        .populate("unitDetail")
        .limit(limit);

      return product.map(d => ({
        ...d._doc,
        _id: d.id,
        tax: d.taxDetail,
        category: d.categoryDetail,
        inventory: {
          ...d.inventory,
          unit: d.unitDetail,
          warehouses: d.inventory.warehouses
          // d.warehouseDetail.map(w => ({
          //   ...w,
          //   initialQuantity: d.inventory.warehouses.find(f => f.id === w.id)
          //     .initialQuantity
          // }))
        }
      }));
    },
    product: async (_, { code }, { userData,  sources: { Product } }) => {
      try {
        if (!code) return { error: `invalid user id: ${code}` }; 
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
    uploadProductImage: async (_, { file }, { userData,  sources: { Product } }) => {
      try { 

        const obj = await processUpload(file, userData, "products");

        console.log(obj);

        // return { filename, mimetype, encoding };
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    addProduct: async (_, { product }, { userData,  sources: { Product } }) => {
      try { 

        const isExist = await Product.findOne({ code: product.code });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }

        let images = [];

        if (product.images) {
          images = await Promise.all(
            product.images.map((file, index) =>
              processUpload(file, userData, "products")
            )
          );
        }

        console.log("PRODUCT", product);

        await Product.create({ ...product, images: images });
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
    addProducts: async (_, { products }, { userData,  sources: { Product } }) => {
      try { 

        await Product.remove({ fromSync: true});
        await Product.create(products);
        return "Products inserted!";
      } catch (err) {
        console.log("Error inserting products", clc.red(err));
        throw new ApolloError(err);
      }
    },
    updateProduct: async (_, { product }, { userData,  sources: { Product } }) => {
      try { 
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
