const Roles = require("../../../models/admin/Roles");

module.exports = {
  roles: async () => {
    const roles = await Roles.find();
    return roles.map(rol => ({ ...rol._doc, _id: rol.id }));
  },
  createRole: async ({ name, group }) => {
    try {
      const roles = new Roles({
        name,
        group
      });
      const result = await roles.save();
      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
