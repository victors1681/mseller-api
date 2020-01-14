const Business = require("../../../models/admin/Business");
const { getPlanById } = require("../utils");

module.exports.resolver = {
  Query: {
    business: async () => {
      try {
        const businesses = await Business.find();

        return businesses.map(business => ({
          ...business._doc,
          _id: business.id,
          plan: getPlanById(business.plan)
        }));
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createBusiness: async (_, { businessInput }) => {
      try {
        const business = new Business(businessInput);

        const result = await business.save();

        return { ...result._doc, _id: result.id };
      } catch (err) {
        throw err;
      }
    }
  }
};
