module.exports = {
    Account: {
        type: "object",
        properties: {
            owner: {
                type: "String",
                required: true
            },
            request: {
                type: "String",
                required: true
            },
            description: {
                type: "String",
                required: true
            },
            file: {
                url: {
                    type: "String",
                },
                mimetype: {
                    type: "Number",
                },
                name: {
                    type: "String"
                }
            },
            public: {
                type: "Boolean",
                required: true
            },
            edited: {
                type: "Boolean",
                required: true,
                default: false
            },
            created_at: {
                type: "Date",
                required: true,
            },
            updated_at: {
                type: "Date",
                required: true,
            },
        },
    },
}