const Plan = require("../../../models/admin/Plan");
// const Business = require("../../../models/admin/Business");
const Roles = require("../../../models/admin/Roles");

const getDbNameByUserId = async (userId, { User, Business }) => {
  try {
    const user = await User.findById(userId);
    const business = await Business.findById(user.business);

    if (business) {
      return business.dbName;
    }

    throw "Database name not found not found";
  } catch (err) {
    throw err;
  }
};

const getUser = async (userId, User) => {
  try {
    const user = await User.findById(userId).populate("business");

    return {
      ...user._doc,
      _id: user.id
    };
  } catch (err) {
    throw err;
  }
};

const getRoleById = roleIds => async () => {
  try {
    const roles = await Roles.find({ _id: { $in: roleIds } });

    return roles.map(role => {
      return {
        ...role._doc,
        _id: role.id
      };
    });
  } catch (err) {
    throw err;
  }
};

const getPlanById = async planId => {
  try {
    const plan = await Plan.findById(planId);
    return {
      ...plan._doc,
      _id: plan.id
    };
  } catch (err) {
    throw err;
  }
};

const getBusinessById = async (businessId, Business, USer) => {
  try {
    const business = await Business.findById(businessId);

    if (business) {
      return {
        ...business._doc,
        _id: business.id
      };
    }
  } catch (err) {
    throw err;
  }
};

const transformEvent = event => ({
  ...event._doc,
  _id: event.id,
  date: new Date(event._doc.date).toISOString(),
  creator: getUser(event._doc.creator)
});

exports.getUser = getUser;
exports.getPlanById = getPlanById;
exports.transformEvent = transformEvent;
exports.getBusinessById = getBusinessById;
exports.getRoleById = getRoleById;
exports.getDbNameByUserId = getDbNameByUserId;
