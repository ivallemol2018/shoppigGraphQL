const graphl = require('graphql')
const { buildSchema } = graphl

const SchemaProduct = buildSchema(`
    type Product {
        id: ID!
        nombre: String,
        description: String,
        foto: String
    }

    input ProductInput {
        nombre: String,
        foto: String,
        precio: Float
    }

    type Query {
        getProduct(id: ID!): Product,
        getProducts(field: String, value: String): [Product]
    }

    type Mutation {
        createProduct(data: ProductInput): Product,
        updateProduct(id: ID!, data: ProductInput): Product,
        deleteProduct(id: ID!): Product,
    }
`)


module.exports = SchemaProduct