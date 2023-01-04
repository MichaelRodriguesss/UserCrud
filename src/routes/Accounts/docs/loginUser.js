module.exports = {
    "/auth/login": {
      post: {
        summary: "Autenticar Usuário",
        description:
          "Essa rota é responsável por autenticar um usuário no sistema.",
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
                    password: "romualdo123",
                  },
                },
                "Exemplo 2 - Operator": {
                  value: {
                    email: "david.ribeiro@intelliway.com.br",
                    password: "david123",
                  },
                },
                "Exemplo 3 - Client": {
                  value: {
                    email: "murilo.viana@intelliway.com.br",
                    password: "murilo123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário autenticado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                    },
                    data: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        organizations: {
                          type: "string",
                        },
                        email: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        first_access: {
                          type: "boolean",
                        },
                        permission: {
                          type: "string",
                        },
                        active: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                },
                examples: {
                  "Exemplo 1 - Admin": {
                    value: {
                      token:
                        "eyJhbGciOiJIUzI1NiI@Sdasd@kpXVCJ9.eyJpZCI6IjYyYmU2YmEwNjFlZjcwZjhiY2JkYzJkYyIsImVtYWlsIjoiZGF2aWRhdWd1c3RvQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBdWd1c3RvIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjU2NjQ4OTY4LCJleHAiOjE2NTY3MzUzNjh9.klYfOO690cgu6w1GNheAaC8b4HHjXmKMqsJYQx7mAJU",
                      data: {
                        id: "0938473098473087403847038470347",
                        email: "rodrigo.romualdo@intelliway.com.br",
                        name: "Rodrigo Romualdo",
                        type: "support",
                        first_access: false,
                        permission: "admin",
                        active: true,
                      },
                    },
                  },
                  "Exemplo 2 - Operator": {
                    value: {
                      token:
                        "sdR5cCI6IkpXVCJ9.dsad2@jYyeyJhbGciOiJIUzI1NiIsYmU2YmEwNjFlZjcwZjhiY2JkYzJkYyIsImVtYWlsIjoiZGF2aWRhdWd1c3RvQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBdWd1c3RvIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjU2NjQ4OTY4LCJleHAiOjE2NTY3MzUzNjh9.klYfOO690cgu6w1GNheAaC8b4HHjXmKMqsJYQx7mAJU",
                      data: {
                        id: "8128453099523387403346038470538",
                        email: "david.ribeiro@intelliway.com.br",
                        name: "David Ribeiro",
                        type: "support",
                        first_access: true,
                        permission: "operator",
                        active: true,
                      },
                    },
                  },
                  "Exemplo 3 - Cliente": {
                    value: {
                      token:
                        "InR5cCI6IkpXVCJ9.eyJp@wsddsadwyJhbGciOiJIUzI1NiIsYmU2YmEwNjFlZjcwZjhiY2JkYzJkYyIsImVtYWlsIjoiZGF2aWRhdWd1c3RvQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBdWd1c3RvIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjU2NjQ4OTY4LCJleHAiOjE2NTY3MzUzNjh9.klYfOO690cgu6w1GNheAaC8b4HHjXmKMqsJYQx7mAJU",
                      data: {
                        id: "1138490299523394623346038470082",
                        organizations: [
                          {
                            id: "733192830912833",
                          },
                          {
                            id: "634192830912832",
                          },
                        ],
                        email: "murilo.viana@intelliway.com.br",
                        name: "Murilo Viana",
                        type: "client",
                        permission: "customer",
                        active: true,
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Falha ao autenticar usuário",
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
                        message: "O campo e-mail não pode ser vazio",
                      },
                      {
                        message: "O campo senha não pode ser vazio",
                      },
                    ],
                  },
                  "Caso 2 - Usuário não encontrado": {
                    value: {
                      message: "Usuário não encontrado",
                    },
                  },
                  "Caso 3 - Usuário desativado": {
                    value: {
                      message: "Esse usuário está desativado",
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