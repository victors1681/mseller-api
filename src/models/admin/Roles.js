const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  group: {
    type: String,
    default: "R" //S super User - A administrators - O operation - SE sellers - R regular -AD administration.
  }
});

module.exports = mongoose.model("Roles", rolesSchema);
