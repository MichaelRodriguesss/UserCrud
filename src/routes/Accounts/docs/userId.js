module.exports = {
    "/user/{id}": {
      get: {
        summary: "Informação de um Usuário",
        description:
          "Essa rota é responsável por pegar informações de um usuário",
        tags: ["Account"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID do usuário",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Informações do usuário",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                    permission: {
                      type: "string",
                    },
                    first_access: {
                      type: "boolean",
                    },
                    active: {
                      type: "boolean",
                    },
                  },
                },
                examples: {
                  "Exemplo 1 - admin": {
                    value: {
                      id: "62c2c864db9620c4e47d09be",
                      name: "Rodrigo Romualdo",
                      email: "rodrigo.romualdo@intelliway.com.br",
                      type: "admin",
                      permission: "admin",
                      first_access: false,
                      active: true,
                    },
                  },
                  "Exemplo 2 - Operator": {
                    value: {
                      id: "62c2c864db9620c4e47d09be",
                  
                      name: "operator",
                      email: "operator@intelliway.com.br",
                      type: "operator",
                      permission: "operator",
                      first_access: false,
                      active: false,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Falha ao pegar informação do usuário",
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
                  "Caso 1 - Usuário não encontrado": {
                    value: {
                      message: "Usuário não encontrado",
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
            description: "Sem permissão",
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
                      message: "Você não tem permissão para acessar",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Deletar Usuário",
        description:
          "Essa rota é responsável por deletar ou desativar usuários da plataforma. Obs: Apenas contas que nunca fizeram login na plataforma poderão ser removidas por administradores.",
        tags: ["Account"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID do usuário",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Usuário deletado com sucesso",
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
                  "Exemplo 1 - admin": {
                    value: {
                      id: "62c2c864db9620c4e47d09be",
                      name: "Rodrigo Romualdo",
                      email: "rodrigo.romualdo@intelliway.com.br",
                      type: "admin",
                      permission: "admin",
                      first_access: false,
                      active: true,
                    },
                  },
                  "Exemplo 2 - Operator": {
                    value: {
                      id: "62c2c864db9620c4e47d09be",
                  
                      name: "operator",
                      email: "operator@intelliway.com.br",
                      type: "operator",
                      permission: "operator",
                      first_access: false,
                      active: false,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Usuário não pode ser deletado",
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
                  "Caso 1 - Usuário já fez o primeiro login": {
                    value: {
                      message: "Usuário não pode ser deletado",
                    },
                  },
                  "Caso 2 - Usuário não encontrado": {
                    value: {
                      message: "Usuário não encontrado",
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
      put: {
        summary: "Atualizar Usuário",
        description:
          "Essa rota é responsável por atualizar o Usuário",
        tags: ["Account"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID do usuário",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Usuário atualizado com sucesso",
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
                  "Caso 1 - Usuário já realizou seu primeiro acesso": {
                    value: {
                      message: "Usuário atualizado com sucesso",
                    },
                  },
                  "Caso 2 - Usuário não realizou seu primeiro acesso": {
                    value: {
                      message: "Usuário atualizado com sucesso",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Usuário não pode ser atualizado",
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
                  "Caso 1 - Usuário já fez o primeiro login": {
                    value: {
                      message: "Usuário não pode ser atualizado",
                    },
                  },
                  "Caso 2 - Usuário não encontrado": {
                    value: {
                      message: "Usuário não encontrado",
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
    }
  }

  