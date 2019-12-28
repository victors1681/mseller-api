const jwt = require("jsonwebtoken");
const gql = require("graphql-tag");
const get = require("lodash/get");
const { AuthenticationError, ApolloError } = require("apollo-server");

const MODULE_EXCLUDE = ["login", "register"];

const isException = bodyReq => {
  if (!bodyReq) {
    return null;
  }
  const query = gql`
    ${bodyReq}
  `;
  const requestParam =
    query.definitions[0].selectionSet.selections[0].name.value;
  return requestParam && MODULE_EXCLUDE.includes(requestParam);
};

const validateToken = async token => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (err) {
    throw new ApolloError("Token Expired", 401);
  }
};
module.exports = async (req, res, connection, DBs) => {
  try {
    const wsAuthorization = get(connection, "context.headers.authorization");
    const bodyReq = get(req, "body.query");
    const httpAuthorization = get(req, "headers.authorization");
    const requestType =
      get(req, "headers.X-REQUEST-TYPE") ||
      get(connection, "context.headers.X-REQUEST-TYPE");
    const socketBodyReq = get(connection, "query");

    console.log(
      "bodyReq: ",
      !!bodyReq,
      ", wsAuthorization ",
      wsAuthorization,
      ". httpAuthorization",
      httpAuthorization,
      ", request Type",
      requestType
    );
    if (
      (bodyReq && httpAuthorization && !isException(bodyReq)) ||
      (wsAuthorization && !isException(socketBodyReq))
    ) {
      const token = wsAuthorization
        ? wsAuthorization.split(" ")[1] //websocket request
        : httpAuthorization.split(" ")[1]; //http request

      const decoded = await validateToken(token);

      return {
        userData: {
          ...decoded,
          token
        }
      };
    } else if (isException(bodyReq) || isException(socketBodyReq)) {
      //Login / new User
      console.log("Login Reqeust..");
      return {
        userData: {
          dbName: null,
          userId: null
        }
      };
    } else {
      new ApolloError("Requested with NOT header", 501);
      throw new AuthenticationError(
        "you must be logged in. Invalid token",
        401
      );
    }
  } catch (error) {
    if (error.toString() === "Error: TOKEN EXPIRED") {
      throw new AuthenticationError("Token Expired", 401);
    }
    console.log("Auth failed, connection rejected, :", error);
    throw new AuthenticationError(error);
  }
};
