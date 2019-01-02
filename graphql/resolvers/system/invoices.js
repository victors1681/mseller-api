const getInvoiceSchema = require("../../../models/system/Invoice");

module.exports = () => {
  const Invoice = getInvoiceSchema();

  return {
    invoices: async (payload, { userData }) => {
      const Invoice = await getInvoiceSchema(userData);
      const invoice = await Invoice.find();
      return invoice.map(d => ({ ...d._doc, _id: d.id }));
    },
    addInvoices: async (payload, { userData }) => {
      try {
        const Invoice = await getInvoiceSchema(userData);

        const { invoices } = payload;
        await Invoice.create(invoices);
        return "Invoices inserted!";
      } catch (err) {
        throw err;
      }
    }
  };
};
