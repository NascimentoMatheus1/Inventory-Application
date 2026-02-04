const db = require('../db/productQueries');
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

module.exports = {
    getAllProducts,
    getProduct,
};
