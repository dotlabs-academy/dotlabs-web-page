const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    name: String,
    email: String,
    legalID: String,
    address: String,
    eps: String,
    phone: String,
    gitHubProfile: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("users", user);
