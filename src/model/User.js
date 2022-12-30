const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  first_access: {
    type: Boolean,
    required: true,
    default: true
  },
  permission: {
    type: String, 
    required: true,
    enum: ['admin', 'operator'],
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

const Users = mongoose.model('User', DataSchema);

module.exports = Users;