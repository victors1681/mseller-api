const usersResolver = require("./admin/users");
const businessResolver = require("./admin/business");
const planResolver = require("./admin/plans");
const rolesResolver = require("./admin/roles");
const { subscriptions } = require("./subscriptions");

const rootValue = {
  ...subscriptions,
  ...usersResolver,
  ...businessResolver,
  ...planResolver,
  ...rolesResolver
};

module.exports = rootValue;
