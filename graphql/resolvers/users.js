const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async args => {
    const { email, password } = args.userInput;

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
    const { email, password } = args.userInput;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword
      });

      await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
