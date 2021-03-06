const usersResolver = require("./admin/users");
const businessResolver = require("./admin/business");
const planResolver = require("./admin/plans");
const rolesResolver = require("./admin/roles");
const clientsResolver = require("./system/clients");
const productsResolver = require("./system/inventory/products");

const priceListResolver = require("./system/inventory/priceList");
const taxesResolver = require("./system/inventory/taxes");
const warehouseResolver = require("./system/inventory/warehouse");
const unitResolver = require("./system/inventory/units");
const categoryResolver = require("./system/inventory/category");
const currencyResolver = require("./system/currency");
const retentionResolver = require("./system/retention");
const internalContactResolver = require("./system/internalContact");
const geoLocationResolver = require("./system/geoLocation");
const sellerResolver = require("./system/seller");
const chatResolver = require("./system/chat/chat");
const messageResolver = require("./system/chat/message");

const invoicesResolver = require("./system/invoices");
const documentsResolver = require("./system/documents");
const ncfResolver = require("./system/ncf");
const docSequence = require("./system/docSequence");

const rootValue = () => ({
  Subscription: {
    ...messageResolver.resolver.Subscription
  },
  Query: {
    ...usersResolver.resolver.Query,
    ...businessResolver.resolver.Query,
    ...businessResolver.resolver.Query,
    ...planResolver.resolver.Query,
    ...rolesResolver.resolver.Query,
    ...clientsResolver.resolver.Query,
    ...productsResolver.resolver.Query,
    ...priceListResolver.resolver.Query,
    ...taxesResolver.resolver.Query,
    ...warehouseResolver.resolver.Query,
    ...unitResolver.resolver.Query,
    ...categoryResolver.resolver.Query,
    ...currencyResolver.resolver.Query,
    ...retentionResolver.resolver.Query,
    ...internalContactResolver.resolver.Query,
    ...geoLocationResolver.resolver.Query,
    ...sellerResolver.resolver.Query,
    ...chatResolver.resolver.Query,
    ...messageResolver.resolver.Query,

    ...invoicesResolver.resolver.Query,
    ...documentsResolver.resolver.Query,
    ...ncfResolver.resolver.Query,
    ...docSequence.resolver.Query
  },
  Mutation: {
    ...usersResolver.resolver.Mutation,
    ...businessResolver.resolver.Mutation,
    ...businessResolver.resolver.Mutation,
    ...planResolver.resolver.Mutation,
    ...rolesResolver.resolver.Mutation,
    ...clientsResolver.resolver.Mutation,
    ...productsResolver.resolver.Mutation,
    ...priceListResolver.resolver.Mutation,
    ...taxesResolver.resolver.Mutation,
    ...warehouseResolver.resolver.Mutation,
    ...unitResolver.resolver.Mutation,
    ...categoryResolver.resolver.Mutation,
    ...currencyResolver.resolver.Mutation,
    ...retentionResolver.resolver.Mutation,
    ...internalContactResolver.resolver.Mutation,
    ...geoLocationResolver.resolver.Mutation,
    ...sellerResolver.resolver.Mutation,
    ...chatResolver.resolver.Mutation,
    ...messageResolver.resolver.Mutation,

    ...invoicesResolver.resolver.Mutation,
    ...documentsResolver.resolver.Mutation,
    ...ncfResolver.resolver.Mutation,
    ...docSequence.resolver.Mutation
  }
});

module.exports = rootValue;
