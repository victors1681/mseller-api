const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    internalContacts: async (_, __, { sources: { InternalContact } }) => {
      const internalContact = await InternalContact.find({ status: true });
      return internalContact.map(d => ({ ...d._doc, _id: d.id }));
    },
    internalContact: async (_, { id }, { sources: { InternalContact } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const internalContact = await InternalContact.findOne({ id });
        return {
          ...internalContact._doc,
          _id: internalContact.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addInternalContact: async (
      _,
      { internalContact },
      { sources: { InternalContact } }
    ) => {
      try {
        if (!internalContact.id) {
          internalContact.id = shortId();
        }

        await InternalContact.create(internalContact);
        return "internalContact Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    addInternalContacts: async (
      _,
      { internalContact },
      { sources: { InternalContact } }
    ) => {
      try {
        await InternalContact.remove();
        await InternalContact.insertMany(internalContact);
        return "InternalContacts inserted!";
      } catch (err) {
        console.log("Error inserting internalContact", err);
        throw new ApolloError("Error inserting internalContact", 417);
      }
    },
    updateInternalContact: async (
      _,
      { internalContact },
      { sources: { InternalContact } }
    ) => {
      try {
        const isExist = await InternalContact.findOne({
          id: internalContact.id
        });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = internalContact;
        await InternalContact.updateOne({ id }, internalContact);
        return "internalContact Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeInternalContact: async (
      _,
      { id },
      { sources: { InternalContact } }
    ) => {
      try {
        await InternalContact.deleteOne({ id });
        return "internalContact Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
