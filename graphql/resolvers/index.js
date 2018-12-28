const usersResolver = require("./users");
const bookingResolver = require("./booking");
const eventsResolver = require("./events");

const rootValue = {
  ...usersResolver,
  ...bookingResolver,
  ...eventsResolver
};

module.exports = rootValue;
