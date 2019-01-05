const bcrypt = require("bcryptjs");
const User = require("../../../models/admin/User");
const { getBusinessById, getRoleById, getUser } = require("../utils");
const jwt = require("jsonwebtoken");
const { notify } = require("../subscriptions");

const userResponse = users =>
  users.map(user => {
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      business: getBusinessById(user.business),
      roles: getRoleById(user.roles)
    };
  });

module.exports = {
  users: async arg => {
    try {
      const { limit, id, email } = arg;
      let users;
      if (id) {
        users = await User.find({ _id: id });
      } else if (email) {
        users = await User.find({ email });
      } else {
        users = await User.find().limit(limit || 100);
      }

      return userResponse(users);
    } catch (err) {
      console.log("Error to get users", err);
      throw err;
    }
  },

  userSellers: async (arg, { userData }) => {
    try {
      const { sellerCode, name } = arg;
      let seller;

      const { business } = await getUser(userData.userId)();

      if (!business) {
        console.log("To filter by seller business is needed");
        return [];
      }

      if (name) {
        seller = await User.find({
          name: { $regex: name, $options: "i" },
          business,
          mode: "M"
        });
      } else if (sellerCode) {
        seller = await User.find({ business, sellerCode, mode: "M" });
      } else {
        seller = await User.find({ business, mode: "M" });
      }

      return userResponse(seller);
    } catch (err) {
      console.log("Error to get users", err);
      throw err;
    }
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
        userId: user._id,
        userMode: user.mode
      },
      process.env.JWT_KEY,
      {
        expiresIn: user.mode === "S" ? "1y" : "9h"
      }
    );

    return token;
  },
  register: async args => {
    const {
      email,
      password,
      name,
      sellerCode,
      business,
      roles,
      mode,
      status
    } = args.userInput;

    try {
      if ((sellerCode !== "0" || sellerCode === "") && mode === "M") {
        const filterSeller = await User.findOne({ business, sellerCode });
        if (filterSeller) {
          throw `Seller Code already exist`;
        }
      } else if ((sellerCode === "0" || sellerCode === "") && mode === "M") {
        throw "All mobile user need a seller code";
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        name,
        sellerCode,
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

const getUserById = async userId => {
  try {
    const user = await User.findById(userId);
    if (user) {
      return user;
    }
  } catch (err) {
    throw err;
  }
};

module.exports.getUserById = getUserById;
