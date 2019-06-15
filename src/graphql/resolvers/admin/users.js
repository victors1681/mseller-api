const bcrypt = require("bcryptjs");
const { AuthenticationError, ApolloError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const User = require("../../../models/admin/User");
const { getBusinessById, getRoleById, getUser } = require("../utils");

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

module.exports.resolver = {
  Query: {
    users: async (_, { limit, id, email }) => {
      try {
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
        throw new ApolloError(err);
      }
    },
    user: async (_, { id }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };

        const user = await User.findOne({ _id: id });
        return {
          ...user._doc,
          _id: user.id,
          password: null,
          business: getBusinessById(user.business),
          roles: getRoleById(user.roles)
        };
      } catch (err) {
        throw new ApolloError(err);
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
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const MAXIMUM_ATTEMPTS = 3;

      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }
      if (user.isLockedOut) {
        throw new AuthenticationError(
          "The user is locked please contact the system administrator"
        );
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        const failedAttempts = user.failedPassword + 1;

        await User.updateOne(
          { email },
          { failedPassword: failedAttempts, failedPasswordDate: new Date() }
        );

        if (user.failedPassword >= MAXIMUM_ATTEMPTS - 1) {
          await User.updateOne({ email }, { isLockedOut: true });
          throw new AuthenticationError(
            "Account has been locked, Too many attempts"
          );
        }

        throw new AuthenticationError("Invalid credentials");
      }

      //Login success, reset validations
      await User.updateOne(
        { email },
        { isLockedOut: false, failedPassword: 0 }
      );

      //Check Status
      if (!user.status) {
        throw new AuthenticationError(
          "User is disabled please contact the administrator"
        );
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

      return { ...user, token };
    },
    register: async (_, args) => {
      const { password } = args.userInput;

      try {
        await userValidation(userInput);

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
          ...args.userInput,
          password: hashedPassword
        });

        const result = await user.save();
        const newUser = { ...result._doc, password: null, _id: result.id };
        console.log("New User created");

        return newUser;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateUser: async (_, { userInput }) => {
      try {
        const { _id } = userInput;

        await userValidation(userInput);

        await User.updateOne({ _id }, userInput);
        return "User Updated!";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};

const userValidation = async ({ business, sellerCode, mode, email, _id }) => {
  if (mode === "M" && sellerCode) {
    const response = await User.findOne({ business, sellerCode });
    if (!!response) {
      throw new ApolloError("Seller Code Already exist");
    }
  } else if (mode === "M" && !sellerCode) {
    throw new ApolloError("Need to add a seller code for mobile users");
  }

  if (_id) {
    //User edit mode
    const isUserExist = await User.findOne({ email, _id: { $ne: _id } });
    if (isUserExist) {
      throw new ApolloError("Email already exist");
    }
  } else {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new ApolloError("Email already exist");
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
    throw new ApolloError("Error getting the user by id");
  }
};

module.exports.getUserById = getUserById;
