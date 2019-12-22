const jwt = require("jsonwebtoken");
const gql = require("graphql-tag");
const get = require("lodash/get");
const { AuthenticationError, ApolloError } = require("apollo-server");
const { getDbNameByUserId } = require("../graphql/resolvers/utils");

const MODULE_EXCLUDE = ["login", "register"];

const isException = bodyReq => {
  const query = gql`
    ${bodyReq}
  `;
  const requestParam =
    query.definitions[0].selectionSet.selections[0].name.value;
  return requestParam && MODULE_EXCLUDE.includes(requestParam);
};

module.exports = async (req, res, connection) => {
  try {
    const wsAuthorization = get(connection, "context.Authorization");
    const bodyReq = get(req, "req.body.query");
    const httpAuthorization = get(req, "headers.authorization");

    if (
      (bodyReq && httpAuthorization && !isException(bodyReq)) ||
      !!wsAuthorization
    ) {
      const toke = wsAuthorization
        ? wsAuthorization.split(" ")[1] //websocket request
        : httpAuthorization.split(" ")[1]; //http request

      console.log("toke", toke);
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
