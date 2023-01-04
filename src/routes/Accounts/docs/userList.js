module.exports = {
    "/user": {
      get: {
        summary: "Listar Usuários",
        description:
          "Essa rota é responsável por listar os usuários",
        tags: ["Account"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "inputFilter",
            in: "query",
            description: "Filtrar usuários por texto.",
          },
          {
            name: "column",
            in: "query",
            description:
              "Definir em qual coluna a busca pelo inputFilter será feita (name  ou email). Obs: Se o campo 'column' estiver vazio, a busca será por nome e email",
          },
          {
            name: "page",
            in: "query",
            description: "Número da página",
          },
          {
            name: "pageSize",
            in: "query",
            description: "Limitar a quantidade de exibições por página",
          },
        ],
        responses: {
          200: {
            description: "Lista de todos os usuários",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
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
                    },
                  },
                },
                examples: {
                  "Lista de usuários": {
                    value: {
                      data: [
                        {
                          id: "62c2c864db9620c4e47d09be",
                
                          name: "Murilo Viana",
                          email: "murilo.viana@intelliway.com.br",
                          type: "admin",
                          permission: "admin",
                          first_access: false,
                          active: true,
                        },
                        {
                          id: "62c2c864db9620c4e47d09be",
                         
                          name: "Lucas Marques",
                          email: "lucas.marques@intelliway.com.br",
                          type: "operator",
                          permission: "operator",
                          first_access: true,
                          active: true,
                        },
                      ],
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
            description: "Acesso livre para admin ou operator",
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
                        "Essa funcionalidade é para admin ou operator",
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
  