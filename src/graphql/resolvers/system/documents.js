const clc = require("cli-color");

module.exports.resolver = {
  Query: {
    documents: async (_, { clientName, limit }, { sources: { Document } }) => {
      try {
        let query = {};
        if (clientName) {
          query = {
            ...query,
            "client.name": { $regex: new RegExp(clientName, "i") }
          };
        }
        const documents = await Document.find(query).limit(limit);

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
        return { document: documents.documentId, invoice: invoice.documentId };
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
    },
    addDocument: async (_, { document }, { sources: { Document } }) => {
      try {
        await Document.create(document);
        return "Document inserted!";
      } catch (err) {
        console.log("Error inserting Documents", clc.red(err));
        throw err;
      }
    }
  }
};
