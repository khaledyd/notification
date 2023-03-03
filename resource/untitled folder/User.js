const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

// Define a model
const UserModelSchema = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  imageUrl: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
  },
  phone: Number,
  email: String,
  username: { type: String, unique: true },
  password: String
});

// Compile model from schema
module.exports = mongoose.model("User", UserModelSchema);
