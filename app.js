const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const rootValue = require("./graphql/resolvers");
const schema = require("./graphql/schema");

const app = express();

app.use(bodyParser.json());

app.use(
  "/api",
  graphqlHttp({
    schema,
    rootValue,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb://${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
