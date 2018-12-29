const usersResolver = require("./admin/users");
const businessResolver = require("./admin/business");
const planResolver = require("./admin/plans");
const rolesResolver = require("./admin/roles");

const rootValue = {
  ...usersResolver,
  ...businessResolver,
  ...planResolver,
  ...rolesResolver
};

module.exports = rootValue;
