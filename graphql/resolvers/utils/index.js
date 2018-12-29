const Plan = require("../../../models/admin/Plan");
const User = require("../../../models/admin/User");
const Business = require("../../../models/admin/Business");
const Roles = require("../../../models/admin/Roles");

const getUser = userId => async () => {
  try {
    const user = await User.findById(userId);
    console.log(user);
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

const getBusinessById = async businessId => {
  try {
    const business = await Business.findById(businessId);

    if (business) {
      return {
        ...business._doc,
        _id: business.id,
        creator: getUser(business.creator)
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
