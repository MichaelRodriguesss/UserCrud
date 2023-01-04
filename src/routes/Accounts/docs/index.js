const create = require("./loginUser");
const forgotPassword = require("./forgotPassword");
const firstAccess = require("./firstAccess");
const clientRegister = require("./userRegister");
const userList = require("./userList");
const userId = require("./userId");


module.exports = {
  "/auth/login": {
    ...create["/auth/login"],
  },
  "/user/forgot-password": {
    ...forgotPassword["/user/forgot-password"],
  },
  "/user/register": {
    ...clientRegister["/user/register"],
  },
  "/auth/first-access": {
    ...firstAccess["/auth/first-access"],
  },
  "/user": {
    ...userList["/user"],
  },
  "/user/{id}": {
    ...userId["/user/{id}"],
  },
};
