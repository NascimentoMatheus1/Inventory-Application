const db = require('../db/categoryQueries');
const { body, validationResult, matchedData } = require('express-validator');
const {
    serverError,
    notFoundPage,
    badRequestPage,
} = require('../errors/CustomErrors');

// GET (read all)
const getAllCategories = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        res.render('categories', {
            title: 'Categories',
            categories: categories,
        });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            badRequestPage(res);
            return;
        }

        const category = await db.getCategoryByID(id);

        if (!category) {
            notFoundPage(res);
            return;
        }

        res.render('categoryDetail', {
            title: 'Category Detail',
            category,
        });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

const getErrorPage = (req, res) => {
    notFoundPage(res);
};

const getNewCategorie = async (req, res) => {
    try {
        res.render('newCategorie', { title: 'Create categorie' });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

const getEditCategorie = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await db.getCategoryByID(id);

        if (!category) {
            notFoundPage(res);
            return;
        }

        res.render('editCategorie', { title: 'Update Category', category });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

// POST (Add category)

const validadeNewCategorie = [
    body('name')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters')
        .custom(async (value) => {
            const category = await db.getCategoryByName(value);
            if (category) {
                throw new Error('Category name already in use');
            }
            return true;
        }),
    body('description')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Description is too short (min 1 chars)')
        .isLength({ max: 200 })
        .withMessage('Description is too long (max 200 chars)'),
];

const postNewCategorie = [
    validadeNewCategorie,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render('newCategorie', {
                    title: 'Create categorie',
                    errors: errors.array(),
                });
            }

            const { name, description } = matchedData(req);

            await db.addCategorie(name, description);
            res.redirect('/categories');
        } catch (error) {
            console.log(error.message);
            serverError(res);
        }
    },
];

// POST (Edit category)

const postEditCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await db.getCategoryByID(id);

        if (!category) {
            notFoundPage(res);
            return;
        }

        const { name, description } = req.body;

        const result = await db.updateCategory(name, description, id);

        if (!result) {
            badRequestPage();
            return;
        }

        res.redirect('/categories');
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

// DELETE (remove category route)

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            badRequestPage(res);
            return;
        }

        const products = await db.getAllProductsFromCategory(id);

        if (products.length === 0) {
            await db.deleteCategoryByID(id);
            res.redirect('/categories');
            return;
        }

        const categories = await db.getAllCategories();
        const errors = [
            {
                msg: 'Cannot delete this category because it still contains products.',
            },
            {
                msg: 'Please move or delete all products in this category before trying to remove it.',
            },
        ];
        res.render('categories', {
            title: 'Categories',
            categories,
            errors,
        });
    } catch (error) {
        console.log(error.message);
        serverError(res);
    }
};

module.exports = {
    getAllCategories,
    getCategory,
    getNewCategorie,
    postNewCategorie,
    getErrorPage,
    deleteCategory,
    getEditCategorie,
    postEditCategory,
};
