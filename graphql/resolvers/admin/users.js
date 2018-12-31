const bcrypt = require("bcryptjs");
const User = require("../../../models/admin/User");
const { getBusinessById, getRoleById } = require("../utils");
const jwt = require("jsonwebtoken");
const { notify } = require("../subscriptions");

module.exports = {
  users: async arg => {
    const { limit } = arg;
    const users = await User.find().limit(limit || 100);

    return users.map(user => {
      console.log(getBusinessById(user.business));

      return {
        ...user._doc,
        _id: user.id,
        password: null,
        business: getBusinessById(user.business),
        roles: getRoleById(user.roles)
      };
    });
  },

  login: async args => {
    const { email, password } = args;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h"
      }
    );

    return token;
  },
  register: async args => {
    const {
      email,
      password,
      name,
      sellCode,
      business,
      roles,
      mode,
      status
    } = args.userInput;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        name,
        sellCode,
        business,
        roles,
        mode,
        status
      });

      const result = await user.save();
      const newUser = { ...result._doc, password: null, _id: result.id };
      console.log("New User saved");

      notify.USER_ADDED(newUser);

      return newUser;
    } catch (err) {
      throw err;
    }
  }
};
