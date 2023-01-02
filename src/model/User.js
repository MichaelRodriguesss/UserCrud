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
  },
  temp_password: {
    type: String,
    required: false
  },
  temp_password_expiration: {
    type: String,
    required: false
  },
  forgot_password: {
    type: Boolean,
    required: true,
    default: false
  },
});

const Users = mongoose.model('User', DataSchema);

module.exports = Users;