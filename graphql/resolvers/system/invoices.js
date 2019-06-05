const getInvoiceSchema = require("../../../models/system/Invoice");

module.exports.resolver = {
  Query: {
    invoices: async (_, __, { userData }) => {
      const Invoice = await getInvoiceSchema(userData);
      const invoice = await Invoice.find();
      return invoice.map(d => ({ ...d._doc, _id: d.id }));
    }
  },
  Mutation: {
    addInvoices: async (_, { invoices }, { userData }) => {
      try {
        const Invoice = await getInvoiceSchema(userData);

        await Invoice.create(invoices);
        return "Invoices inserted!";
      } catch (err) {
        throw err;
      }
    }
  }
};
