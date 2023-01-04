module.exports = {
    "/auth/first-access": {
      post: {
        summary: "Alterar Senha",
        description:
          "Essa rota é responsável por alterar a senha do usuário no primeiro acesso.",
        tags: ["Account"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              examples: {
                "Exemplo 1": {
                  value: {
                    password: "senha1234",
                    confirmPassword: "senha1234",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Senha alterada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
                examples: {
                  "Exemplo 1": {
                    value: {
                      message: "Senha alterada com sucesso",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Não foi possível modificar a senha",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
                examples: {
                  "Caso 1 - Campo não preenchido": {
                    value: [
                      {
                        message: "O campo senha não pode ser vazio",
                      },
                      {
                        message: "O campo confirmar senha não pode ser vazio",
                      },
                    ],
                  },
                  "Caso 2 - Usuário já fez seu primeiro acesso": {
                    value: [
                      {
                        message: "Usuário já fez seu primeiro acesso",
                      },
                    ],
                  },
                },
              },
            },
          },
          401: {
            description: "Acesso não autorizado",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
                examples: {
                  "Exemplo 1": {
                    value: [
                      {
                        message: "Token inválido",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  