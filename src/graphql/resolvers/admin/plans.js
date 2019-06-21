const Plans = require("../../../models/admin/Plan");

module.exports.resolver = {
  Query: {
    plans: async () => {
      const plans = await Plans.find();

      return plans.map(plan => ({ ...plan._doc, _id: plan.id }));
    }
  },
  Mutation: {
    createPlan: async (_, args) => {
      try {
        const { name, price, usersMobile, usersDesktop } = args.plantInput;

        const plans = new Plans({
          name,
          price,
          usersMobile,
          usersDesktop
        });
        const result = await plans.save();
        return { ...result._doc, _id: result.id };
      } catch (err) {
        throw err;
      }
    }
  }
};
