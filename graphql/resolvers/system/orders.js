const getOrderSchema = require("../../../models/system/Order");
const clc = require("cli-color");

module.exports = () => {
  return {
    orders: async (payload, { userData }) => {
      try {
        const Order = await getOrderSchema(userData);

        const { limit } = payload;
        const orders = await Order.find().limit(limit);
        console.log("ORDER", orders[0]._doc.created_at);
        return orders.map(d => ({ ...d._doc, _id: d.id }));
      } catch (err) {
        throw err;
      }
    },
    getMaxDocument: async (payload, { userData }) => {
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
    },
    addOrders: async (payload, { userData }) => {
      try {
        const Order = await getOrderSchema(userData);

        const { orders } = payload;
        await Order.create(orders);
        return "Orders inserted!";
      } catch (err) {
        console.log("Error inserting Orders", clc.red(err));
        throw err;
      }
    }
  };
};
