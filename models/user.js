const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
  nameBank: {
    type: String,
  },
  nomorRekening: {
    type: String,
  },
  nameAccountBank: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("User", userScheme);
