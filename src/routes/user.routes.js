const express = require('express');
const routes = express.Router();
const UserController = require('../controller/UserController');
const checkOperator = require('../middleware/checkOperator');
const checkAdmin = require('../middleware/checkAdmin');

routes.get('/', (req, res) => {
    res.status(200).json({ message: "Bem-vindo" });
});

routes.post('/auth/register',checkAdmin ,UserController.register);
routes.post("/auth/login", UserController.login);
routes.get("/users", checkOperator, UserController.listAllUsers);
routes.get('/user/:id', checkOperator, UserController.infoDetailUser);
routes.put('/user/:id', checkAdmin, UserController.updateUser);
routes.delete('/user/:id', checkAdmin, UserController.deleteUser);

module.exports = routes;