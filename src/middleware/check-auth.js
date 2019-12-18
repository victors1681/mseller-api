const jwt = require("jsonwebtoken");
const gql = require("graphql-tag");
const { AuthenticationError, ApolloError } = require("apollo-server");
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
    if (!isException(req) && req.headers.authorization) {
      const toke = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(toke, process.env.JWT_KEY);

      const dbName = await getDbNameByUserId(decoded.userId);
      if (!dbName) {
        console.error("Error to locate database name: ", dbName);
        new ApolloError("Error to locate client database", 501);
      }
      return {
        userData: {
          ...decoded,
          dbName
        }
      };
    } else {
      console.log("Requested with NOT header...");
      return null;
    }
  } catch (error) {
    console.log("Auth failed, connection rejected, Header:");
    throw new AuthenticationError("you must be logged in", 401);
  }
};
