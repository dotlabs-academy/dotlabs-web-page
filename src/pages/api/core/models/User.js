const { Schema, model } = require('mongoose');

const user = new Schema(
  {
    name: String,
    email: String,
    identification: Number,
    address: String,
    eps: String,
    phone: String,
    profile: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('users', user);