const getOrderSchema = require("../../../models/system/Order");
const clc = require("cli-color");

module.exports.resolver = {
  Query: {
    orders: async (_, { limit }, { userData }) => {
      try {
        const Order = await getOrderSchema(userData);

        const orders = await Order.find().limit(limit);
        console.log("ORDER", orders[0]._doc.created_at);
        return orders.map(d => ({ ...d._doc, _id: d.id }));
      } catch (err) {
        throw err;
      }
    },
    getMaxDocument: async (_, __, { userData }) => {
      try {
        const Order = await getOrderSchema(userData);
        const orders = await Order.findOne({ documentType: "O" })
          .select("documentId")
          .sort("-documentId");
        const invoice = await Order.findOne({ documentType: "I" })
          .select("documentId")
          .sort("-documentId");
        console.log(`max number ${orders.documentId}`);
        return { order: orders.documentId, invoice: invoice.documentId };
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    addOrders: async (_, { orders }, { userData }) => {
      try {
        const Order = await getOrderSchema(userData);

        await Order.create(orders);
        return "Orders inserted!";
      } catch (err) {
        console.log("Error inserting Orders", clc.red(err));
        throw err;
      }
    }
  }
};
