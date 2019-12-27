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
      (!!wsAuthorization && !isException(socketBodyReq))
    ) {
      const toke = wsAuthorization
        ? wsAuthorization.split(" ")[1] //websocket request
        : httpAuthorization.split(" ")[1]; //http request

      const decoded = await jwt.verify(toke, process.env.JWT_KEY);

      return {
        userData: {
          ...decoded
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
      console.log("Requested with NOT header...");
      return null;
    }
  } catch (error) {
    console.log("Auth failed, connection rejected, :", error);
    throw new AuthenticationError("you must be logged in", 401);
  }
};
