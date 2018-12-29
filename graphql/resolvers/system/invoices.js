const Invoice = require("../../../models/system/Invoice");

module.exports = {
  invoices: async () => {
    const invoice = await Invoice.find();
    return invoice.map(d => ({ ...d._doc, _id: d.id }));
  },
  addInvoices: async payload => {
    try {
      const { invoices } = payload;
      await Invoice.create(invoices);
      return "Invoices inserted!";
    } catch (err) {
      throw err;
    }
  }
};
