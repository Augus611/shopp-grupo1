const Sequelize = require('sequelize');

const db = require('../db.js');

const ProductType = require('./productType.js');

/**
 * Modelo de producto.
 *
 *
 */
const Product = db.define(
    'Product',
    {
        // Atributos
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.NUMBER,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            values: ProductType.types,
        },
    },
    { tableName: 'Product' }
);

/**
 * Obtener todos los productos de la base de datos.
 *
 */
const getAllProducts = (limit, skip, type) => {
    let where = {};

    if (type) {
        where = {
            ...where,
            type: type,
        };
    }

    return Product.findAndCountAll({
        limit: limit,
        offset: skip,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        where: where,
    });
};

/**
 * Crear un producto nuevo.
 * Parámetro data: JSON con los atributos a crear.
 *
 */
const createProduct = ({
    name = '',
    price = 0.0,
    type = ProductType.HOME,
} = {}) => {
    return Product.create({ name, price, type });
};

/**
 * Modifica un producto ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro data: JSON con los atributos a crear.
 *
 */
const updateProduct = async (
    id,
    {
        name = '',
        price = 0.0,
        type = ProductType.HOME,
    } = {}
) => {
    const product = await Product.findOne({ where: { id: id } });

    if (product != null) {
        return product.update({ name, price, type });
    }
    return null;
};

/**
 * Elimina un producto existente.
 * Parámetro id: id a buscar en la base de datos.
 *
 */
const deleteProduct = async (id) => {
    const product = await Product.findOne({ where: { id: id } });

    if (product != null) {
        return product.destroy();
    }
    return null;
};

const ProductModel = {
    Product: Product,
    getAll: getAllProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
};

module.exports = ProductModel;
