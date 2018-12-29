const Business = require("../../../models/admin/Business");
const { getPlanById } = require("../utils");

module.exports = {
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
  },

  createBusiness: async args => {
    const {
      name,
      country,
      address,
      phone,
      plan,
      status,
      creator
    } = args.businessInput;

    try {
      const business = new Business({
        name,
        country,
        address,
        phone,
        plan,
        status,
        creator
      });

      const result = await business.save();
      console.log(result._doc);
      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
