const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

// Define a model
const OTPModelSchema = new Schema({
  username: String,
  code: String
});

// Compile model from schema
module.exports = mongoose.model("OTP", OTPModelSchema);
