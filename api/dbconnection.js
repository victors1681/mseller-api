const mongoose = require("mongoose");
const createConnections = () => {
  try {
    const opts = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    const primaryDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`;
    const secondaryDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_CLIENT_DB}`;

    var masterDb = mongoose.createConnection(primaryDB, opts);
    var ClientDB = mongoose.createConnection(secondaryDB, opts);

    return { masterDb, ClientDB };
  } catch (err) {
    throw err;
  }
};

exports.createConnections = createConnections;
