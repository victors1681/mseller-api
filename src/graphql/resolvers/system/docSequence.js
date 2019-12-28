const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    docSequences: async (_, __, { sources: { DocSequence } }) => {
      const docSequence = await DocSequence.find({ status: true });
      return docSequence.map(d => ({ ...d._doc, _id: d.id }));
    },
    docSequence: async (
      _,
      { sellerCode, documentType },
      { sources: { DocSequence } }
    ) => {
      try {
        if (!sellerCode)
          return { error: `invalid sellerCode id: ${sellerCode}` };
        const docSequence = await DocSequence.findOne({
          sellerCode,
          documentType
        });

        if (docSequence) {
          const sequenceGenerated = `${docSequence.prefix}${docSequence.nextDocNumber}`;

          return {
            ...docSequence._doc,
            sequenceGenerated,
            _id: docSequence.id
          };
        }
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addDocSequence: async (
      _,
      { docSequence },
      { sources: { DocSequence } }
    ) => {
      try {
        await DocSequence.create(docSequence);
        console.log("docSequencedocSequence", docSequence);
        return "docSequence Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateDocSequence: async (
      _,
      { docSequence },
      { sources: { DocSequence } }
    ) => {
      try {
        const isExist = await DocSequence.findOne({ id: docSequence.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = docSequence;
        await DocSequence.updateOne({ id }, docSequence);
        return "docSequence Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeDocSequence: async (_, { id }, { sources: { DocSequence } }) => {
      try {
        await DocSequence.deleteOne({ id });
        return "docSequence Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
