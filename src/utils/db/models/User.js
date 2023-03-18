const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
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

if (mongoose.models.User) delete mongoose.models.User;

module.exports = {
  userModel: mongoose.model("User", userSchema),
};
