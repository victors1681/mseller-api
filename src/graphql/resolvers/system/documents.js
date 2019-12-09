const clc = require("cli-color");

module.exports.resolver = {
  Query: {
    documents: async (_, { limit }, { sources: { Document } }) => {
      try {
        const documents = await Document.find().limit(limit);
        console.log("ORDER", documents[0]._doc.created_at);
        return documents.map(d => ({ ...d._doc, _id: d.id }));
      } catch (err) {
        throw err;
      }
    },
    getMaxDocument: async (_, __, { sources: { Document } }) => {
      try {
        const documents = await Document.findOne({ documentType: "O" })
          .select("documentId")
          .sort("-documentId");
        const invoice = await Document.findOne({ documentType: "I" })
          .select("documentId")
          .sort("-documentId");
        console.log(`max number ${documents.documentId}`);
        return { order: documents.documentId, invoice: invoice.documentId };
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    addDocuments: async (_, { documents }, { sources: { Document } }) => {
      try {
        await Document.create(documents);
        return "Documents inserted!";
      } catch (err) {
        console.log("Error inserting Documents", clc.red(err));
        throw err;
      }
    }
  }
};
