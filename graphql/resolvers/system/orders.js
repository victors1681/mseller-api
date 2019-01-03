const getOrderSchema = require("../../../models/system/Order");
const clc = require("cli-color");

module.exports = () => {
  return {
    orders: async (payload, { userData }) => {
      const Order = await getOrderSchema(userData);

      const { limit } = payload;
      const orders = await Order.find().limit(limit);
      console.log("ORDER", orders[0]._doc.created_at);
      return orders.map(d => ({ ...d._doc, _id: d.id }));
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
