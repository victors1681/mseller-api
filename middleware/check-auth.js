const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (!req.body.query.includes("mutation", "login", "register")) {
      const toke = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(toke, process.env.JWT_KEY);
      req.userData = decoded;
    } else {
      req.userData = null;
    }
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
  next();
};
