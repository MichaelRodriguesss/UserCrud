const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/swagger");

const routes = require('./src/routes/user.routes');

const app = express();
const cors = require("cors");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const mongodb = process.env.mongodb;

const port = process.env.PORT || 3003;

mongoose.set("strictQuery", true);

mongoose.connect(`${mongodb}`, async (err) => {
    if (err) throw err;
    console.log("conectado com MongoDB");
});

app.use(express.json());
app.use(routes);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`O server está Online na porta ${port}`);
});

