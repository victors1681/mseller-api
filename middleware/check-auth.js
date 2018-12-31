const jwt = require("jsonwebtoken");
const gql = require("graphql-tag");

const MODULE_EXCLUDE = ["login", "register"];

const isException = req => {
  const query = gql`
    ${req.body.query}
  `;
  const requestParam =
    query.definitions[0].selectionSet.selections[0].name.value;
  return requestParam && MODULE_EXCLUDE.includes(requestParam);
};

module.exports = async (req, res, next) => {
  try {
    if (!isException(req)) {
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
