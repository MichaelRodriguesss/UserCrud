module.exports = {
    "/user/register": {
      post: {
        summary: "Cadastrar Usuário",
        description:
          "Essa rota é responsável por cadastrar um cliente na plataforma. Obs: Apenas usuários com permissão de administrador poderão cadastrar novos usuários",
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
                "Exemplo 1 - Cliente": {
                  value: {
                    name: "Murilo Viana",
                    email: "michael12@intelliway.com.br",
                    password: 123,
                    confirmpassword: 123
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário cadastrado com sucesso",
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
                  "Cadastro com sucesso": {
                    value: {
                      message: "Usuário cadastrado com sucesso",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Falha ao cadastrar usuário.",
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
                  "Caso 1 - Campos não preenchidos": {
                    value: [
                      {
                        message: "O campo nome não pode ser vazio",
                      },
                      {
                        message: "E-mail inválido",
                      },
                      {
                        message: "O campo organização não pode ser vazio",
                      },
                    ],
                  },
                  "Caso 2 - E-mail com as credenciais não enviado": {
                    value: {
                      message: "Falha ao enviar e-mail",
                    },
                  },
                  "Caso 3 - Organização não encontrada": {
                    value: {
                      message: "Organização não encontrada",
                    },
                  },
                  "Caso 4 - Organização desativada": {
                    value: {
                      message: "Organização selecionada está desativada",
                    },
                  },
                  "Caso 5 - Usuário já registrado no sistema": {
                    value: {
                      message: "Usuário já cadastrado",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Token inválido",
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
                      message: "Token inválido",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Acesso restrito para administradores",
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
                      message:
                        "Essa funcionalidade é restrita para administradores",
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
  