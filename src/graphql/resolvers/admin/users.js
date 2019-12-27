const bcrypt = require("bcryptjs");
const { AuthenticationError, ApolloError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const User = require("../../../models/admin/User");
const { getBusinessById, getRoleById, getUser } = require("../utils");
const uploadContent = require("../utils/upload");
const { get, head } = require("lodash");

var ObjectId = require("mongoose").Types.ObjectId;
const randomColor = require("randomcolor");

const userResponse = users =>
  users.map(user => {
    return {
      ...user._doc,
      _id: user.id,
      password: null
    };
  });

const getFullAndInitialsName = ({ firstName, lastName }) => {
  const fullName = `${firstName} ${lastName}`;
  const initials = `${head(firstName, "").toUpperCase()}${head(
    lastName,
    ""
  ).toUpperCase()}`;
  return { fullName, initials };
};

module.exports.resolver = {
  Query: {
    users: async (
      _,
      { limit, id, email },
      { sources: { User, Business }, userData: { userId } }
    ) => {
      try {
        //in order to avoid issues to requesting user for different business.
        const user = await User.findById(ObjectId(userId));

        if (!user) {
          throw new ApolloError("User not exist, need a valid token");
        }
        const business = user.business;
        let users;
        if (id) {
          users = await User.find({ _id: id, business })
            .populate("business")
            .populate("roles");
        } else if (email) {
          users = await User.find({ email, business })
            .populate("business")
            .populate("roles");
        } else {
          users = await User.find({ business })
            .limit(limit || 100)
            .populate("business")
            .populate("roles");
        }

        return userResponse(users);
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    user: async (_, { id }, { User, Business }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };

        const user = await User.findOne({ _id: id })
          .populate("business")
          .populate("roles");
        return {
          ...user._doc,
          _id: user.id,
          password: null
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    userSellers: async (arg, { userData }, { sources: { User, Business } }) => {
      try {
        const { sellerCode, name } = arg;
        let seller;

        const { business } = await getUser(userData.userId, User);

        if (!business) {
          console.log("To filter by seller, business is needed");
          return [];
        }

        if (name) {
          seller = await User.find({
            name: { $regex: name, $options: "i" },
            business: business._id,
            mode: "M"
          })
            .populate("business")
            .populate("roles");
        } else if (sellerCode) {
          seller = await User.find({
            business: business._id,
            sellerCode,
            mode: "M"
          })
            .populate("business")
            .populate("roles");
        } else {
          seller = await User.find({ business: business._id, mode: "M" })
            .populate("business")
            .populate("roles");
        }

        return userResponse(seller);
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    uploadUserAvatar: async (
      _,
      { file },
      { userData, sources: { User, Business } }
    ) => {
      try {
        const location = "userProfile";
        console.log("starting");
        const fileInfo = await uploadContent(
          file,
          location,
          userData.userId,
          User
        );

        //save in the DB
        await User.findByIdAndUpdate(userData.userId, {
          avatar: fileInfo.link
        });
        console.log("fileInfo.link", fileInfo.link);
        return fileInfo.link;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    login: async (_, { email, password }, { sources: { User, Business } }) => {
      const MAXIMUM_ATTEMPTS = 3;

      const user = await User.findOne({ email })
        .populate("business")
        .populate("roles");
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
      return {
        ...user._doc,
        _id: user.id,
        password: null,
        token
      };
    },
    register: async (_, { userInput }, { sources: { User } }) => {
      const { password } = userInput;

      try {
        await userValidation(userInput, User);

        const hashedPassword = await bcrypt.hash(password, 12);
        const fullAndInitialsName = getFullAndInitialsName(userInput);
        const user = new User({
          ...userInput,
          defaultColor: randomColor(),
          ...fullAndInitialsName,
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
    updateUser: async (_, { userInput }, { sources: { User } }) => {
      try {
        const { _id } = userInput;

        await userValidation(userInput, User);
        const fullAndInitialsName = getFullAndInitialsName(userInput);
        const user = new User({
          ...userInput,
          defaultColor: randomColor(),
          ...fullAndInitialsName
        });

        await User.updateOne({ _id }, user);
        return "User Updated!";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};

const userValidation = async (
  { business, sellerCode, mode, email, _id },
  User
) => {
  if (mode === "M" && sellerCode) {
    const response = await User.findOne({ business, sellerCode });
    if (response) {
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
