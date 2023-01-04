const accountSchema = require("./routes/Accounts/docs/schema");
const accounts = require("./routes/Accounts/docs");

module.exports = {
    openapi: "3.0.0",
    info: {
      title: "Eva - API",
      description: "API referente ao projeto Eva",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor Local",
      }
    ],
    paths: {
      ...accounts,
    },
    components: {
      schemas: {
        ...accountSchema,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };