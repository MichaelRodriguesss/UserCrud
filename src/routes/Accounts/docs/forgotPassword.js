module.exports = {
    "/user/forgot-password": {
      post: {
        summary: "Recuperar Senha",
        description: "Essa rota é responsável por gerar uma nova senha.",
        tags: ["Account"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              examples: {
                "Exemplo 1 - Admin": {
                  value: {
                    email: "rodrigo.romualdo@intelliway.com.br",
                  },
                },
                "Exemplo 2 - Operator": {
                  value: {
                    email: "david.ribeiro@intelliway.com.br",
                  },
                },
                "Exemplo 3 - Cliente": {
                  value: {
                    email: "murilo.viana@intelliway.com.br",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "E-mail com nova senha enviado",
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
                      message: "E-mail enviado",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Falha ao recuperar senha",
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
                  "Caso 1 - Campo não preenchido": {
                    value: {
                      message: "O campo email não pode ser vazio",
                    },
                  },
                  "Caso 2 - E-mail com as credenciais não enviado": {
                    value: {
                      message: "Falha ao enviar e-mail",
                    },
                  },
                  "Caso 3 - Usuário não cadastrado no sistema": {
                    value: {
                      message: "Usuário não encontrado",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };