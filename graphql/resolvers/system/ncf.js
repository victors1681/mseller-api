const getNcfSchema = require("../../../models/system/Ncf");
const clc = require("cli-color");

module.exports = {
  Query: {
    ncf: async (_, { sellerCode }, { userData }) => {
      const Ncf = await getNcfSchema(userData);

      const ncf = await Ncf.find({ sellerCode });
      return ncf.map(d => ({ ...d._doc, _id: d.id }));
    }
  },
  Mutation: {
    addNcf: async (_, payload, { userData }) => {
      try {
        const Ncf = await getNcfSchema(userData);
        const ncf = new Ncf(payload.ncf);
        await ncf.save();

        return "Ncf inserted!";
      } catch (err) {
        console.log("Error inserting Ncf", clc.red(err));
        throw err;
      }
    }
  }
};
