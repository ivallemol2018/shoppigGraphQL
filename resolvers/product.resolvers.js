const Product = require('../models/Product')
const productServices = require('../services/productServices')

class ProductResponse {
    constructor(id, nombre, description, foto, precio) {
        this.id = id
        this.nombre = nombre
        this.description = description
        this.foto = foto
        this.precio = precio
    }
}

const productsDB = {}

async function getProducts({ field, value }) {

    const productsDB = await productServices.getProducts()

    const products = Object.values(productsDB)

    if (field && value) {
        return productsDB.filter(s => s[field] == value)
    }

    return products
}

async function getProduct({ id }) {

    const product = await productServices.getProductById(id)

    if (!product) {
        throw new Error('Product not found|')
    }

    return product
}

async function createProduct({ data }) {

    const product = new Product(data.nombre, data.foto, data.precio)

    const response = await productServices.saveProduct(product)

    return new ProductResponse(response.id,
        response.title,
        response.title,
        response.thumbnail,
        response.timestamp)
}

async function updateProduct({ id, data }) {

    try {
        const productfind = await productServices.getProductById(id)

        if (!productfind) {
            throw new Error('Product not found|')
        }

        const product = new Product(data.nombre, data.foto, data.precio)

        const response = await productServices.updateProduct(product)

        return new ProductResponse(response.id,
            response.title,
            response.title,
            response.thumbnail,
            response.timestamp)

    } catch (error) {
        throw new Error('Product not found|')
    }
}

async function deleteProduct({ id }) {
    try {
        const productfind = await productServices.getProductById(id)

        if (!productfind) {
            throw new Error('Product not found|')
        }

        await productServices.deleteProductById(id)

        return new ProductResponse( productfind.id,
                                    productfind.title,
                                    productfind.description,
                                    productfind.foto,
                                    productfind.precio)

    } catch (error) {
        throw new Error('Product not found|')
    }
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}