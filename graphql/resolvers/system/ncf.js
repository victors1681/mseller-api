const getNcfSchema = require("../../../models/system/Ncf");
const clc = require("cli-color");

module.exports = () => {
  return {
    ncf: async (payload, { userData }) => {
      const Ncf = await getNcfSchema(userData);

      const { sellerCode } = payload;

      const ncf = await Ncf.find({ sellerCode });
      return ncf.map(d => ({ ...d._doc, _id: d.id }));
    },
    addNcf: async (payload, { userData }) => {
      try {
        const Ncf = await getNcfSchema(userData);
        console.log("no added", payload.ncf);
        const ncf = new Ncf(payload.ncf);
        await ncf.save();

        console.log("inserteddd");
        return "Ncf inserted!";
      } catch (err) {
        console.log("Error inserting Ncf", clc.red(err));
        throw err;
      }
    }
  };
};
