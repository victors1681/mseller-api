const jwt = require("jsonwebtoken");
const gql = require("graphql-tag");
const { getDbNameByUserId } = require("../graphql/resolvers/utils");

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

      console.log("Requested with Header (check-auth)...");

      const dbName = await getDbNameByUserId(decoded.userId);
      if (!dbName) {
        console.error("Error to locate database name: ", dbName);
        return res.status(501).json({
          message: "Error to locate database"
        });
      }
      req.userData = {
        ...decoded,
        dbName
      };
    } else {
      console.log("Requested with not header...");
      req.userData = null;
    }
  } catch (error) {
    console.log("Auth failed, connection rejected, Header:", req.headers);
    return res.status(401).json({
      message: "Auth failed"
    });
  }
  next();
};
