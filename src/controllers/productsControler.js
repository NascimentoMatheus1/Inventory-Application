const db = require('../db/productQueries');
const { body, validationResult, matchedData } = require('express-validator');
const {
    serverError,
    notFoundPage,
    badRequestPage,
} = require('../errors/CustomErrors');

const getAllProducts = async (req, res) => {
    try {
        const products = await db.getAllProducts();
        const categories = await db.getAllCategories();
        res.render('products', { title: 'All products', products, categories });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            badRequestPage(res);
            return;
        }

        const product = await db.getProductInfoByID(id);

        if (!product) {
            notFoundPage(res);
            return;
        }

        res.render('productDetail', { title: 'Product Details', product });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

const getNewForm = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        res.render('newProduct', { title: 'Add new Product', categories });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

const validateNewProduct = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Name must be between 3 and 50 characters'),
    body('description')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Description is too short (min 1 chars)')
        .isLength({ max: 200 })
        .withMessage('Description is too long (max 200 chars)'),
    body('sale_price')
        .isFloat({ min: 0.01 })
        .withMessage('Sale price must be greater than 0')
        .isFloat({ max: 10000 })
        .withMessage('Sale price must be less than 10000'),
    body('current_stock')
        .isFloat({ min: 0.01 })
        .withMessage('Current Stock must be greater than 0')
        .isFloat({ max: 10000 })
        .withMessage('Current Stock must be less than 10000'),
];

// POST ROUTES

const postSaveProduct = [
    validateNewProduct,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            const categories = await db.getAllCategories();

            if (!errors.isEmpty()) {
                return res.status(400).render('newProduct', {
                    title: 'Add new Product',
                    categories,
                    errors: errors.array(),
                });
            }

            const { name, sale_price, current_stock, description } =
                matchedData(req);

            const { category_id } = req.body;

            const result = await db.addProduct(
                name,
                sale_price,
                current_stock,
                description,
                category_id,
            );

            if (!result) {
                serverError(res);
            }

            res.redirect('/products');
        } catch (error) {
            console.log(error.message);
            serverError(res);
        }
    },
];

// DELETE ROUTE

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            badRequestPage(res);
            return;
        }

        await db.deleteProductByID(id);

        res.redirect('/products');
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    getNewForm,
    postSaveProduct,
    deleteProduct,
};
