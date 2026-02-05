const db = require('../db/productQueries');
const { body, validationResult, matchedData } = require('express-validator');
const {
    serverError,
    notFoundPage,
    badRequestPage,
} = require('../errors/CustomErrors');

const getAllProducts = async (req, res) => {
    try {
        const { sort, category } = req.query;

        let products = null;
        let categories = null;

        const selectItemsSort = [
            { value: 'name_asc', option: 'Name (A-Z)' },
            { value: 'name_desc', option: 'Name (Z-A)' },
            { value: 'price_low', option: 'Price (Low to High)' },
            { value: 'price_high', option: 'Price (High to Low)' },
        ];
        let optionChosenSort = sort;
        let optionChosenFilter = category;

        if (!sort && !category) {
            products = await db.getAllProducts();
        }

        if (sort || category) {
            let orderBy = '';
            let categoryName = category === 'all' ? '%%' : category;

            switch (sort) {
                case 'name_desc':
                    orderBy = 'LOWER(products.name) DESC';
                    break;
                case 'price_low':
                    orderBy = 'products.sale_price ASC';
                    break;
                case 'price_high':
                    orderBy = 'products.sale_price DESC';
                    break;
                default:
                    orderBy = 'LOWER(products.name) ASC';
            }
            products = await db.filterAndSortProducts(categoryName, orderBy);
        }

        categories = await db.getAllCategories();
        res.render('products', {
            title: 'Products',
            products,
            categories,
            selectItemsSort,
            optionChosenSort,
            optionChosenFilter,
        });
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
        res.render('productForm', {
            title: 'Add new Product',
            categories,
            product: null,
        });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

const getEditForm = async (req, res) => {
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

        const categories = await db.getAllCategories();
        res.render('productForm', {
            title: 'Edit Product',
            categories,
            product,
        });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

// POST ROUTES

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

const postUpdateProduct = [
    validateNewProduct,
    async (req, res) => {
        try {
            const { id } = req.params;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const product = await db.getProductInfoByID(id);
                const categories = await db.getAllCategories();
                return res.status(400).render('productForm', {
                    title: 'Add new Product',
                    categories,
                    errors: errors.array(),
                    product,
                });
            }

            const { name, sale_price, current_stock, description } =
                matchedData(req);

            const { category_id } = req.body;

            const result = await db.updateProduct(
                name,
                sale_price,
                current_stock,
                description,
                category_id,
                id,
            );

            if (!result) {
                notFoundPage(res);
                return;
            }

            res.redirect('/products');
        } catch (error) {
            console.log(error.message);
            serverError(res);
        }
    },
];

const postSaveProduct = [
    validateNewProduct,
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const categories = await db.getAllCategories();
                return res.status(400).render('productForm', {
                    title: 'Add new Product',
                    categories,
                    errors: errors.array(),
                    product: null,
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
    getEditForm,
    postSaveProduct,
    postUpdateProduct,
    deleteProduct,
};
