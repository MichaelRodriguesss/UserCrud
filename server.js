const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const routes = require('./src/routes/user.routes');

const app = express();

const mongodb = process.env.mongodb;

const port = process.env.PORT || 3003;

mongoose.set("strictQuery", true);

mongoose.connect(`${mongodb}`, async (err) => {
    if (err) throw err;
    console.log("conectado com MongoDB");
});

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`O server está Online na porta ${port}`);
});

