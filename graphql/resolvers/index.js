const usersResolver = require("./admin/users");
const businessResolver = require("./admin/business");
const planResolver = require("./admin/plans");
const rolesResolver = require("./admin/roles");
const { subscriptions } = require("./subscriptions");
const clientsResolver = require("./system/clients");
const productsResolver = require("./system/products");
const invoicesResolver = require("./system/invoices");
const ordersResolver = require("./system/orders");

const rootValue = () => ({
  ...subscriptions,
  ...usersResolver,
  ...businessResolver,
  ...planResolver,
  ...rolesResolver,
  ...clientsResolver(),
  ...productsResolver(),
  ...invoicesResolver(),
  ...ordersResolver()
});

module.exports = rootValue;
